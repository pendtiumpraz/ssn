import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: Request) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')
    const status = searchParams.get('status') as 'DRAFT' | 'PUBLISHED' | null
    const search = searchParams.get('search') || ''

    try {
        const where: any = {}
        if (status) where.status = status
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { excerpt: { contains: search, mode: 'insensitive' } },
            ]
        }

        const [articles, total] = await Promise.all([
            prisma.article.findMany({
                where,
                include: { category: true, author: { select: { name: true, email: true } } },
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip: (page - 1) * limit,
            }),
            prisma.article.count({ where }),
        ])

        return NextResponse.json({ articles, total, page, totalPages: Math.ceil(total / limit) })
    } catch (error) {
        console.error('Articles list error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { title, slug, excerpt, content, coverImage, categoryId, tags, status: articleStatus } = body

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
        }

        const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

        // Check if slug exists
        const existingArticle = await prisma.article.findUnique({ where: { slug: generatedSlug } })
        if (existingArticle) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
        }

        const article = await prisma.article.create({
            data: {
                title,
                slug: generatedSlug,
                excerpt: excerpt || '',
                content,
                coverImage: coverImage || null,
                categoryId: categoryId || null,
                tags: tags || [],
                status: articleStatus || 'DRAFT',
                authorId: (session.user as any).id,
            },
            include: { category: true },
        })

        return NextResponse.json(article, { status: 201 })
    } catch (error) {
        console.error('Create article error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
