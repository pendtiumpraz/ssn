import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// Vercel: max 60s for Pro, 10s for Hobby
export const maxDuration = 60

export async function POST(request: Request) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { topics, autoPublish = false } = body

        if (!topics || !Array.isArray(topics) || topics.length === 0) {
            return NextResponse.json({ error: 'Topics array is required' }, { status: 400 })
        }

        const results: any[] = []
        const errors: any[] = []

        for (const topic of topics) {
            try {
                // Generate article content via AI
                const prompt = `Tulis artikel blog lengkap untuk perusahaan software house Sainskerta Nusantara tentang: "${topic.title || topic}"

Pedoman:
- Panjang: 800-1200 kata
- Bahasa Indonesia
- Tone profesional tapi mudah dipahami
- Format HTML dengan heading, paragraf, list
- Topik harus relevan dengan teknologi, apps, AI

Format response sebagai JSON:
{
  "title": "${topic.title || topic}",
  "excerpt": "ringkasan 1-2 kalimat",
  "content": "<h2>...</h2><p>...</p>...",
  "tags": ["tag1", "tag2"]
}

Kembalikan HANYA JSON valid.`

                const response = await fetch('https://api.deepseek.com/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: 'deepseek-chat',
                        messages: [
                            { role: 'system', content: 'Kamu penulis blog profesional. Kembalikan JSON valid.' },
                            { role: 'user', content: prompt },
                        ],
                        temperature: 0.8,
                        max_tokens: 6000,
                    }),
                })

                if (!response.ok) {
                    errors.push({ topic: topic.title || topic, error: 'AI service error' })
                    continue
                }

                const data = await response.json()
                const aiResponse = data.choices?.[0]?.message?.content || ''

                let articleData
                try {
                    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
                    articleData = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(aiResponse)
                } catch {
                    errors.push({ topic: topic.title || topic, error: 'Failed to parse AI response' })
                    continue
                }

                const title = articleData.title || topic.title || topic
                const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

                // Check slug uniqueness
                let finalSlug = slug
                const existing = await prisma.article.findUnique({ where: { slug } })
                if (existing) {
                    finalSlug = `${slug}-${Date.now()}`
                }

                // Find or create category
                let categoryId = null
                if (topic.category) {
                    const catSlug = topic.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    let cat = await prisma.category.findUnique({ where: { slug: catSlug } })
                    if (!cat) {
                        cat = await prisma.category.create({ data: { name: topic.category, slug: catSlug } })
                    }
                    categoryId = cat.id
                }

                const article = await prisma.article.create({
                    data: {
                        title,
                        slug: finalSlug,
                        excerpt: articleData.excerpt || '',
                        content: articleData.content || '',
                        tags: articleData.tags || topic.tags || [],
                        status: autoPublish ? 'PUBLISHED' : 'DRAFT',
                        categoryId,
                        authorId: (session.user as any).id,
                    },
                })

                results.push({ id: article.id, title: article.title, slug: article.slug, status: article.status })

                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000))
            } catch (err: any) {
                errors.push({ topic: topic.title || topic, error: err.message || 'Unknown error' })
            }
        }

        return NextResponse.json({
            created: results.length,
            failed: errors.length,
            articles: results,
            errors,
        })
    } catch (error) {
        console.error('Bulk create error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
