import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function GET() {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
        orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(users)
}

export async function POST(request: Request) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    const { name, email, password, role = 'USER' } = body

    if (!name || !email || !password) {
        return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword, role },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
    })
    return NextResponse.json(user)
}
