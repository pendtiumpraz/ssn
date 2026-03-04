'use client'

import { useState, useEffect } from 'react'

interface PortfolioType {
    id: string; title: string; image: string; category: string;
    client: string | null; url: string | null; order: number; isActive: boolean;
}

export default function AdminPortfolioPage() {
    const [items, setItems] = useState<PortfolioType[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<PortfolioType | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({ title: '', image: '', category: 'General', client: '', url: '', order: 0 })

    useEffect(() => { loadItems() }, [])

    const loadItems = async () => {
        setLoading(true)
        try { const res = await fetch('/api/admin/portfolio'); if (res.ok) setItems(await res.json()) } catch { } finally { setLoading(false) }
    }

    const openAdd = () => {
        setEditing(null)
        setForm({ title: '', image: '', category: 'General', client: '', url: '', order: items.length + 1 })
        setShowForm(true)
    }

    const openEdit = (p: PortfolioType) => {
        setEditing(p)
        setForm({ title: p.title, image: p.image, category: p.category, client: p.client || '', url: p.url || '', order: p.order })
        setShowForm(true)
    }

    const handleSave = async () => {
        const url = editing ? `/api/admin/portfolio/${editing.id}` : '/api/admin/portfolio'
        const method = editing ? 'PUT' : 'POST'
        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        if (res.ok) { setMessage(editing ? '✅ Portfolio updated' : '✅ Portfolio added'); setShowForm(false); loadItems() }
        else setMessage('❌ Gagal menyimpan')
    }

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Hapus ${title}?`)) return
        const res = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
        if (res.ok) { setMessage('✅ Item dihapus'); loadItems() }
    }

    return (
        <div>
            <div className="admin-page-header">
                <h1>Kelola Portfolio</h1>
                <p>Tambah, edit, dan hapus item portfolio</p>
            </div>

            <div className="admin-toolbar">
                <span style={{ color: '#94a3b8' }}>{items.length} portfolio items</span>
                <button className="admin-action-btn" onClick={openAdd}>+ Tambah Portfolio</button>
            </div>

            {message && <div className={`admin-alert ${message.startsWith('✅') ? 'success' : 'error'}`}>{message}</div>}

            {showForm && (
                <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <h3>{editing ? 'Edit Portfolio' : 'Tambah Portfolio Baru'}</h3>
                        <div className="admin-form-group">
                            <label>Judul</label>
                            <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                        </div>
                        <div className="admin-form-group">
                            <label>URL Gambar</label>
                            <input className="admin-input" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images/portofolio/..." />
                        </div>
                        <div className="admin-form-row">
                            <div className="admin-form-group">
                                <label>Kategori</label>
                                <input className="admin-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Web, Mobile, Design..." />
                            </div>
                            <div className="admin-form-group">
                                <label>Client</label>
                                <input className="admin-input" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="Nama client (opsional)" />
                            </div>
                        </div>
                        <div className="admin-form-row">
                            <div className="admin-form-group">
                                <label>URL Project</label>
                                <input className="admin-input" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="https://... (opsional)" />
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
                    <div className="admin-card-grid">
                        {items.map(item => (
                            <div className="admin-card" key={item.id}>
                                <img src={item.image} alt={item.title} className="admin-card-img" />
                                <div className="admin-card-body">
                                    <h4>{item.title}</h4>
                                    <p>{item.category}</p>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                        <button className="admin-link" onClick={() => openEdit(item)} style={{ fontSize: '12px' }}>Edit</button>
                                        <button className="admin-link" style={{ color: '#f87171', fontSize: '12px' }} onClick={() => handleDelete(item.id, item.title)}>Hapus</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
