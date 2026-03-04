'use client'

import { useState, useEffect } from 'react'

interface ServiceType {
    id: string; title: string; description: string; image: string;
    color: string; order: number; isActive: boolean;
}

export default function AdminServicesPage() {
    const [items, setItems] = useState<ServiceType[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<ServiceType | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({ title: '', description: '', image: '', color: '#2b78ff', order: 0 })

    useEffect(() => { loadItems() }, [])

    const loadItems = async () => {
        setLoading(true)
        try { const res = await fetch('/api/admin/services'); if (res.ok) setItems(await res.json()) } catch { } finally { setLoading(false) }
    }

    const openAdd = () => {
        setEditing(null)
        setForm({ title: '', description: '', image: '', color: '#2b78ff', order: items.length + 1 })
        setShowForm(true)
    }

    const openEdit = (s: ServiceType) => {
        setEditing(s)
        setForm({ title: s.title, description: s.description, image: s.image, color: s.color, order: s.order })
        setShowForm(true)
    }

    const handleSave = async () => {
        const url = editing ? `/api/admin/services/${editing.id}` : '/api/admin/services'
        const method = editing ? 'PUT' : 'POST'
        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        if (res.ok) { setMessage(editing ? '✅ Service updated' : '✅ Service added'); setShowForm(false); loadItems() }
        else setMessage('❌ Gagal menyimpan')
    }

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Hapus layanan ${title}?`)) return
        const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
        if (res.ok) { setMessage('✅ Service dihapus'); loadItems() }
    }

    return (
        <div>
            <div className="admin-page-header">
                <h1>Kelola Layanan</h1>
                <p>Tambah, edit, dan hapus layanan yang ditampilkan</p>
            </div>

            <div className="admin-toolbar">
                <span style={{ color: '#94a3b8' }}>{items.length} layanan</span>
                <button className="admin-action-btn" onClick={openAdd}>+ Tambah Layanan</button>
            </div>

            {message && <div className={`admin-alert ${message.startsWith('✅') ? 'success' : 'error'}`}>{message}</div>}

            {showForm && (
                <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <h3>{editing ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h3>
                        <div className="admin-form-group">
                            <label>Judul Layanan</label>
                            <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Web Development..." />
                        </div>
                        <div className="admin-form-group">
                            <label>Deskripsi</label>
                            <textarea className="admin-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} />
                        </div>
                        <div className="admin-form-group">
                            <label>URL Gambar</label>
                            <input className="admin-input" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images/menu-img/..." />
                        </div>
                        <div className="admin-form-row">
                            <div className="admin-form-group">
                                <label>Warna Accent</label>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} style={{ width: 40, height: 36, border: 'none', borderRadius: 4, cursor: 'pointer' }} />
                                    <input className="admin-input" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} style={{ flex: 1 }} />
                                </div>
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
                                <tr><th>#</th><th>Warna</th><th>Layanan</th><th>Deskripsi</th><th>Status</th><th>Aksi</th></tr>
                            </thead>
                            <tbody>
                                {items.map(s => (
                                    <tr key={s.id}>
                                        <td>{s.order}</td>
                                        <td><div style={{ width: 24, height: 24, borderRadius: 6, background: s.color }} /></td>
                                        <td style={{ fontWeight: 600, color: '#f1f5f9' }}>{s.title}</td>
                                        <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.description}</td>
                                        <td><span className={`admin-badge ${s.isActive ? 'badge-success' : 'badge-warning'}`}>{s.isActive ? 'Active' : 'Inactive'}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button className="admin-link" onClick={() => openEdit(s)}>Edit</button>
                                                <button className="admin-link" style={{ color: '#f87171' }} onClick={() => handleDelete(s.id, s.title)}>Hapus</button>
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
