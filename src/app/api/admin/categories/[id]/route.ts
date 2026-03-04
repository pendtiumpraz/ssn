import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    try {
        // Check if category has articles
        const category = await prisma.category.findUnique({
            where: { id },
            include: { _count: { select: { articles: true } } },
        })

        if (!category) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        if (category._count.articles > 0) {
            return NextResponse.json({ error: 'Cannot delete category with articles' }, { status: 400 })
        }

        await prisma.category.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Delete category error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
