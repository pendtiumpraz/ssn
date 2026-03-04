'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { FormEvent } from 'react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('Email atau password salah')
            } else {
                router.push('/admin')
                router.refresh()
            }
        } catch {
            setError('Terjadi kesalahan. Silakan coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Banner */}
            <div className="text-inner-banner-one pos-r">
                <div className="shape-wrapper">
                    <svg className="img-shape shape-one"><path fillRule="evenodd" fill="rgb(255, 223, 204)" d="M6.000,12.000 C9.314,12.000 12.000,9.314 12.000,6.000 C12.000,2.686 9.314,-0.000 6.000,-0.000 C2.686,-0.000 -0.000,2.686 -0.000,6.000 C-0.000,9.314 2.686,12.000 6.000,12.000 Z" /></svg>
                    <svg className="img-shape shape-two"><path fillRule="evenodd" fill="rgb(182, 255, 234)" d="M6.000,12.000 C9.314,12.000 12.000,9.314 12.000,6.000 C12.000,2.686 9.314,-0.000 6.000,-0.000 C2.686,-0.000 -0.000,2.686 -0.000,6.000 C-0.000,9.314 2.686,12.000 6.000,12.000 Z" /></svg>
                    <svg className="img-shape shape-three"><path fillRule="evenodd" fill="rgb(181, 198, 255)" d="M12.000,24.000 C18.627,24.000 24.000,18.627 24.000,12.000 C24.000,5.372 18.627,-0.000 12.000,-0.000 C5.372,-0.000 -0.000,5.372 -0.000,12.000 C-0.000,18.627 5.372,24.000 12.000,24.000 Z" /></svg>
                    <svg className="img-shape shape-four"><path fillRule="evenodd" fill="rgb(255, 156, 161)" d="M7.500,15.000 C11.642,15.000 15.000,11.642 15.000,7.500 C15.000,3.358 11.642,-0.000 7.500,-0.000 C3.358,-0.000 -0.000,3.358 -0.000,7.500 C-0.000,11.642 3.358,15.000 7.500,15.000 Z" /></svg>
                    <svg className="img-shape shape-five"><path fillRule="evenodd" fill="rgb(178, 236, 255)" d="M12.500,25.000 C19.403,25.000 25.000,19.403 25.000,12.500 C25.000,5.596 19.403,-0.000 12.500,-0.000 C5.596,-0.000 -0.000,5.596 -0.000,12.500 C-0.000,19.403 5.596,25.000 12.500,25.000 Z" /></svg>
                </div>
                <div className="container">
                    <p>Welcome Back</p>
                    <h2 className="pt-30 pb-15">Login</h2>
                    <p className="sub-heading">Masuk ke akun Anda untuk mengakses dashboard admin.</p>
                </div>
            </div>

            {/* Login Form */}
            <div className="contact-us-section pt-80 pb-150">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="contact-form">
                                {error && (
                                    <div className="alert alert-danger" role="alert" style={{ borderRadius: '5px', marginBottom: '20px' }}>
                                        {error}
                                    </div>
                                )}
                                <form className="form theme-form-style-one" onSubmit={handleSubmit}>
                                    <div className="controls">
                                        <div className="form-group">
                                            <input
                                                id="login_email"
                                                type="email"
                                                name="email"
                                                placeholder="Email Address*"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                id="login_password"
                                                type="password"
                                                name="password"
                                                placeholder="Password*"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                disabled={loading}
                                            />
                                        </div>
                                        <button
                                            className="theme-btn solid-button-one radius3"
                                            type="submit"
                                            disabled={loading}
                                            style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
                                        >
                                            {loading ? 'Signing in...' : 'Login'}
                                        </button>
                                    </div>
                                </form>
                                <div className="text-center mt-3">
                                    <Link href="/" style={{ color: '#6a6a6a', textDecoration: 'underline' }}>
                                        ← Kembali ke Beranda
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
