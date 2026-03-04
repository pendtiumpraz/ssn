import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Hobby plan: maxDuration up to 60s. Auth handled by middleware.
export const maxDuration = 60

export async function POST(request: Request) {
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
                const prompt = `Tulis artikel blog untuk Sainskerta Nusantara tentang: "${topic.title || topic}"
700-1000 kata, Bahasa Indonesia, format HTML (h2,p,ul).

Response JSON:
{"title":"...","excerpt":"...","content":"<h2>...</h2><p>...</p>","tags":["tag1","tag2"]}`

                const response = await fetch('https://api.deepseek.com/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: 'deepseek-chat',
                        messages: [
                            { role: 'system', content: 'Penulis blog. Kembalikan JSON valid saja.' },
                            { role: 'user', content: prompt },
                        ],
                        temperature: 0.8,
                        max_tokens: 2500,
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
                const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now()

                const article = await prisma.article.create({
                    data: {
                        title,
                        slug,
                        excerpt: articleData.excerpt || '',
                        content: articleData.content || '',
                        tags: articleData.tags || [],
                        status: autoPublish ? 'PUBLISHED' : 'DRAFT',
                        authorId: 'system',
                    },
                })

                results.push({ id: article.id, title: article.title, slug: article.slug, status: article.status })
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
