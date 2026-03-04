import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => null)

        if (!body) {
            // Try form data
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const { email, sub, message } = body

        if (!email || !sub || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
        }

        // For now, just log the contact form submission
        // In production, you could send an email or store in DB
        console.log('Contact form submission:', { email, sub, message })

        return NextResponse.json({
            success: true,
            message: 'Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.'
        })
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
