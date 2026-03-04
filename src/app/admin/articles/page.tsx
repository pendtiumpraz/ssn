'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ArticlesPage() {
    const [articles, setArticles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchArticles = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({ page: String(page), limit: '10' })
            if (search) params.set('search', search)
            if (statusFilter) params.set('status', statusFilter)
            const res = await fetch(`/api/admin/articles?${params}`)
            if (res.ok) {
                const data = await res.json()
                setArticles(data.articles || [])
                setTotalPages(data.totalPages || 1)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchArticles() }, [page, statusFilter])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setPage(1)
        fetchArticles()
    }

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Hapus artikel "${title}"?`)) return
        try {
            const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' })
            if (res.ok) fetchArticles()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <div className="admin-page-header">
                <h1>Artikel</h1>
                <p>Kelola semua artikel blog Anda</p>
            </div>

            <div className="admin-toolbar">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
                        <input
                            className="admin-input"
                            placeholder="Cari artikel..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '250px' }}
                        />
                        <button type="submit" className="admin-action-btn secondary">Cari</button>
                    </form>
                    <select
                        className="admin-select"
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
                        style={{ width: '150px' }}
                    >
                        <option value="">Semua Status</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="DRAFT">Draft</option>
                    </select>
                </div>
                <Link href="/admin/articles/new" className="admin-action-btn">
                    ✍️ Tulis Artikel Baru
                </Link>
            </div>

            <div className="admin-section" style={{ padding: 0 }}>
                {loading ? (
                    <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
                ) : articles.length === 0 ? (
                    <div className="admin-empty-state">
                        <p>Belum ada artikel.</p>
                        <Link href="/admin/articles/new" className="admin-action-btn" style={{ marginTop: '12px', display: 'inline-flex' }}>
                            Tulis Artikel Pertama
                        </Link>
                    </div>
                ) : (
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Judul</th>
                                    <th>Status</th>
                                    <th>Kategori</th>
                                    <th>Penulis</th>
                                    <th>Tanggal</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article: any) => (
                                    <tr key={article.id}>
                                        <td>
                                            <div>
                                                <strong style={{ color: '#e2e8f0' }}>{article.title}</strong>
                                                {article.excerpt && (
                                                    <p style={{ color: '#64748b', fontSize: '12px', margin: '4px 0 0', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {article.excerpt}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`admin-badge ${article.status === 'PUBLISHED' ? 'badge-success' : 'badge-warning'}`}>
                                                {article.status}
                                            </span>
                                        </td>
                                        <td>{article.category?.name || '-'}</td>
                                        <td>{article.author?.name || '-'}</td>
                                        <td style={{ whiteSpace: 'nowrap' }}>{new Date(article.createdAt).toLocaleDateString('id-ID')}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <Link href={`/admin/articles/${article.id}/edit`} className="admin-link">Edit</Link>
                                                {article.status === 'PUBLISHED' && (
                                                    <Link href={`/blog/${article.slug}`} className="admin-link" target="_blank">Lihat</Link>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(article.id, article.title)}
                                                    className="admin-link"
                                                    style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 0 }}
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                    <button
                        className="admin-action-btn secondary"
                        disabled={page <= 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ← Prev
                    </button>
                    <span style={{ padding: '10px 16px', color: '#94a3b8' }}>
                        {page} / {totalPages}
                    </span>
                    <button
                        className="admin-action-btn secondary"
                        disabled={page >= totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    )
}
