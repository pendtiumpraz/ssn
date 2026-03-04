import { NextResponse } from 'next/server'

// Hobby plan: maxDuration up to 60s. Auth handled by middleware.
export const maxDuration = 60

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { topic, language = 'id', length = 'medium' } = body

        if (!topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
        }

        const lengthMap: Record<string, { guide: string; tokens: number }> = {
            short: { guide: '400-600 kata', tokens: 1500 },
            medium: { guide: '700-1000 kata', tokens: 2500 },
            long: { guide: '1200-1800 kata', tokens: 3500 },
        }
        const { guide, tokens } = lengthMap[length] || lengthMap.medium

        const prompt = `Tulis artikel blog untuk Sainskerta Nusantara tentang: "${topic}"
${guide}, ${language === 'id' ? 'Bahasa Indonesia' : 'English'}, format HTML (h2,p,ul).

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
                max_tokens: tokens,
            }),
        })

        if (!response.ok) {
            return NextResponse.json({ error: 'AI service error' }, { status: 502 })
        }

        const data = await response.json()
        const aiResponse = data.choices?.[0]?.message?.content || ''

        let article
        try {
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
            article = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(aiResponse)
        } catch {
            return NextResponse.json({ error: 'Failed to parse AI response', raw: aiResponse }, { status: 422 })
        }

        return NextResponse.json(article)
    } catch (error) {
        console.error('AI Writer error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
