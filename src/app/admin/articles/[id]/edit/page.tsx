'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function EditArticlePage() {
    const router = useRouter()
    const params = useParams()
    const articleId = params.id as string

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [content, setContent] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const [status, setStatus] = useState('DRAFT')
    const [categories, setCategories] = useState<any[]>([])
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(true)
    const [aiLoading, setAiLoading] = useState(false)
    const [magazineJson, setMagazineJson] = useState<any>(null)

    useEffect(() => {
        Promise.all([
            fetch(`/api/admin/articles/${articleId}`).then(r => r.json()),
            fetch('/api/admin/categories').then(r => r.json()),
        ]).then(([article, cats]) => {
            if (article && !article.error) {
                setTitle(article.title || '')
                setSlug(article.slug || '')
                setExcerpt(article.excerpt || '')
                setContent(article.content || '')
                setCoverImage(article.coverImage || '')
                setCategoryId(article.categoryId || '')
                setTags(article.tags || [])
                setStatus(article.status || 'DRAFT')
                setMagazineJson(article.magazineJson || null)
            }
            setCategories(Array.isArray(cats) ? cats : [])
        }).catch(() => {
            setError('Gagal memuat artikel')
        }).finally(() => setLoading(false))
    }, [articleId])

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault()
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()])
            }
            setTagInput('')
        }
    }

    const handleSave = async (newStatus?: string) => {
        if (!title.trim() || !content.trim()) {
            setError('Judul dan konten wajib diisi')
            return
        }
        setError('')
        setSuccess('')
        setSaving(true)
        try {
            const res = await fetch(`/api/admin/articles/${articleId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title, slug, excerpt, content, coverImage,
                    categoryId, tags,
                    status: newStatus || status,
                    ...(magazineJson && { magazineJson }),
                }),
            })
            if (res.ok) {
                setSuccess('Artikel berhasil disimpan!')
                if (newStatus) setStatus(newStatus)
                setTimeout(() => setSuccess(''), 3000)
            } else {
                const data = await res.json()
                setError(data.error || 'Gagal menyimpan')
            }
        } catch {
            setError('Gagal menyimpan artikel')
        } finally {
            setSaving(false)
        }
    }

    const handleAIFormat = async () => {
        if (!content.trim()) {
            setError('Tulis konten terlebih dahulu')
            return
        }
        setAiLoading(true)
        setError('')
        try {
            const res = await fetch('/api/admin/ai-format', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, title }),
            })
            if (res.ok) {
                const data = await res.json()
                setMagazineJson(data.magazineJson)
                setSuccess('Magazine layout berhasil di-generate! Klik simpan untuk menerapkan.')
                setTimeout(() => setSuccess(''), 5000)
            } else {
                setError('Gagal generate layout AI')
            }
        } catch {
            setError('Gagal menghubungi AI service')
        } finally {
            setAiLoading(false)
        }
    }

    if (loading) {
        return <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
    }

    return (
        <div>
            <div className="admin-page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Link href="/admin/articles" className="admin-link">← Kembali</Link>
                    <h1>Edit Artikel</h1>
                </div>
            </div>

            {error && <div className="admin-alert error">{error}</div>}
            {success && <div className="admin-alert success">{success}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
                {/* Main Content */}
                <div>
                    <div className="admin-section">
                        <div className="admin-form-group">
                            <label>Judul Artikel</label>
                            <input className="admin-input" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="admin-form-group">
                            <label>Slug (URL)</label>
                            <input className="admin-input" value={slug} onChange={(e) => setSlug(e.target.value)} />
                        </div>
                        <div className="admin-form-group">
                            <label>Excerpt</label>
                            <textarea className="admin-textarea" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} style={{ minHeight: '80px' }} />
                        </div>
                        <div className="admin-form-group">
                            <label>Konten</label>
                            <textarea
                                className="admin-textarea"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ minHeight: '400px', fontFamily: 'monospace', fontSize: '13px' }}
                            />
                        </div>
                    </div>

                    {/* Magazine JSON Preview */}
                    {magazineJson && (
                        <div className="admin-section">
                            <h2 style={{ marginBottom: '12px' }}>Magazine Layout Preview</h2>
                            <pre style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', fontSize: '12px', overflow: 'auto', maxHeight: '300px', color: '#94a3b8' }}>
                                {JSON.stringify(magazineJson, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div>
                    <div className="admin-section">
                        <h2 style={{ marginBottom: '16px' }}>Publish</h2>
                        <div style={{ marginBottom: '12px' }}>
                            <span className={`admin-badge ${status === 'PUBLISHED' ? 'badge-success' : 'badge-warning'}`}>
                                Status: {status}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                            <button className="admin-action-btn" onClick={() => handleSave('PUBLISHED')} disabled={saving} style={{ justifyContent: 'center' }}>
                                {saving ? 'Menyimpan...' : '✅ Publish'}
                            </button>
                            <button className="admin-action-btn secondary" onClick={() => handleSave()} disabled={saving} style={{ justifyContent: 'center' }}>
                                💾 Simpan
                            </button>
                            {status === 'PUBLISHED' && (
                                <button className="admin-action-btn secondary" onClick={() => handleSave('DRAFT')} disabled={saving} style={{ justifyContent: 'center' }}>
                                    📋 Revert to Draft
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="admin-section">
                        <h2 style={{ marginBottom: '16px' }}>AI Magazine</h2>
                        <button
                            className="admin-action-btn"
                            onClick={handleAIFormat}
                            disabled={aiLoading}
                            style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
                        >
                            {aiLoading ? '🤖 Generating...' : '🤖 Generate Layout'}
                        </button>
                        <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                            Generate magazine layout via DeepSeek AI.
                        </p>
                    </div>

                    <div className="admin-section">
                        <h2 style={{ marginBottom: '16px' }}>Pengaturan</h2>
                        <div className="admin-form-group">
                            <label>Cover Image URL</label>
                            <input className="admin-input" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
                            {coverImage && <img src={coverImage} alt="Cover" style={{ width: '100%', borderRadius: '8px', marginTop: '8px' }} />}
                        </div>
                        <div className="admin-form-group">
                            <label>Kategori</label>
                            <select className="admin-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                <option value="">-- Pilih Kategori --</option>
                                {categories.map((cat: any) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="admin-form-group">
                            <label>Tags</label>
                            <div className="admin-tags-input">
                                {tags.map(tag => (
                                    <span key={tag} className="admin-tag">
                                        {tag}
                                        <button onClick={() => setTags(tags.filter(t => t !== tag))}>×</button>
                                    </span>
                                ))}
                                <input
                                    placeholder="Enter untuk menambah..."
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                />
                            </div>
                        </div>
                    </div>

                    {status === 'PUBLISHED' && (
                        <div className="admin-section">
                            <Link href={`/blog/${slug}`} className="admin-action-btn secondary" style={{ width: '100%', justifyContent: 'center' }} target="_blank">
                                🌐 Lihat di Website
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
