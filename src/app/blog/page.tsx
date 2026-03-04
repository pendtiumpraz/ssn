import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
    title: 'Blog - Sainskerta Nusantara',
    description: 'Blog dan berita terbaru dari Sainskerta Nusantara.',
}

const blogImages = [
    '/images/blog/23.jpg', '/images/blog/24.jpg', '/images/blog/25.jpg',
    '/images/blog/26.jpg', '/images/blog/27.jpg', '/images/blog/28.jpg',
    '/images/blog/29.jpg', '/images/blog/30.jpg', '/images/blog/31.jpg',
]

const PER_PAGE = 9

interface Props {
    searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
    const params = await searchParams
    const currentPage = Math.max(1, parseInt(params.page || '1'))

    let dbArticles: any[] = []
    let categories: any[] = []
    let totalArticles = 0

    try {
        [dbArticles, categories, totalArticles] = await Promise.all([
            prisma.article.findMany({
                where: { status: 'PUBLISHED' },
                select: {
                    id: true, title: true, slug: true, excerpt: true,
                    coverImage: true, createdAt: true,
                    category: { select: { name: true, slug: true } },
                    author: { select: { name: true } },
                },
                orderBy: { createdAt: 'desc' },
                take: PER_PAGE,
                skip: (currentPage - 1) * PER_PAGE,
            }),
            prisma.category.findMany({
                where: { articles: { some: { status: 'PUBLISHED' } } },
                orderBy: { name: 'asc' },
            }),
            prisma.article.count({ where: { status: 'PUBLISHED' } }),
        ])
    } catch {
        // DB might not be available
    }

    const totalPages = Math.ceil(totalArticles / PER_PAGE)

    return (
        <>
            {/* Inner Banner */}
            <div className="inner-banner pos-r banner-bg bg-style-two" style={{ backgroundImage: 'url(/images/blog/bg.jpg)' }}>
                <div className="opacity">
                    <div className="container">
                        <p>News</p>
                        <h2>Our Blog</h2>
                    </div>
                </div>
            </div>

            {/* Blog Listing */}
            <div className="our-blog version-five pt-110 pb-150 md-pb-120">
                <div className="container">
                    {/* Category Filter */}
                    {categories.length > 0 && (
                        <ul className="isotop-menu-wrapper blog-filter-nav clearfix" style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap', padding: 0 }}>
                            <li className="is-checked"><span>All</span></li>
                            {categories.map((cat: any) => (
                                <li key={cat.id}><span>{cat.name}</span></li>
                            ))}
                        </ul>
                    )}

                    {/* Blog Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                        {dbArticles.length > 0 ? (
                            dbArticles.map((article, index) => (
                                <div key={article.id}>
                                    <div className="blog-post-block-two mb-75 md-mb-50">
                                        <div className="img-holder">
                                            <img src={article.coverImage || blogImages[index % blogImages.length]} alt={article.title} />
                                        </div>
                                        <div className="post">
                                            <ul className="post-info">
                                                <li><a href="#">{article.category?.name || 'Umum'} .</a></li>
                                                <li><a href="#">{new Date(article.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</a></li>
                                            </ul>
                                            <h4><Link href={`/blog/${article.slug}`}>{article.title}</Link></h4>
                                            <p>{article.excerpt || ''}</p>
                                            <Link href={`/blog/${article.slug}`} className="read-more inline-button-one">Continue Reading</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: '#999' }}>
                                <p style={{ fontSize: '18px' }}>Belum ada artikel yang dipublikasikan.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '60px', flexWrap: 'wrap' }}>
                            {currentPage > 1 && (
                                <Link
                                    href={`/blog?page=${currentPage - 1}`}
                                    style={{ display: 'inline-block', padding: '10px 20px', border: '2px solid #e1e1e1', color: '#333', fontSize: '16px', textDecoration: 'none', transition: 'all 0.3s' }}
                                >
                                    ← Prev
                                </Link>
                            )}

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <Link
                                    key={p}
                                    href={`/blog?page=${p}`}
                                    style={{
                                        display: 'inline-block',
                                        width: '42px',
                                        height: '42px',
                                        lineHeight: '42px',
                                        textAlign: 'center',
                                        border: '2px solid',
                                        borderColor: p === currentPage ? '#e74c3c' : '#e1e1e1',
                                        backgroundColor: p === currentPage ? '#e74c3c' : 'transparent',
                                        color: p === currentPage ? '#fff' : '#333',
                                        fontSize: '16px',
                                        fontWeight: p === currentPage ? 700 : 400,
                                        textDecoration: 'none',
                                        transition: 'all 0.3s',
                                    }}
                                >
                                    {p}
                                </Link>
                            ))}

                            {currentPage < totalPages && (
                                <Link
                                    href={`/blog?page=${currentPage + 1}`}
                                    style={{ display: 'inline-block', padding: '10px 20px', border: '2px solid #e1e1e1', color: '#333', fontSize: '16px', textDecoration: 'none', transition: 'all 0.3s' }}
                                >
                                    Next →
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Article Count */}
                    {totalArticles > 0 && (
                        <div style={{ textAlign: 'center', marginTop: '20px', color: '#999', fontSize: '14px' }}>
                            Menampilkan {(currentPage - 1) * PER_PAGE + 1}–{Math.min(currentPage * PER_PAGE, totalArticles)} dari {totalArticles} artikel
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
