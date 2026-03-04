'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewArticlePage() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [content, setContent] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const [categories, setCategories] = useState<any[]>([])
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [aiLoading, setAiLoading] = useState(false)

    useEffect(() => {
        fetch('/api/admin/categories')
            .then(r => r.json())
            .then(data => setCategories(Array.isArray(data) ? data : []))
            .catch(() => { })
    }, [])

    const generateSlug = useCallback((t: string) => {
        return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }, [])

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setTitle(val)
        setSlug(generateSlug(val))
    }

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault()
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()])
            }
            setTagInput('')
        }
    }

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag))
    }

    const handleSave = async (status: 'DRAFT' | 'PUBLISHED') => {
        if (!title.trim() || !content.trim()) {
            setError('Judul dan konten wajib diisi')
            return
        }
        setError('')
        setSaving(true)
        try {
            const res = await fetch('/api/admin/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, slug, excerpt, content, coverImage, categoryId, tags, status }),
            })
            if (res.ok) {
                const article = await res.json()
                router.push(`/admin/articles/${article.id}/edit`)
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
                alert('Magazine layout berhasil di-generate! Layout akan diterapkan setelah artikel disimpan.')
            } else {
                setError('Gagal generate layout AI')
            }
        } catch {
            setError('Gagal menghubungi AI service')
        } finally {
            setAiLoading(false)
        }
    }

    return (
        <div>
            <div className="admin-page-header">
                <h1>Tulis Artikel Baru</h1>
                <p>Buat artikel blog baru</p>
            </div>

            {error && <div className="admin-alert error">{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
                {/* Main Content */}
                <div>
                    <div className="admin-section">
                        <div className="admin-form-group">
                            <label>Judul Artikel</label>
                            <input
                                className="admin-input"
                                placeholder="Masukkan judul artikel..."
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div className="admin-form-group">
                            <label>Slug (URL)</label>
                            <input
                                className="admin-input"
                                placeholder="slug-artikel"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                            />
                        </div>
                        <div className="admin-form-group">
                            <label>Excerpt (Ringkasan)</label>
                            <textarea
                                className="admin-textarea"
                                placeholder="Ringkasan singkat artikel..."
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                style={{ minHeight: '80px' }}
                            />
                        </div>
                        <div className="admin-form-group">
                            <label>Konten</label>
                            <textarea
                                className="admin-textarea"
                                placeholder="Tulis konten artikel di sini... (Mendukung HTML)"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ minHeight: '400px', fontFamily: 'monospace', fontSize: '13px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div>
                    <div className="admin-section">
                        <h2 style={{ marginBottom: '16px' }}>Publish</h2>
                        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                            <button
                                className="admin-action-btn"
                                onClick={() => handleSave('PUBLISHED')}
                                disabled={saving}
                                style={{ justifyContent: 'center' }}
                            >
                                {saving ? 'Menyimpan...' : '✅ Publish'}
                            </button>
                            <button
                                className="admin-action-btn secondary"
                                onClick={() => handleSave('DRAFT')}
                                disabled={saving}
                                style={{ justifyContent: 'center' }}
                            >
                                📋 Simpan Draft
                            </button>
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
                            Gunakan DeepSeek AI untuk membuat layout majalah dari konten Anda.
                        </p>
                    </div>

                    <div className="admin-section">
                        <h2 style={{ marginBottom: '16px' }}>Pengaturan</h2>
                        <div className="admin-form-group">
                            <label>Cover Image URL</label>
                            <input
                                className="admin-input"
                                placeholder="https://..."
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                            />
                            {coverImage && (
                                <img src={coverImage} alt="Cover" style={{ width: '100%', borderRadius: '8px', marginTop: '8px' }} />
                            )}
                        </div>
                        <div className="admin-form-group">
                            <label>Kategori</label>
                            <select
                                className="admin-select"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
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
                                        <button onClick={() => handleRemoveTag(tag)}>×</button>
                                    </span>
                                ))}
                                <input
                                    placeholder="Tekan Enter untuk menambah..."
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
