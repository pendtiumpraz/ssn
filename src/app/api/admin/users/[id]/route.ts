import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    const body = await request.json()
    const { name, email, password, role } = body

    const updateData: any = {}
    if (name) updateData.name = name
    if (email) {
        // Check email uniqueness
        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing && existing.id !== id) {
            return NextResponse.json({ error: 'Email sudah digunakan user lain' }, { status: 409 })
        }
        updateData.email = email
    }
    if (password) {
        updateData.password = await bcrypt.hash(password, 12)
    }
    if (role) updateData.role = role

    const user = await prisma.user.update({
        where: { id },
        data: updateData,
        select: { id: true, name: true, email: true, role: true, createdAt: true },
    })
    return NextResponse.json(user)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params

    // Prevent deleting yourself
    if ((session.user as any).id === id) {
        return NextResponse.json({ error: 'Tidak bisa menghapus akun sendiri' }, { status: 400 })
    }

    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ success: true })
}
