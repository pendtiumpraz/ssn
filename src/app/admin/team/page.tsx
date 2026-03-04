'use client'

import { useState, useEffect } from 'react'

interface TeamMemberType {
    id: string; name: string; role: string; image: string;
    linkedin: string; facebook: string; twitter: string;
    order: number; isActive: boolean;
}

export default function AdminTeamPage() {
    const [members, setMembers] = useState<TeamMemberType[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<TeamMemberType | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({ name: '', role: '', image: '', linkedin: '#', order: 0 })

    useEffect(() => { loadMembers() }, [])

    const loadMembers = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/team')
            if (res.ok) setMembers(await res.json())
        } catch { } finally { setLoading(false) }
    }

    const openAdd = () => {
        setEditing(null)
        setForm({ name: '', role: '', image: '', linkedin: '#', order: members.length + 1 })
        setShowForm(true)
    }

    const openEdit = (m: TeamMemberType) => {
        setEditing(m)
        setForm({ name: m.name, role: m.role, image: m.image, linkedin: m.linkedin, order: m.order })
        setShowForm(true)
    }

    const handleSave = async () => {
        const url = editing ? `/api/admin/team/${editing.id}` : '/api/admin/team'
        const method = editing ? 'PUT' : 'POST'
        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        if (res.ok) {
            setMessage(editing ? '✅ Member updated' : '✅ Member added')
            setShowForm(false)
            loadMembers()
        } else {
            setMessage('❌ Gagal menyimpan')
        }
    }

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Hapus ${name}?`)) return
        const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
        if (res.ok) { setMessage('✅ Member dihapus'); loadMembers() }
    }

    return (
        <div>
            <div className="admin-page-header">
                <h1>Kelola Tim</h1>
                <p>Tambah, edit, dan hapus anggota tim</p>
            </div>

            <div className="admin-toolbar">
                <span style={{ color: '#94a3b8' }}>{members.length} anggota tim</span>
                <button className="admin-action-btn" onClick={openAdd}>+ Tambah Anggota</button>
            </div>

            {message && <div className={`admin-alert ${message.startsWith('✅') ? 'success' : 'error'}`}>{message}</div>}

            {showForm && (
                <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <h3>{editing ? 'Edit Anggota' : 'Tambah Anggota Baru'}</h3>
                        <div className="admin-form-group">
                            <label>Nama</label>
                            <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama lengkap" />
                        </div>
                        <div className="admin-form-group">
                            <label>Jabatan / Role</label>
                            <input className="admin-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="CEO, CTO, Developer..." />
                        </div>
                        <div className="admin-form-group">
                            <label>URL Foto</label>
                            <input className="admin-input" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images/team/nama.jpg" />
                        </div>
                        <div className="admin-form-row">
                            <div className="admin-form-group">
                                <label>LinkedIn URL</label>
                                <input className="admin-input" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label>Urutan</label>
                                <input className="admin-input" type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />
                            </div>
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
                                    <th>#</th>
                                    <th>Foto</th>
                                    <th>Nama</th>
                                    <th>Jabatan</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(m => (
                                    <tr key={m.id}>
                                        <td>{m.order}</td>
                                        <td><img src={m.image} alt={m.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} /></td>
                                        <td style={{ fontWeight: 600, color: '#f1f5f9' }}>{m.name}</td>
                                        <td>{m.role}</td>
                                        <td><span className={`admin-badge ${m.isActive ? 'badge-success' : 'badge-warning'}`}>{m.isActive ? 'Active' : 'Inactive'}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button className="admin-link" onClick={() => openEdit(m)}>Edit</button>
                                                <button className="admin-link" style={{ color: '#f87171' }} onClick={() => handleDelete(m.id, m.name)}>Hapus</button>
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
