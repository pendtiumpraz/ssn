'use client'

import { useEffect, useState } from 'react'

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            className={`scroll-top tran3s${isVisible ? ' active' : ''}`}
            onClick={scrollToTop}
            style={{ display: isVisible ? 'block' : 'none' }}
        >
            <i className="fa fa-angle-up" aria-hidden="true"></i>
        </button>
    )
}
