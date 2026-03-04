import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { del } from '@vercel/blob'

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    try {
        const media = await prisma.media.findUnique({ where: { id } })
        if (!media) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        // Delete from Vercel Blob
        try {
            await del(media.url)
        } catch (e) {
            console.error('Blob delete error:', e)
        }

        // Delete from database
        await prisma.media.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Media delete error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
