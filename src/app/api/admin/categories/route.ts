import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: { _count: { select: { articles: true } } },
        })
        return NextResponse.json(categories)
    } catch (error) {
        console.error('Categories list error:', error)
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
        const { name } = body

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 })
        }

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

        const existing = await prisma.category.findUnique({ where: { slug } })
        if (existing) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 400 })
        }

        const category = await prisma.category.create({
            data: { name, slug },
        })

        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        console.error('Create category error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
