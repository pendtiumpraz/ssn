import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    try {
        const article = await prisma.article.findUnique({
            where: { id },
            include: { category: true, author: { select: { name: true, email: true } } },
        })
        if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(article)
    } catch (error) {
        console.error('Get article error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    try {
        const body = await request.json()
        const { title, slug, excerpt, content, magazineJson, coverImage, categoryId, tags, status: articleStatus } = body

        const article = await prisma.article.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(slug !== undefined && { slug }),
                ...(excerpt !== undefined && { excerpt }),
                ...(content !== undefined && { content }),
                ...(magazineJson !== undefined && { magazineJson }),
                ...(coverImage !== undefined && { coverImage }),
                ...(categoryId !== undefined && { categoryId: categoryId || null }),
                ...(tags !== undefined && { tags }),
                ...(articleStatus !== undefined && { status: articleStatus }),
            },
            include: { category: true },
        })

        return NextResponse.json(article)
    } catch (error) {
        console.error('Update article error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    try {
        await prisma.article.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Delete article error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
