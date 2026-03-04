import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET single page
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    try {
        const page = await prisma.pageContent.findUnique({ where: { pageSlug: slug } })
        if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(page)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

// PUT update page
export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { slug } = await params
    try {
        const body = await request.json()
        const { title, sections } = body

        const page = await prisma.pageContent.upsert({
            where: { pageSlug: slug },
            update: { title, sections, updatedBy: (session.user as any).id },
            create: { pageSlug: slug, title, sections, updatedBy: (session.user as any).id },
        })
        return NextResponse.json(page)
    } catch (error) {
        console.error('Page update error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
