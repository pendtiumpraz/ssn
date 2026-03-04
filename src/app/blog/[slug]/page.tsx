import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    try {
        const article = await prisma.article.findUnique({
            where: { slug, status: 'PUBLISHED' },
            select: { title: true, excerpt: true, coverImage: true },
        })
        if (!article) return { title: 'Artikel Tidak Ditemukan' }
        return {
            title: `${article.title} - Sainskerta Nusantara`,
            description: article.excerpt || '',
            openGraph: {
                title: article.title,
                description: article.excerpt || '',
                images: article.coverImage ? [article.coverImage] : [],
            },
        }
    } catch {
        return { title: 'Blog - Sainskerta Nusantara' }
    }
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params

    let article: any = null
    try {
        article = await prisma.article.findUnique({
            where: { slug, status: 'PUBLISHED' },
            include: {
                category: { select: { name: true, slug: true } },
                author: { select: { name: true } },
            },
        })
    } catch {
        notFound()
    }

    if (!article) {
        notFound()
    }

    const formattedDate = new Date(article.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const coverImage = article.coverImage || '/images/blog/bg2.jpg'

    return (
        <div className="our-blog blog-details blog-details-fg pb-200 md-pb-120">
            {/* Blog Hero Banner */}
            <div className="blog-hero-banner" style={{ backgroundImage: `url(${coverImage})` }}>
                <div className="blog-custom-container">
                    <a href="#" className="date">{formattedDate}</a>
                    <h2 className="blog-title">{article.title}</h2>
                </div>
            </div>

            {/* Blog Content */}
            <div className="blog-fg-data">
                <div className="post-data">
                    <div className="blog-custom-container">
                        <div className="custom-container-bg">
                            {/* Author info */}
                            {article.author?.name && (
                                <p className="pt-20" style={{ color: '#999', fontSize: '14px' }}>
                                    Oleh <strong style={{ color: '#333' }}>{article.author.name}</strong>
                                    {article.category && (
                                        <> di <strong style={{ color: '#333' }}>{article.category.name}</strong></>
                                    )}
                                </p>
                            )}

                            {/* Article Content */}
                            <div className="pt-50" dangerouslySetInnerHTML={{ __html: article.content }} />
                        </div>
                    </div>

                    {/* Tags & Share Section */}
                    <div className="blog-custom-container">
                        <div className="custom-container-bg">
                            <div className="post-tag-area d-md-flex justify-content-between align-items-center pt-50">
                                {article.tags && article.tags.length > 0 && (
                                    <ul className="tags">
                                        <li>Tag:</li>
                                        {article.tags.map((tag: string, i: number) => (
                                            <li key={tag}>
                                                <a href="#">{tag}{i < article.tags.length - 1 ? ',' : ''}</a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <ul className="share-icon">
                                    <li>Share:</li>
                                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Blog */}
                <div className="blog-custom-container">
                    <div className="custom-container-bg">
                        <div className="pt-50 pb-50" style={{ textAlign: 'center' }}>
                            <Link href="/blog" className="theme-btn line-button-one">
                                ← Kembali ke Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
