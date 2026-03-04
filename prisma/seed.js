const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@sainskerta.id' },
        update: {},
        create: {
            email: 'admin@sainskerta.id',
            name: 'Admin SSN',
            password: adminPassword,
            role: 'ADMIN',
        },
    })
    console.log('✅ Admin user created:', admin.email)

    // Create default categories
    const categories = ['Teknologi', 'Bisnis', 'Tutorial', 'Berita', 'Tips & Trik']
    for (const name of categories) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        await prisma.category.upsert({
            where: { slug },
            update: {},
            create: { name, slug },
        })
    }
    console.log('✅ Default categories created')

    // Create sample article
    await prisma.article.upsert({
        where: { slug: 'selamat-datang-di-blog-sainskerta' },
        update: {},
        create: {
            title: 'Selamat Datang di Blog Sainskerta Nusantara',
            slug: 'selamat-datang-di-blog-sainskerta',
            excerpt: 'Blog resmi Sainskerta Nusantara tempat kami berbagi informasi terbaru seputar teknologi dan bisnis digital.',
            content: `<h2>Selamat Datang!</h2>
<p>Kami dengan senang hati memperkenalkan blog resmi Sainskerta Nusantara. Di sini, kami akan berbagi artikel-artikel menarik seputar teknologi, bisnis digital, dan tips untuk mengembangkan bisnis Anda.</p>
<h3>Apa yang Akan Anda Temukan?</h3>
<ul>
<li><strong>Tutorial Teknologi</strong> - Panduan langkah demi langkah untuk berbagai teknologi terkini</li>
<li><strong>Tips Bisnis Digital</strong> - Strategi dan tips untuk mengembangkan bisnis di era digital</li>
<li><strong>Berita Terbaru</strong> - Update terbaru dari dunia teknologi dan industri IT</li>
<li><strong>Case Study</strong> - Studi kasus dari proyek-proyek yang telah kami kerjakan</li>
</ul>
<p>Tetap ikuti perkembangan kami dan jangan ragu untuk menghubungi kami jika ada pertanyaan!</p>`,
            status: 'PUBLISHED',
            authorId: admin.id,
            tags: ['welcome', 'sainskerta', 'teknologi'],
        },
    })
    console.log('✅ Sample article created')

    console.log('')
    console.log('🎉 Seed completed!')
    console.log('📧 Admin login: admin@sainskerta.id')
    console.log('🔑 Password: admin123')
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
