import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const [totalArticles, publishedArticles, draftArticles, totalCategories, totalMedia, totalUsers] = await Promise.all([
            prisma.article.count(),
            prisma.article.count({ where: { status: 'PUBLISHED' } }),
            prisma.article.count({ where: { status: 'DRAFT' } }),
            prisma.category.count(),
            prisma.media.count(),
            prisma.user.count(),
        ])

        return NextResponse.json({
            totalArticles,
            publishedArticles,
            draftArticles,
            totalCategories,
            totalMedia,
            totalUsers,
        })
    } catch (error) {
        console.error('Stats error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
