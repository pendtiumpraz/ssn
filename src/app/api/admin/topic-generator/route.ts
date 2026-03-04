import { NextResponse } from 'next/server'

export const runtime = 'edge'

// Auth is handled by middleware - no need to import auth/prisma here
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { niche = 'apps dan AI', count = 10, existingTitles = [] } = body

        const existingList = existingTitles.length > 0
            ? `\n\nJANGAN buat topik serupa dengan:\n${existingTitles.slice(0, 20).map((t: string, i: number) => `${i + 1}. ${t}`).join('\n')}`
            : ''

        const prompt = `Generate ${count} ide topik artikel blog untuk software house seputar "${niche}".
Topik harus unik, SEO-friendly, relevan teknologi/AI/bisnis digital.${existingList}

Response JSON array:
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
                    { role: 'system', content: 'Kembalikan JSON array valid saja.' },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.9,
                max_tokens: 2500,
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
            topics = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(aiResponse)
        } catch {
            return NextResponse.json({ error: 'Failed to parse AI response', raw: aiResponse }, { status: 422 })
        }

        return NextResponse.json({ topics })
    } catch (error) {
        console.error('Topic generator error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
