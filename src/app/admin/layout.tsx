'use client'

import './admin.css'
import { useSession, SessionProvider } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

// Flat 2D SVG Icons
const icons = {
    dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
    article: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10,9 9,9 8,9" /></svg>,
    category: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></svg>,
    media: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg>,
    ai: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 014 4v1h2a2 2 0 012 2v2a2 2 0 01-2 2h-1v1a4 4 0 01-8 0v-1H8a2 2 0 01-2-2V9a2 2 0 012-2h2V6a4 4 0 014-4z" /><circle cx="9" cy="10" r="1" /><circle cx="15" cy="10" r="1" /><path d="M9.5 15a3.5 3.5 0 005 0" /></svg>,
    pages: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><line x1="4" y1="10" x2="20" y2="10" /><line x1="10" y1="4" x2="10" y2="20" /></svg>,
    team: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
    portfolio: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>,
    services: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
    users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    logout: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
    globe: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
    toggle: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,18 9,12 15,6" /></svg>,
    toggleR: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6" /></svg>,
}

function AdminSidebar() {
    const pathname = usePathname()
    const { data: session } = useSession()
    const [collapsed, setCollapsed] = useState(false)

    const menuItems = [
        { href: '/admin', label: 'Dashboard', icon: icons.dashboard, exact: true },
        { href: '/admin/articles', label: 'Artikel', icon: icons.article },
        { href: '/admin/categories', label: 'Kategori', icon: icons.category },
        { href: '/admin/media', label: 'Media', icon: icons.media },
        { href: '/admin/ai-tools', label: 'AI Tools', icon: icons.ai },
        { href: '/admin/team', label: 'Tim', icon: icons.team },
        { href: '/admin/portfolio', label: 'Portfolio', icon: icons.portfolio },
        { href: '/admin/services', label: 'Layanan', icon: icons.services },
        { href: '/admin/pages', label: 'Halaman', icon: icons.pages },
        { href: '/admin/users', label: 'Users', icon: icons.users },
    ]

    const isActive = (href: string, exact?: boolean) => {
        if (exact) return pathname === href
        return pathname === href || pathname.startsWith(href + '/')
    }

    return (
        <div className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="admin-sidebar-header">
                <Link href="/admin" className="admin-logo">
                    <img src="/images/logo/sainskerta.svg" alt="SSN" style={{ maxWidth: collapsed ? '40px' : '160px', transition: 'all 0.3s' }} />
                </Link>
                <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? icons.toggleR : icons.toggle}
                </button>
            </div>
            <nav className="admin-nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`admin-nav-item ${isActive(item.href, item.exact) ? 'active' : ''}`}
                    >
                        <span className="admin-nav-icon">{item.icon}</span>
                        {!collapsed && <span className="admin-nav-label">{item.label}</span>}
                    </Link>
                ))}
            </nav>
            <div className="admin-sidebar-footer">
                {!collapsed && (
                    <div className="admin-user-info">
                        <small style={{ color: '#94a3b8' }}>{session?.user?.email}</small>
                    </div>
                )}
                <button className="admin-nav-item" onClick={() => signOut({ callbackUrl: '/login' })} style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
                    <span className="admin-nav-icon">{icons.logout}</span>
                    {!collapsed && <span className="admin-nav-label">Logout</span>}
                </button>
                <Link href="/" className="admin-nav-item" style={{ marginTop: '4px' }}>
                    <span className="admin-nav-icon">{icons.globe}</span>
                    {!collapsed && <span className="admin-nav-label">Lihat Website</span>}
                </Link>
            </div>
        </div>
    )
}

function AdminContent({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === 'loading') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%' }}>
                <div className="admin-loading">Loading...</div>
            </div>
        )
    }

    if (!session || (session.user as any)?.role !== 'ADMIN') {
        router.push('/login')
        return null
    }

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AdminContent>{children}</AdminContent>
        </SessionProvider>
    )
}
