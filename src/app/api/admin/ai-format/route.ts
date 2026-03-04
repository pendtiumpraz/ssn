import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(request: Request) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { content, title } = body

        if (!content) {
            return NextResponse.json({ error: 'Content is required' }, { status: 400 })
        }

        const prompt = `Kamu adalah editor majalah profesional. Tolong format konten artikel berikut menjadi layout majalah yang menarik dalam format JSON.

Judul: ${title || 'Untitled'}

Konten:
${content}

Buat JSON array dengan struktur berikut untuk setiap section:
[
  {
    "type": "hero",
    "title": "judul utama",
    "subtitle": "sub judul",
    "image": "url gambar jika ada",
    "content": "paragraf pembuka yang menarik"
  },
  {
    "type": "text-block",
    "content": "paragraf penjelasan",
    "style": "normal|highlight|quote"
  },
  {
    "type": "two-column",
    "left": "konten kolom kiri",
    "right": "konten kolom kanan"
  },
  {
    "type": "image-block",
    "image": "url gambar",
    "caption": "keterangan gambar",
    "position": "full|left|right"
  },
  {
    "type": "pull-quote",
    "quote": "kutipan menarik dari artikel",
    "author": "nama penulis jika ada"
  },
  {
    "type": "stats-block",
    "items": [{"label": "label", "value": "nilai"}]
  }
]

Gunakan variasi layout agar terlihat seperti majalah berkualitas. Kembalikan HANYA JSON array-nya saja tanpa penjelasan tambahan.`

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'Kamu adalah editor majalah profesional. Selalu kembalikan JSON yang valid.' },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.7,
                max_tokens: 4000,
            }),
        })

        if (!response.ok) {
            const errText = await response.text()
            console.error('DeepSeek API error:', errText)
            return NextResponse.json({ error: 'AI service error' }, { status: 502 })
        }

        const data = await response.json()
        const aiResponse = data.choices?.[0]?.message?.content || ''

        // Parse JSON from AI response
        let magazineJson
        try {
            // Try to extract JSON array from response
            const jsonMatch = aiResponse.match(/\[[\s\S]*\]/)
            if (jsonMatch) {
                magazineJson = JSON.parse(jsonMatch[0])
            } else {
                magazineJson = JSON.parse(aiResponse)
            }
        } catch {
            return NextResponse.json({ error: 'Failed to parse AI response', raw: aiResponse }, { status: 422 })
        }

        return NextResponse.json({ magazineJson })
    } catch (error) {
        console.error('DeepSeek error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
