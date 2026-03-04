'use client'

import { useEffect, useState } from 'react'

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [newName, setNewName] = useState('')
    const [creating, setCreating] = useState(false)
    const [error, setError] = useState('')

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/categories')
            if (res.ok) setCategories(await res.json())
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchCategories() }, [])

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newName.trim()) return
        setCreating(true)
        setError('')
        try {
            const res = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName.trim() }),
            })
            if (res.ok) {
                setNewName('')
                setShowModal(false)
                fetchCategories()
            } else {
                const data = await res.json()
                setError(data.error || 'Gagal menambah kategori')
            }
        } catch {
            setError('Gagal menambah kategori')
        } finally {
            setCreating(false)
        }
    }

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Hapus kategori "${name}"?`)) return
        try {
            const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
            if (res.ok) {
                fetchCategories()
            } else {
                const data = await res.json()
                alert(data.error || 'Gagal menghapus')
            }
        } catch {
            alert('Gagal menghapus kategori')
        }
    }

    return (
        <div>
            <div className="admin-page-header">
                <h1>Kategori</h1>
                <p>Kelola kategori artikel blog</p>
            </div>

            <div className="admin-toolbar">
                <div />
                <button className="admin-action-btn" onClick={() => setShowModal(true)}>
                    ➕ Tambah Kategori
                </button>
            </div>

            <div className="admin-section" style={{ padding: 0 }}>
                {loading ? (
                    <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
                ) : categories.length === 0 ? (
                    <div className="admin-empty-state">
                        <p>Belum ada kategori.</p>
                    </div>
                ) : (
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Slug</th>
                                    <th>Jumlah Artikel</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((cat: any) => (
                                    <tr key={cat.id}>
                                        <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{cat.name}</td>
                                        <td style={{ color: '#64748b' }}>{cat.slug}</td>
                                        <td>{cat._count?.articles ?? 0}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(cat.id, cat.name)}
                                                style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 0, fontSize: '14px' }}
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add Category Modal */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Tambah Kategori Baru</h3>
                        {error && <div className="admin-alert error">{error}</div>}
                        <form onSubmit={handleCreate}>
                            <div className="admin-form-group">
                                <label>Nama Kategori</label>
                                <input
                                    className="admin-input"
                                    placeholder="Nama kategori..."
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                <button type="button" className="admin-action-btn secondary" onClick={() => setShowModal(false)}>
                                    Batal
                                </button>
                                <button type="submit" className="admin-action-btn" disabled={creating}>
                                    {creating ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
