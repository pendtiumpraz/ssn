'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import PathShape from '@/components/PathShape'
import ScriptsLoader from '@/components/ScriptsLoader'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdmin = pathname.startsWith('/admin')

    if (isAdmin) {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <>
            <div className="main-page-wrapper">
                <Header />
                {children}
                <Footer />
                <ScrollToTop />
                <PathShape />
            </div>
            <ScriptsLoader />
        </>
    )
}
