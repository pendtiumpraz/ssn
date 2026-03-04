'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface DashboardStats {
    totalArticles: number
    publishedArticles: number
    draftArticles: number
    totalCategories: number
    totalMedia: number
    totalUsers: number
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [recentArticles, setRecentArticles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const [statsRes, articlesRes] = await Promise.all([
                    fetch('/api/admin/stats'),
                    fetch('/api/admin/articles?limit=5'),
                ])
                if (statsRes.ok) setStats(await statsRes.json())
                if (articlesRes.ok) {
                    const data = await articlesRes.json()
                    setRecentArticles(data.articles || [])
                }
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className="admin-page-header">
                <h1>Dashboard</h1>
                <p>Selamat datang di Admin Panel Sainskerta Nusantara</p>
            </div>

            {/* Stats Cards */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="admin-stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>📝</div>
                    <div className="admin-stat-info">
                        <h3>{loading ? '...' : stats?.totalArticles ?? 0}</h3>
                        <p>Total Artikel</p>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="admin-stat-icon" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>✅</div>
                    <div className="admin-stat-info">
                        <h3>{loading ? '...' : stats?.publishedArticles ?? 0}</h3>
                        <p>Published</p>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="admin-stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>📋</div>
                    <div className="admin-stat-info">
                        <h3>{loading ? '...' : stats?.draftArticles ?? 0}</h3>
                        <p>Draft</p>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="admin-stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>📁</div>
                    <div className="admin-stat-info">
                        <h3>{loading ? '...' : stats?.totalCategories ?? 0}</h3>
                        <p>Kategori</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="admin-section">
                <h2>Quick Actions</h2>
                <div className="admin-quick-actions">
                    <Link href="/admin/articles/new" className="admin-action-btn">
                        <span>✍️</span> Tulis Artikel Baru
                    </Link>
                    <Link href="/admin/categories" className="admin-action-btn">
                        <span>📁</span> Kelola Kategori
                    </Link>
                    <Link href="/admin/media" className="admin-action-btn">
                        <span>🖼️</span> Upload Media
                    </Link>
                </div>
            </div>

            {/* Recent Articles */}
            <div className="admin-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2>Artikel Terbaru</h2>
                    <Link href="/admin/articles" className="admin-link">Lihat Semua →</Link>
                </div>
                {loading ? (
                    <p style={{ color: '#94a3b8' }}>Loading...</p>
                ) : recentArticles.length === 0 ? (
                    <div className="admin-empty-state">
                        <p>Belum ada artikel. <Link href="/admin/articles/new">Tulis artikel pertama →</Link></p>
                    </div>
                ) : (
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Judul</th>
                                    <th>Status</th>
                                    <th>Kategori</th>
                                    <th>Tanggal</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentArticles.map((article: any) => (
                                    <tr key={article.id}>
                                        <td>{article.title}</td>
                                        <td>
                                            <span className={`admin-badge ${article.status === 'PUBLISHED' ? 'badge-success' : 'badge-warning'}`}>
                                                {article.status}
                                            </span>
                                        </td>
                                        <td>{article.category?.name || '-'}</td>
                                        <td>{new Date(article.createdAt).toLocaleDateString('id-ID')}</td>
                                        <td>
                                            <Link href={`/admin/articles/${article.id}/edit`} className="admin-link">Edit</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
