import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    try {
        const article = await prisma.article.findUnique({
            where: { slug, status: 'PUBLISHED' },
            include: {
                category: { select: { name: true, slug: true } },
                author: { select: { name: true } },
            },
        })

        if (!article) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        return NextResponse.json(article)
    } catch (error) {
        console.error('Blog detail error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
