'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScriptsLoader() {
    const pathname = usePathname()

    useEffect(() => {
        // Load jQuery and plugins
        const loadScript = (src: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                // Check if script is already loaded
                const existing = document.querySelector(`script[src="${src}"]`)
                if (existing) {
                    resolve()
                    return
                }
                const script = document.createElement('script')
                script.src = src
                script.async = false
                script.onload = () => resolve()
                script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
                document.body.appendChild(script)
            })
        }

        const initScripts = async () => {
            try {
                await loadScript('/vendor/jquery.2.2.3.min.js')
                await loadScript('/vendor/popper.js/popper.min.js')
                await loadScript('/vendor/bootstrap/js/bootstrap.min.js')
                await loadScript('/vendor/mega-menu/assets/js/custom.js')
                await loadScript('/vendor/aos-next/dist/aos.js')
                await loadScript('/vendor/WOW-master/dist/wow.min.js')
                await loadScript('/vendor/owl-carousel/owl.carousel.min.js')
                await loadScript('/vendor/fancybox/dist/jquery.fancybox.min.js')
                await loadScript('/vendor/tilt.jquery.js')
                await loadScript('/js/theme.js')
            } catch (e) {
                console.error('Error loading scripts:', e)
            }
        }

        initScripts()
    }, [pathname])

    return null
}
