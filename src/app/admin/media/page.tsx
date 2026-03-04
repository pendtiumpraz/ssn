'use client'

import { useEffect, useState, useRef } from 'react'

export default function MediaPage() {
    const [media, setMedia] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [dragover, setDragover] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const fetchMedia = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/media')
            if (res.ok) setMedia(await res.json())
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchMedia() }, [])

    const handleUpload = async (files: FileList) => {
        setUploading(true)
        try {
            for (const file of Array.from(files)) {
                const formData = new FormData()
                formData.append('file', file)
                await fetch('/api/admin/media', { method: 'POST', body: formData })
            }
            fetchMedia()
        } catch (err) {
            console.error(err)
            alert('Gagal upload file')
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async (id: string, filename: string) => {
        if (!confirm(`Hapus "${filename}"?`)) return
        try {
            const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
            if (res.ok) fetchMedia()
        } catch (err) {
            console.error(err)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragover(false)
        if (e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        alert('URL disalin ke clipboard!')
    }

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }

    return (
        <div>
            <div className="admin-page-header">
                <h1>Media</h1>
                <p>Upload dan kelola file media</p>
            </div>

            {/* Upload Zone */}
            <div
                className={`admin-upload-zone ${dragover ? 'dragover' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragover(true) }}
                onDragLeave={() => setDragover(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{ marginBottom: '24px' }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    onChange={(e) => e.target.files && handleUpload(e.target.files)}
                />
                {uploading ? (
                    <p>⏳ Uploading...</p>
                ) : (
                    <>
                        <p style={{ fontSize: '32px', marginBottom: '8px' }}>📁</p>
                        <p style={{ fontSize: '16px', fontWeight: 500 }}>Drag & drop file di sini atau klik untuk upload</p>
                        <p style={{ fontSize: '13px', marginTop: '8px' }}>Mendukung gambar, video, PDF, dan dokumen</p>
                    </>
                )}
            </div>

            {/* Media Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>Loading...</div>
            ) : media.length === 0 ? (
                <div className="admin-empty-state">
                    <p>Belum ada media yang di-upload.</p>
                </div>
            ) : (
                <div className="admin-card-grid">
                    {media.map((item: any) => (
                        <div key={item.id} className="admin-card">
                            {item.mimeType?.startsWith('image/') ? (
                                <img src={item.url} alt={item.filename} className="admin-card-img" />
                            ) : (
                                <div className="admin-card-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', color: '#64748b' }}>
                                    📄
                                </div>
                            )}
                            <div className="admin-card-body">
                                <h4 title={item.filename}>{item.filename}</h4>
                                <p>{formatSize(item.size)} • {new Date(item.createdAt).toLocaleDateString('id-ID')}</p>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                    <button
                                        onClick={() => copyToClipboard(item.url)}
                                        style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                                    >
                                        📋 Copy URL
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id, item.filename)}
                                        style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                                    >
                                        🗑️ Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
