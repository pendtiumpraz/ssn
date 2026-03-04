import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '12')
    const page = parseInt(searchParams.get('page') || '1')
    const category = searchParams.get('category') || ''

    try {
        const where: any = { status: 'PUBLISHED' }
        if (category) where.category = { slug: category }

        const [articles, total] = await Promise.all([
            prisma.article.findMany({
                where,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    excerpt: true,
                    coverImage: true,
                    createdAt: true,
                    category: { select: { name: true, slug: true } },
                    author: { select: { name: true } },
                    tags: true,
                },
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip: (page - 1) * limit,
            }),
            prisma.article.count({ where }),
        ])

        return NextResponse.json({ articles, total, page, totalPages: Math.ceil(total / limit) })
    } catch (error) {
        console.error('Public blog error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
