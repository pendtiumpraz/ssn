'use client'

import { useState, useEffect } from 'react'

const PAGE_DEFINITIONS = [
    {
        slug: 'home', label: 'Home', fields: [
            { key: 'heroTitle', label: 'Hero Title', type: 'text' },
            { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
            { key: 'heroBtn1Text', label: 'Button 1 Text', type: 'text' },
            { key: 'heroBtn1Link', label: 'Button 1 Link', type: 'text' },
            { key: 'heroBtn2Text', label: 'Button 2 Text', type: 'text' },
            { key: 'heroBtn2Link', label: 'Button 2 Link', type: 'text' },
            { key: 'aboutTitle', label: 'Section About Title', type: 'text' },
            { key: 'aboutText', label: 'Section About Text', type: 'textarea' },
            { key: 'featureTitle', label: 'Feature Section Title', type: 'text' },
        ]
    },
    {
        slug: 'about', label: 'About', fields: [
            { key: 'bannerTitle', label: 'Banner Title', type: 'text' },
            { key: 'bannerSubtitle', label: 'Banner Subtitle', type: 'text' },
            { key: 'aboutText', label: 'About Text', type: 'textarea' },
            { key: 'missionTitle', label: 'Mission Title', type: 'text' },
            { key: 'missionText', label: 'Mission Text', type: 'textarea' },
            { key: 'visionTitle', label: 'Vision Title', type: 'text' },
            { key: 'visionText', label: 'Vision Text', type: 'textarea' },
        ]
    },
    {
        slug: 'service', label: 'Service', fields: [
            { key: 'bannerTitle', label: 'Banner Title', type: 'text' },
            { key: 'bannerSubtitle', label: 'Banner Subtitle', type: 'text' },
            { key: 'services', label: 'Services List (JSON)', type: 'code' },
        ]
    },
    {
        slug: 'team', label: 'Team', fields: [
            { key: 'bannerTitle', label: 'Banner Title', type: 'text' },
            { key: 'bannerSubtitle', label: 'Banner Subtitle', type: 'text' },
            { key: 'teamMembers', label: 'Team Members (JSON)', type: 'code' },
        ]
    },
    {
        slug: 'portfolio', label: 'Portfolio', fields: [
            { key: 'bannerTitle', label: 'Banner Title', type: 'text' },
            { key: 'bannerSubtitle', label: 'Banner Subtitle', type: 'text' },
            { key: 'portfolioItems', label: 'Portfolio Items (JSON)', type: 'code' },
        ]
    },
    {
        slug: 'contact', label: 'Contact', fields: [
            { key: 'bannerTitle', label: 'Banner Title', type: 'text' },
            { key: 'bannerSubtitle', label: 'Banner Subtitle', type: 'text' },
            { key: 'address', label: 'Address', type: 'textarea' },
            { key: 'email', label: 'Email', type: 'text' },
            { key: 'phone', label: 'Phone', type: 'text' },
        ]
    },
]

export default function PagesManagement() {
    const [activePage, setActivePage] = useState('home')
    const [sections, setSections] = useState<Record<string, string>>({})
    const [pageTitle, setPageTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    const currentDef = PAGE_DEFINITIONS.find(p => p.slug === activePage)!

    useEffect(() => {
        loadPage(activePage)
    }, [activePage])

    const loadPage = async (slug: string) => {
        setLoading(true)
        setMessage('')
        try {
            const res = await fetch(`/api/admin/pages/${slug}`)
            if (res.ok) {
                const data = await res.json()
                setPageTitle(data.title || '')
                const s = data.sections || {}
                setSections(typeof s === 'object' ? s : {})
            } else {
                setPageTitle(currentDef?.label || slug)
                setSections({})
            }
        } catch {
            setSections({})
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        setMessage('')
        try {
            const res = await fetch(`/api/admin/pages/${activePage}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: pageTitle, sections }),
            })
            if (res.ok) {
                setMessage('✅ Halaman berhasil disimpan!')
            } else {
                setMessage('❌ Gagal menyimpan')
            }
        } catch {
            setMessage('❌ Error')
        } finally {
            setSaving(false)
        }
    }

    const updateField = (key: string, value: string) => {
        setSections(prev => ({ ...prev, [key]: value }))
    }

    return (
        <div>
            <div className="admin-page-header">
                <h1>Halaman Website</h1>
                <p>Kelola konten semua halaman publik website</p>
            </div>

            {/* Page Tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {PAGE_DEFINITIONS.map(page => (
                    <button
                        key={page.slug}
                        onClick={() => setActivePage(page.slug)}
                        className={`admin-action-btn ${activePage === page.slug ? '' : 'secondary'}`}
                        style={{ borderRadius: '8px 8px 0 0', fontSize: '13px', padding: '8px 16px' }}
                    >
                        {page.label}
                    </button>
                ))}
            </div>

            {message && (
                <div className={`admin-alert ${message.startsWith('✅') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            {loading ? (
                <div className="admin-loading">Memuat konten halaman...</div>
            ) : (
                <div className="admin-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2>Edit Halaman: {currentDef.label}</h2>
                        <button className="admin-action-btn" onClick={handleSave} disabled={saving}>
                            {saving ? 'Menyimpan...' : '💾 Simpan'}
                        </button>
                    </div>

                    <div className="admin-form-group">
                        <label>Page Title</label>
                        <input
                            className="admin-input"
                            value={pageTitle}
                            onChange={e => setPageTitle(e.target.value)}
                            placeholder="Judul halaman"
                        />
                    </div>

                    {currentDef.fields.map(field => (
                        <div className="admin-form-group" key={field.key}>
                            <label>{field.label}</label>
                            {field.type === 'text' && (
                                <input
                                    className="admin-input"
                                    value={sections[field.key] || ''}
                                    onChange={e => updateField(field.key, e.target.value)}
                                    placeholder={field.label}
                                />
                            )}
                            {field.type === 'textarea' && (
                                <textarea
                                    className="admin-textarea"
                                    value={sections[field.key] || ''}
                                    onChange={e => updateField(field.key, e.target.value)}
                                    placeholder={field.label}
                                    rows={4}
                                />
                            )}
                            {field.type === 'code' && (
                                <textarea
                                    className="admin-textarea"
                                    value={sections[field.key] || '[]'}
                                    onChange={e => updateField(field.key, e.target.value)}
                                    placeholder={`JSON array for ${field.label}`}
                                    rows={8}
                                    style={{ fontFamily: 'monospace', fontSize: '13px' }}
                                />
                            )}
                        </div>
                    ))}

                    <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                        <button className="admin-action-btn" onClick={handleSave} disabled={saving}>
                            {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
