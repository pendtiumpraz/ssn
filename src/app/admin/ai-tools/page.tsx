'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AIToolsPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'writer' | 'topics' | 'bulk'>('writer')

    // AI Writer state
    const [writerTopic, setWriterTopic] = useState('')
    const [writerLength, setWriterLength] = useState('medium')
    const [writerLoading, setWriterLoading] = useState(false)
    const [writerResult, setWriterResult] = useState<any>(null)
    const [writerError, setWriterError] = useState('')
    const [savingArticle, setSavingArticle] = useState(false)

    // Topic Generator state
    const [topicNiche, setTopicNiche] = useState('apps dan AI')
    const [topicCount, setTopicCount] = useState(10)
    const [topicLoading, setTopicLoading] = useState(false)
    const [topics, setTopics] = useState<any[]>([])
    const [selectedTopics, setSelectedTopics] = useState<Set<number>>(new Set())

    // Bulk Create state
    const [bulkLoading, setBulkLoading] = useState(false)
    const [bulkAutoPublish, setBulkAutoPublish] = useState(false)
    const [bulkResult, setBulkResult] = useState<any>(null)
    const [bulkProgress, setBulkProgress] = useState('')

    // AI Writer
    const handleWriteArticle = async () => {
        if (!writerTopic.trim()) return
        setWriterLoading(true)
        setWriterError('')
        setWriterResult(null)
        try {
            const res = await fetch('/api/admin/ai-writer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: writerTopic, length: writerLength }),
            })
            if (res.ok) {
                const data = await res.json()
                setWriterResult(data)
            } else {
                setWriterError('Gagal generate artikel. Coba lagi.')
            }
        } catch {
            setWriterError('Error menghubungi AI service')
        } finally {
            setWriterLoading(false)
        }
    }

    const handleSaveArticle = async (status: 'DRAFT' | 'PUBLISHED') => {
        if (!writerResult) return
        setSavingArticle(true)
        try {
            const slug = writerResult.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            const res = await fetch('/api/admin/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: writerResult.title,
                    slug,
                    excerpt: writerResult.excerpt,
                    content: writerResult.content,
                    tags: writerResult.tags || [],
                    status,
                }),
            })
            if (res.ok) {
                const article = await res.json()
                router.push(`/admin/articles/${article.id}/edit`)
            } else {
                setWriterError('Gagal menyimpan artikel')
            }
        } catch {
            setWriterError('Error menyimpan artikel')
        } finally {
            setSavingArticle(false)
        }
    }

    // Topic Generator
    const handleGenerateTopics = async () => {
        setTopicLoading(true)
        setTopics([])
        setSelectedTopics(new Set())
        try {
            const res = await fetch('/api/admin/topic-generator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ niche: topicNiche, count: topicCount }),
            })
            if (res.ok) {
                const data = await res.json()
                setTopics(data.topics || [])
            }
        } catch {
            // ignore
        } finally {
            setTopicLoading(false)
        }
    }

    const toggleTopic = (index: number) => {
        const newSet = new Set(selectedTopics)
        if (newSet.has(index)) newSet.delete(index)
        else newSet.add(index)
        setSelectedTopics(newSet)
    }

    const selectAllTopics = () => {
        if (selectedTopics.size === topics.length) {
            setSelectedTopics(new Set())
        } else {
            setSelectedTopics(new Set(topics.map((_, i) => i)))
        }
    }

    // Bulk Create
    const handleBulkCreate = async () => {
        const selected = topics.filter((_, i) => selectedTopics.has(i))
        if (selected.length === 0) return
        setBulkLoading(true)
        setBulkResult(null)
        setBulkProgress(`Memproses ${selected.length} artikel...`)
        try {
            const res = await fetch('/api/admin/bulk-create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topics: selected, autoPublish: bulkAutoPublish }),
            })
            if (res.ok) {
                const data = await res.json()
                setBulkResult(data)
                setBulkProgress('')
            } else {
                setBulkProgress('Gagal membuat artikel')
            }
        } catch {
            setBulkProgress('Error')
        } finally {
            setBulkLoading(false)
        }
    }

    return (
        <div>
            <div className="admin-page-header">
                <h1>AI Tools</h1>
                <p>Gunakan AI untuk menulis dan mengelola konten blog</p>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
                {[
                    { key: 'writer', label: 'AI Writer', icon: '✍️' },
                    { key: 'topics', label: 'Topic Generator', icon: '💡' },
                    { key: 'bulk', label: 'Bulk Create', icon: '⚡' },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className={`admin-action-btn ${activeTab === tab.key ? '' : 'secondary'}`}
                        style={{ borderRadius: '8px 8px 0 0' }}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* AI Writer Tab */}
            {activeTab === 'writer' && (
                <div>
                    <div className="admin-section">
                        <h2 style={{ marginBottom: '16px' }}>AI Article Writer</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Masukkan topik dan AI akan menulis artikel lengkap untuk Anda.</p>
                        <div className="admin-form-row">
                            <div className="admin-form-group">
                                <label>Topik Artikel</label>
                                <input
                                    className="admin-input"
                                    placeholder="Contoh: Cara Membuat Aplikasi Mobile dengan Flutter"
                                    value={writerTopic}
                                    onChange={(e) => setWriterTopic(e.target.value)}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Panjang Artikel</label>
                                <select className="admin-select" value={writerLength} onChange={(e) => setWriterLength(e.target.value)}>
                                    <option value="short">Pendek (500-800 kata)</option>
                                    <option value="medium">Sedang (1000-1500 kata)</option>
                                    <option value="long">Panjang (2000-3000 kata)</option>
                                </select>
                            </div>
                        </div>
                        <button
                            className="admin-action-btn"
                            onClick={handleWriteArticle}
                            disabled={writerLoading || !writerTopic.trim()}
                            style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
                        >
                            {writerLoading ? '🤖 Menulis artikel...' : '🤖 Tulis Artikel dengan AI'}
                        </button>
                    </div>

                    {writerError && <div className="admin-alert error">{writerError}</div>}

                    {writerResult && (
                        <div className="admin-section">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h2>Hasil AI Writer</h2>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="admin-action-btn" onClick={() => handleSaveArticle('PUBLISHED')} disabled={savingArticle}>
                                        ✅ Publish
                                    </button>
                                    <button className="admin-action-btn secondary" onClick={() => handleSaveArticle('DRAFT')} disabled={savingArticle}>
                                        📋 Simpan Draft
                                    </button>
                                </div>
                            </div>
                            <h3 style={{ color: '#f1f5f9', fontSize: '20px', marginBottom: '8px' }}>{writerResult.title}</h3>
                            <p style={{ color: '#94a3b8', fontStyle: 'italic', marginBottom: '12px' }}>{writerResult.excerpt}</p>
                            {writerResult.tags && (
                                <div style={{ marginBottom: '16px' }}>
                                    {writerResult.tags.map((tag: string) => (
                                        <span key={tag} className="admin-tag" style={{ marginRight: '6px' }}>#{tag}</span>
                                    ))}
                                </div>
                            )}
                            <div style={{ background: '#0f172a', borderRadius: '8px', padding: '20px', maxHeight: '400px', overflow: 'auto', color: '#cbd5e1', lineHeight: 1.7 }}
                                dangerouslySetInnerHTML={{ __html: writerResult.content }}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Topic Generator Tab */}
            {activeTab === 'topics' && (
                <div>
                    <div className="admin-section">
                        <h2 style={{ marginBottom: '16px' }}>Topic Generator</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Generate ide topik artikel seputar niche yang Anda inginkan.</p>
                        <div className="admin-form-row">
                            <div className="admin-form-group">
                                <label>Niche / Tema</label>
                                <input
                                    className="admin-input"
                                    placeholder="Contoh: apps dan AI, mobile development"
                                    value={topicNiche}
                                    onChange={(e) => setTopicNiche(e.target.value)}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Jumlah Topik</label>
                                <select className="admin-select" value={topicCount} onChange={(e) => setTopicCount(Number(e.target.value))}>
                                    <option value={5}>5 topik</option>
                                    <option value={10}>10 topik</option>
                                    <option value={15}>15 topik</option>
                                    <option value={20}>20 topik</option>
                                </select>
                            </div>
                        </div>
                        <button
                            className="admin-action-btn"
                            onClick={handleGenerateTopics}
                            disabled={topicLoading}
                            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                        >
                            {topicLoading ? '💡 Generating topik...' : '💡 Generate Topik'}
                        </button>
                    </div>

                    {topics.length > 0 && (
                        <div className="admin-section">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h2>{topics.length} Topik Ditemukan</h2>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <button className="admin-action-btn secondary" onClick={selectAllTopics}>
                                        {selectedTopics.size === topics.length ? 'Batal Pilih' : 'Pilih Semua'}
                                    </button>
                                    {selectedTopics.size > 0 && (
                                        <button className="admin-action-btn" onClick={() => setActiveTab('bulk')}>
                                            ⚡ Bulk Create ({selectedTopics.size})
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {topics.map((topic, index) => (
                                    <div
                                        key={index}
                                        onClick={() => toggleTopic(index)}
                                        style={{
                                            display: 'flex', alignItems: 'flex-start', gap: '12px',
                                            padding: '16px', borderRadius: '8px', cursor: 'pointer',
                                            background: selectedTopics.has(index) ? 'rgba(99, 102, 241, 0.15)' : '#0f172a',
                                            border: `1px solid ${selectedTopics.has(index) ? '#6366f1' : '#334155'}`,
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        <div style={{
                                            width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0, marginTop: '2px',
                                            border: `2px solid ${selectedTopics.has(index) ? '#6366f1' : '#475569'}`,
                                            background: selectedTopics.has(index) ? '#6366f1' : 'transparent',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontSize: '12px',
                                        }}>
                                            {selectedTopics.has(index) && '✓'}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ color: '#e2e8f0', margin: '0 0 4px', fontSize: '15px' }}>{topic.title}</h4>
                                            <p style={{ color: '#94a3b8', margin: '0 0 6px', fontSize: '13px' }}>{topic.description}</p>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                <span className="admin-badge badge-success" style={{ fontSize: '11px' }}>{topic.category}</span>
                                                <span style={{ color: '#64748b', fontSize: '12px' }}>{topic.difficulty} • {topic.estimatedReadTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Bulk Create Tab */}
            {activeTab === 'bulk' && (
                <div>
                    <div className="admin-section">
                        <h2 style={{ marginBottom: '16px' }}>Bulk Create Articles</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                            Buat banyak artikel sekaligus dari topik yang sudah dipilih.
                            {selectedTopics.size > 0 && ` (${selectedTopics.size} topik terpilih)`}
                        </p>

                        {selectedTopics.size === 0 && topics.length === 0 && (
                            <div className="admin-empty-state">
                                <p>Belum ada topik yang dipilih.</p>
                                <button className="admin-action-btn" onClick={() => setActiveTab('topics')} style={{ marginTop: '12px' }}>
                                    💡 Generate Topik Dulu
                                </button>
                            </div>
                        )}

                        {selectedTopics.size > 0 && (
                            <>
                                <div style={{ marginBottom: '16px' }}>
                                    <h3 style={{ color: '#f1f5f9', fontSize: '16px', marginBottom: '12px' }}>Topik yang akan dibuat:</h3>
                                    {topics.filter((_, i) => selectedTopics.has(i)).map((topic, index) => (
                                        <div key={index} style={{ padding: '8px 12px', background: '#0f172a', borderRadius: '6px', marginBottom: '4px', fontSize: '14px', color: '#cbd5e1' }}>
                                            {index + 1}. {topic.title}
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={bulkAutoPublish}
                                            onChange={(e) => setBulkAutoPublish(e.target.checked)}
                                            style={{ width: '16px', height: '16px' }}
                                        />
                                        Auto-publish artikel
                                    </label>
                                </div>
                                <button
                                    className="admin-action-btn"
                                    onClick={handleBulkCreate}
                                    disabled={bulkLoading}
                                    style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}
                                >
                                    {bulkLoading ? `⚡ ${bulkProgress}` : `⚡ Buat ${selectedTopics.size} Artikel`}
                                </button>
                            </>
                        )}
                    </div>

                    {bulkResult && (
                        <div className="admin-section">
                            <h2 style={{ marginBottom: '16px' }}>Hasil Bulk Create</h2>
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                                <div className="admin-stat-card" style={{ flex: 1 }}>
                                    <div className="admin-stat-icon" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>✅</div>
                                    <div className="admin-stat-info">
                                        <h3>{bulkResult.created}</h3>
                                        <p>Berhasil</p>
                                    </div>
                                </div>
                                {bulkResult.failed > 0 && (
                                    <div className="admin-stat-card" style={{ flex: 1 }}>
                                        <div className="admin-stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>❌</div>
                                        <div className="admin-stat-info">
                                            <h3>{bulkResult.failed}</h3>
                                            <p>Gagal</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {bulkResult.articles?.length > 0 && (
                                <div className="admin-table-wrapper">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Judul</th>
                                                <th>Status</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bulkResult.articles.map((art: any) => (
                                                <tr key={art.id}>
                                                    <td>{art.title}</td>
                                                    <td><span className={`admin-badge ${art.status === 'PUBLISHED' ? 'badge-success' : 'badge-warning'}`}>{art.status}</span></td>
                                                    <td><Link href={`/admin/articles/${art.id}/edit`} className="admin-link">Edit</Link></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <div style={{ marginTop: '12px' }}>
                                <Link href="/admin/articles" className="admin-action-btn secondary">
                                    Lihat Semua Artikel →
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
