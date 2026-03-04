import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const maxDuration = 10

export async function POST(request: Request) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { niche = 'apps dan AI', count = 10, existingTitles = [] } = body

        const existingList = existingTitles.length > 0
            ? `\n\nARTIKEL YANG SUDAH ADA (JANGAN buat topik serupa/mirip):\n${existingTitles.map((t: string, i: number) => `${i + 1}. ${t}`).join('\n')}`
            : ''

        const prompt = `Generate ${count} ide topik artikel blog untuk Sainskerta Nusantara (software house) seputar "${niche}".

Setiap topik harus:
- Unik, menarik, SEO-friendly
- Relevan dengan teknologi, apps, AI, bisnis digital
- Target audience: pengusaha dan developer Indonesia${existingList}

Response JSON array saja:
[{"title":"...","description":"...","category":"Teknologi|Bisnis|Tutorial|Tips & Trik|Berita","tags":["tag1"],"difficulty":"beginner|intermediate|advanced","estimatedReadTime":"5 min"}]`

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'Content strategist profesional. Kembalikan JSON array valid saja.' },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.9,
                max_tokens: 3000,
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
