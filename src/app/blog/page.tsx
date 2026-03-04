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

export default async function BlogPage() {
    let dbArticles: any[] = []
    let categories: any[] = []
    try {
        [dbArticles, categories] = await Promise.all([
            prisma.article.findMany({
                where: { status: 'PUBLISHED' },
                select: {
                    id: true, title: true, slug: true, excerpt: true,
                    coverImage: true, createdAt: true,
                    category: { select: { name: true, slug: true } },
                    author: { select: { name: true } },
                },
                orderBy: { createdAt: 'desc' },
                take: 50,
            }),
            prisma.category.findMany({
                where: { articles: { some: { status: 'PUBLISHED' } } },
                orderBy: { name: 'asc' },
            }),
        ])
    } catch {
        // DB might not be available
    }

    return (
        <>
            {/* Inner Banner - Dark with background image */}
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
                    <div className="masnory-blog-wrapper">
                        <div className="grid-sizer"></div>
                        {dbArticles.length > 0 ? (
                            dbArticles.map((article, index) => (
                                <div className={`isotop-item ${article.category?.slug || ''}`} key={article.id}>
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
                            /* Static fallback posts */
                            blogImages.slice(0, 6).map((img, index) => (
                                <div className="isotop-item" key={index}>
                                    <div className="blog-post-block-two mb-75 md-mb-50">
                                        <div className="img-holder"><img src={img} alt="" /></div>
                                        <div className="post">
                                            <ul className="post-info">
                                                <li><a href="#">Technology .</a></li>
                                                <li><a href="#">23 July, 2020</a></li>
                                            </ul>
                                            <h4><a href="#">Challenge yourself & win the future.</a></h4>
                                            <p>This response is important for our ability to learn from mistakes words…</p>
                                            <a href="#" className="read-more inline-button-one">Continue Reading</a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
