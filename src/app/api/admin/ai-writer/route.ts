import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const maxDuration = 60

export async function POST(request: Request) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { topic, language = 'id', length = 'medium' } = body

        if (!topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
        }

        const lengthMap: Record<string, string> = {
            short: '500-800 kata',
            medium: '1000-1500 kata',
            long: '2000-3000 kata',
        }
        const lengthGuide = lengthMap[length] || '1000-1500 kata'

        const prompt = `Kamu adalah penulis konten profesional untuk blog perusahaan software house bernama Sainskerta Nusantara. 
Tulis artikel blog lengkap tentang topik: "${topic}"

Pedoman:
- Panjang artikel: ${lengthGuide}
- Bahasa: ${language === 'id' ? 'Bahasa Indonesia' : 'English'}
- Gunakan tone profesional tapi mudah dipahami
- Topik harus relevan dengan teknologi, apps, AI, atau bisnis digital
- Sertakan heading (h2, h3), paragraf, list, dan blockquote jika perlu
- Format output dalam HTML yang valid
- Sertakan meta info dalam format JSON di awal response

Format response HARUS seperti ini (JSON):
{
  "title": "Judul Artikel yang Menarik",
  "excerpt": "Ringkasan singkat 1-2 kalimat",
  "content": "<h2>...</h2><p>...</p>...",
  "tags": ["tag1", "tag2", "tag3"],
  "suggestedCategory": "Teknologi"
}

Kembalikan HANYA JSON valid tanpa penjelasan tambahan.`

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'Kamu adalah penulis konten blog profesional. Selalu kembalikan JSON yang valid.' },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.8,
                max_tokens: 8000,
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
            if (jsonMatch) {
                article = JSON.parse(jsonMatch[0])
            } else {
                article = JSON.parse(aiResponse)
            }
        } catch {
            return NextResponse.json({ error: 'Failed to parse AI response', raw: aiResponse }, { status: 422 })
        }

        return NextResponse.json(article)
    } catch (error) {
        console.error('AI Writer error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
