import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { put, del } from '@vercel/blob'

export async function GET() {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const media = await prisma.media.findMany({
            orderBy: { createdAt: 'desc' },
            include: { uploadedBy: { select: { name: true } } },
        })
        return NextResponse.json(media)
    } catch (error) {
        console.error('Media list error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Upload to Vercel Blob
        const blob = await put(`media/${Date.now()}-${file.name}`, file, {
            access: 'public',
        })

        // Save to database
        const media = await prisma.media.create({
            data: {
                url: blob.url,
                filename: file.name,
                mimeType: file.type,
                size: file.size,
                userId: (session.user as any).id,
            },
        })

        return NextResponse.json(media, { status: 201 })
    } catch (error) {
        console.error('Media upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
