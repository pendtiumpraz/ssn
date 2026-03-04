import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(request: Request) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { niche = 'apps dan AI', count = 10 } = body

        const prompt = `Kamu adalah content strategist untuk blog perusahaan software house bernama Sainskerta Nusantara.
Generate ${count} ide topik artikel blog yang menarik dan SEO-friendly seputar "${niche}".

Setiap topik harus:
- Relevan dengan industri teknologi, mobile apps, AI, dan bisnis digital
- Memiliki judul yang clickbait tapi informatif
- Cocok untuk target audience pengusaha dan developer di Indonesia

Format response HARUS dalam JSON array seperti ini:
[
  {
    "title": "Judul Artikel yang Menarik",
    "description": "Deskripsi singkat tentang apa yang akan dibahas",
    "category": "Teknologi|Bisnis|Tutorial|Tips & Trik|Berita",
    "tags": ["tag1", "tag2"],
    "difficulty": "beginner|intermediate|advanced",
    "estimatedReadTime": "5 min"
  }
]

Kembalikan HANYA JSON array-nya saja.`

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'Kamu adalah content strategist profesional. Selalu kembalikan JSON yang valid.' },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.9,
                max_tokens: 4000,
            }),
        })

        if (!response.ok) {
            return NextResponse.json({ error: 'AI service error' }, { status: 502 })
        }

        const data = await response.json()
        const aiResponse = data.choices?.[0]?.message?.content || ''

        let topics
        try {
            const jsonMatch = aiResponse.match(/\[[\s\S]*\]/)
            if (jsonMatch) {
                topics = JSON.parse(jsonMatch[0])
            } else {
                topics = JSON.parse(aiResponse)
            }
        } catch {
            return NextResponse.json({ error: 'Failed to parse AI response', raw: aiResponse }, { status: 422 })
        }

        return NextResponse.json({ topics })
    } catch (error) {
        console.error('Topic generator error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
