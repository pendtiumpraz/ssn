'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/blog', label: 'Blog' },
        { href: '/service', label: 'Service' },
        { href: '/about', label: 'About' },
        { href: '/team', label: 'Team' },
        { href: '/portfolio', label: 'Portfolio' },
    ]

    return (
        <div className="theme-main-menu theme-menu-one sticky-menu">
            <div className="d-flex align-items-center">
                <div className="logo mr-auto">
                    <Link href="/">
                        <img src="/images/logo/sainskerta.svg" className="logo-banner" alt="Sainskerta Nusantara" />
                    </Link>
                </div>
                <div className="right-content order-lg-3">
                    <ul className="d-flex align-items-center">
                        <li className="action-list-item">
                            <Link href="/contact" className="theme-btn line-button-one contact-button">Contact us</Link>
                        </li>
                    </ul>
                </div>

                <nav id="mega-menu-holder" className="navbar navbar-expand-lg order-lg-2">
                    <div className="container nav-container">
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="flaticon-setup"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                {navItems.map((item) => (
                                    <li key={item.href} className={`nav-item${pathname === item.href ? ' active' : ''}`}>
                                        <Link className="nav-link" href={item.href}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
