'use client'

import { useState, useEffect } from 'react'

interface UserType {
    id: string; name: string; email: string; role: string; createdAt: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserType[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<UserType | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' })

    useEffect(() => { loadUsers() }, [])

    const loadUsers = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/users')
            if (res.ok) setUsers(await res.json())
        } catch { } finally { setLoading(false) }
    }

    const openAdd = () => {
        setEditing(null)
        setForm({ name: '', email: '', password: '', role: 'USER' })
        setShowForm(true)
    }

    const openEdit = (u: UserType) => {
        setEditing(u)
        setForm({ name: u.name, email: u.email, password: '', role: u.role })
        setShowForm(true)
    }

    const handleSave = async () => {
        if (!editing && (!form.name || !form.email || !form.password)) {
            setMessage('❌ Lengkapi semua field')
            return
        }
        const url = editing ? `/api/admin/users/${editing.id}` : '/api/admin/users'
        const method = editing ? 'PUT' : 'POST'
        const payload: any = { name: form.name, email: form.email, role: form.role }
        if (form.password) payload.password = form.password

        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (res.ok) {
            setMessage(editing ? '✅ User updated' : '✅ User created')
            setShowForm(false)
            loadUsers()
        } else {
            const err = await res.json()
            setMessage(`❌ ${err.error || 'Gagal menyimpan'}`)
        }
    }

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Hapus user ${name}?`)) return
        const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
        if (res.ok) { setMessage('✅ User dihapus'); loadUsers() }
        else {
            const err = await res.json()
            setMessage(`❌ ${err.error || 'Gagal menghapus'}`)
        }
    }

    return (
        <div>
            <div className="admin-page-header">
                <h1>Kelola Users</h1>
                <p>Tambah, edit, dan hapus user. Admin bisa akses AI Tools, User biasa tidak.</p>
            </div>

            <div className="admin-toolbar">
                <span style={{ color: '#94a3b8' }}>{users.length} users</span>
                <button className="admin-action-btn" onClick={openAdd}>+ Tambah User</button>
            </div>

            {message && <div className={`admin-alert ${message.startsWith('✅') ? 'success' : 'error'}`} onClick={() => setMessage('')}>{message}</div>}

            {showForm && (
                <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <h3>{editing ? 'Edit User' : 'Tambah User Baru'}</h3>
                        <div className="admin-form-group">
                            <label>Nama</label>
                            <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama lengkap" />
                        </div>
                        <div className="admin-form-group">
                            <label>Email</label>
                            <input className="admin-input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
                        </div>
                        <div className="admin-form-group">
                            <label>{editing ? 'Password Baru (kosongkan jika tidak diubah)' : 'Password'}</label>
                            <input className="admin-input" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder={editing ? '••••••••' : 'Min 6 karakter'} />
                        </div>
                        <div className="admin-form-group">
                            <label>Role</label>
                            <select className="admin-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                                <option value="USER">User (Tanpa AI Tools)</option>
                                <option value="ADMIN">Admin (Full Access + AI Tools)</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                            <button className="admin-action-btn" onClick={handleSave}>💾 Simpan</button>
                            <button className="admin-action-btn secondary" onClick={() => setShowForm(false)}>Batal</button>
                        </div>
                    </div>
                </div>
            )}

            {loading ? <div className="admin-loading">Memuat...</div> : (
                <div className="admin-section">
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Dibuat</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td style={{ fontWeight: 600, color: '#f1f5f9' }}>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <span className={`admin-badge ${u.role === 'ADMIN' ? 'badge-success' : 'badge-warning'}`}>
                                                {u.role === 'ADMIN' ? '🔑 Admin' : '👤 User'}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '13px', color: '#94a3b8' }}>{new Date(u.createdAt).toLocaleDateString('id-ID')}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button className="admin-link" onClick={() => openEdit(u)}>Edit</button>
                                                <button className="admin-link" style={{ color: '#f87171' }} onClick={() => handleDelete(u.id, u.name)}>Hapus</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
