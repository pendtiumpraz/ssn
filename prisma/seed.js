const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Admin User
    const hashedPassword = await bcrypt.hash('admin123', 12)
    await prisma.user.upsert({
        where: { email: 'admin@sainskerta.id' },
        update: {},
        create: { email: 'admin@sainskerta.id', name: 'Admin SSN', password: hashedPassword, role: 'ADMIN' },
    })
    console.log('✅ Admin user created')

    // Categories
    const cats = [
        { name: 'Teknologi', slug: 'teknologi' },
        { name: 'Bisnis', slug: 'bisnis' },
        { name: 'Tutorial', slug: 'tutorial' },
        { name: 'Berita', slug: 'berita' },
        { name: 'Tips & Trik', slug: 'tips-trik' },
    ]
    for (const c of cats) {
        await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c })
    }
    console.log('✅ Categories created')

    // Team Members
    const teamMembers = [
        { name: 'M. Rizal Karunia Haris', role: 'Chief Executive Officer', image: '/images/team/rizal.png', linkedin: '#', order: 1 },
        { name: 'Achmad Faik Faruqi', role: 'Chief Technology Officer', image: '/images/team/faik.jpeg', linkedin: '#', order: 2 },
        { name: 'Ifa Alif', role: 'Chief Information Officer', image: '/images/team/alif.jpg', linkedin: '#', order: 3 },
        { name: 'Galih Prasetyo', role: 'Chief AI Engineer', image: '/images/team/galih2.jpg', linkedin: 'https://linkedin.com/in/pendtiumpraz', order: 4 },
        { name: "Hilwin Nisa'", role: 'Chief Operating Officer', image: '/images/team/hilwin.jpg', linkedin: '#', order: 5 },
        { name: 'Mery Yulikuntari', role: 'Data Analyst', image: '/images/team/mery.jpg', linkedin: '#', order: 6 },
        { name: 'Nyuhani Prasasti', role: 'Human Resource & Development', image: '/images/team/hani.jpg', linkedin: '#', order: 7 },
        { name: 'Irvan Ariyanto', role: 'Data Scientist', image: '/images/team/irvan.jpeg', linkedin: '#', order: 8 },
        { name: 'Dany Asyari', role: 'UI/UX Designer', image: '/images/team/dani.jpeg', linkedin: '#', order: 9 },
        { name: 'Alfan Ghinan Rusydi', role: 'Full Stack Developer', image: '/images/team/alfan.jpg', linkedin: '#', order: 10 },
        { name: 'M. Dhofir Alibi', role: 'Senior Android Programmer', image: '/images/team/alibi.jpeg', linkedin: '#', order: 11 },
        { name: 'Ahmad Dzul Fikri', role: 'Senior Backend Engineer', image: '/images/team/fikri.JPG', linkedin: '#', order: 12 },
        { name: 'Abdan Syakuro', role: 'Senior Web Programmer', image: '/images/team/abdan.jpeg', linkedin: '#', order: 13 },
        { name: 'Alif Nur I', role: 'Senior Full Stack Programmer', image: '/images/team/alif-nur.jpeg', linkedin: '#', order: 14 },
        { name: 'Naufaldi Rafif S', role: 'Senior Frontend Programmer', image: '/images/team/naufal.JPG', linkedin: '#', order: 15 },
        { name: 'Eldo Alvianto', role: 'Videographer & Editing', image: '/images/team/eldo.jpg', linkedin: '#', order: 16 },
        { name: 'Vetuwa', role: 'Videographer & Editing', image: '/images/team/vetuwa.jpg', linkedin: '#', order: 17 },
    ]
    // Clear existing and re-seed
    await prisma.teamMember.deleteMany()
    for (const m of teamMembers) {
        await prisma.teamMember.create({ data: m })
    }
    console.log('✅ Team members created (' + teamMembers.length + ')')

    // Portfolio Items
    const portfolioItems = [
        { title: 'Mobile App Relawan', image: '/images/portofolio/hiasan1-min.png', category: 'Mobile', order: 1 },
        { title: 'Web Platform', image: '/images/portofolio/hiasan2-min.png', category: 'Web', order: 2 },
        { title: 'Digital Campaign', image: '/images/portofolio/hiasan3-min.png', category: 'Marketing', order: 3 },
        { title: 'E-Commerce Platform', image: '/images/portofolio/hiasan4-min.png', category: 'Web', order: 4 },
        { title: 'Mobile App Design', image: '/images/portofolio/hiasan5-min.png', category: 'Mobile', order: 5 },
        { title: 'Corporate System', image: '/images/portofolio/hiasan6-min.png', category: 'Web', order: 6 },
        { title: 'Data Dashboard', image: '/images/portofolio/hiasan7-min.png', category: 'Data', order: 7 },
        { title: 'UI/UX Design', image: '/images/portofolio/hiasan8-min.png', category: 'Design', order: 8 },
        { title: 'Video Production', image: '/images/portofolio/hiasan9-min.png', category: 'Video', order: 9 },
        { title: 'Social Media Campaign', image: '/images/portofolio/hiasan10-min.png', category: 'Marketing', order: 10 },
    ]
    await prisma.portfolioItem.deleteMany()
    for (const p of portfolioItems) {
        await prisma.portfolioItem.create({ data: p })
    }
    console.log('✅ Portfolio items created (' + portfolioItems.length + ')')

    // Services
    const services = [
        { title: 'Web Development', description: 'Pengembangan web untuk kebutuhan proses bisnis yang general maupun spesifik. Seperti marketplace, landing page, company profile, e-office, social network services, blog, dan lain sebagainya.', image: '/images/menu-img/web.jpg', color: '#2b78ff', order: 1 },
        { title: 'UX & Interface Design', description: 'Desain dan pengalaman pengguna merupakan kesan awal yang sangat penting dalam membangun bisnis. Bersama Sainskerta Nusantara, kami memberikan dukungan serta garansi desain dan pengalaman pengguna untuk pelayanan yang terbaik.', image: '/images/menu-img/ux-design.jpg', color: '#ff5176', order: 2 },
        { title: 'Mobile Development', description: 'Pengembangan aplikasi untuk smartphone baik android maupun iOS. Tidak semua organisasi memiliki platform sendiri, aplikasi mobile terbukti mampu meningkatkan kepercayaan pelanggan.', image: '/images/menu-img/mobile.jpg', color: '#03e7f6', order: 3 },
        { title: 'Corporate Information System', description: 'Pengembangan sistem informasi untuk perusahaan. Mulai dari Sistem Informasi, Sistem Informasi Manajemen, Sistem Informasi Eksekutif, Business Intelligent, dan lain sebagainya.', image: '/images/menu-img/information.jpg', color: '#ffaf2d', order: 4 },
        { title: 'Research & Market Analysis', description: 'Perkembangan bisnis yang dinamis menjadikan kebutuhan pasar juga terus berkembang. Untuk itu, setiap decision maker perlu mendalami strategi marketing yang paling tepat untuk kondisi dan dinamika market yang dituju.', image: '/images/menu-img/market.jpg', color: '#28a745', order: 5 },
        { title: 'Startup MVP & Prototype', description: 'Kondisi startup yang masih mencari model bisnis yang tepat sangat perlu untuk memvalidasi ide bisnisnya. Minimum Viable Product dan Prototyping adalah salah satu metode yang tepat untuk memvalidasi ide dalam waktu yang lebih efektif dan efisien.', image: '/images/menu-img/mvp.jpg', color: '#17a2b8', order: 6 },
        { title: 'Campaign Digital Strategist', description: 'Produk atau layanan yang bagus adalah yang berada pada market yang tepat dan memiliki engagement yang kuat. Maka perlu ada strategi untuk membangun brand activation sekaligus brand awareness yang sesuai dengan market yang dituju.', image: '/images/menu-img/digital.jpg', color: '#6f42c1', order: 7 },
        { title: 'Data Analytic', description: 'Data sudah menjadi aset yang begitu berharga bagi perkembangan bisnis. Namun harus melalui tahap pemrosesan terlebih dahulu agar mendapatkan insight yang reliable dan valid. Data Mining, Artificial Intelligent, Machine Learning serta Data Science adalah beberapa pendekatan yang seringkali digunakan untuk meningkatkan daya guna data.', image: '/images/menu-img/information.jpg', color: '#6610f2', order: 8 },
        { title: 'Video Production', description: 'Video production untuk Company Profile, TV Commercial, Marketing Tools, Konten Social Media seperti Youtube, Instagram, Facebook dan lain sebagainya.', image: '/images/menu-img/information.jpg', color: '#1aceff', order: 9 },
        { title: 'Social Media Campaign', description: 'Menemukan strategi yang tepat untuk berkampanye di social media. Sehingga mendapatkan jangkauan dan exposure yang lebih luas.', image: '/images/menu-img/information.jpg', color: '#ff6262', order: 10 },
    ]
    await prisma.service.deleteMany()
    for (const s of services) {
        await prisma.service.create({ data: s })
    }
    console.log('✅ Services created (' + services.length + ')')

    // Testimonials
    const testimonials = [
        { text: 'Senang bekerja sama dengan Tim Sainskerta Nusantara. Profil Banana Provider menjadi semakin menarik ditampilkan melalui video yang dibuatkan oleh Tim Sainskerta Nusantara.', name: 'Nyuhani Prasasti', role: 'CEO, Banana Provider', order: 1 },
        { text: 'Aplikasi yang dibuatkan oleh Tim Sainskerta Nusantara sangat menguntungkan perusahaan kami. Kepercayaan pelanggan perusahaan kami semakin meningkat dengan adanya aplikasi mobile yang telah dibuatkan oleh Tim Sainskerta.', name: 'Diko', role: 'Asisten Vice President, CEI', order: 2 },
        { text: 'Terima kasih Sainskerta Nusantara sudah membantu kami menganalisa data, sehingga kami bisa memetakan konten Youtube yang lebih tepat dan bermanfaat untuk target market Dunia Akademisi.', name: 'Muhammad Khoiron', role: 'Founder, Dunia Akademisi', order: 3 },
        { text: 'Sangat puas dengan pelayanan yang diberikan Tim Sainskerta. Setiap konsultasi selalu disambut dengan ramah. Benar-benar memberikan kebahagiaan.', name: 'Andi Indra Saputra Alamsyah', role: 'Founder, Rumah Kardus Indonesia', order: 4 },
    ]
    await prisma.testimonial.deleteMany()
    for (const t of testimonials) {
        await prisma.testimonial.create({ data: t })
    }
    console.log('✅ Testimonials created (' + testimonials.length + ')')

    // Page Content - About
    await prisma.pageContent.upsert({
        where: { pageSlug: 'about' },
        update: {},
        create: {
            pageSlug: 'about',
            title: 'About - Sainskerta Nusantara',
            sections: {
                bannerSubtitle: 'About us',
                bannerTitle: 'Company Story',
                bannerImage: '/images/about/sainskerta-together.jpeg',
                features: [
                    { icon: '/images/icon/icon11.svg', title: 'Berpengalaman', text: 'Inisiasi oleh anak-anak muda kreatif yang kini menjelma menjadi para profesional yang multi talenta dan berpengalaman sejak 2013.' },
                    { icon: '/images/icon/icon12.svg', title: 'Bersahabat', text: 'Berkonsultasi kapan saja dan gratis. Kami juga bisa diundang untuk memberikan seminar/workshop dunia IT secara gratis.' },
                    { icon: '/images/icon/icon13.svg', title: 'Cepat', text: 'Pendekatan efektif dan efisien untuk terus memberikan karya-karya terbaik sebagai solusi dari beragam masalah Anda.' },
                ],
                aboutSubtitle: 'Tentang Kami',
                aboutTitle: 'Diinisiasi Sejak 2013',
                visionText1: 'Digital bukan lagi masa depan, digital sudah kita alami dan rasakan setiap hari. Inovasi teknologi akan terus bertransformasi dan mempermudah cara hidup manusia.',
                visionText2: 'Transformasi ini juga menjadi pemicu perubahan gaya hidup, sehingga semua elemen bisnispun harus terus bersinergi mengikuti iklim bisnis yang dinamis.',
                visionText3: 'Cara perusahaan mendekatkan diri pada market juga terus menerus berkembang.',
                visionText4: 'Perilaku konsumen yang dinamis di era digital ini harus senantiasa diadaptasi agar perusahaan mampu mencuri perhatian market dan melekat di hati masing-masing pelanggan.',
                visionText5: 'Agility dan teknologi menjadi hal yang wajib dimiliki bagi setiap perusahaan agar tetap dekat di hati konsumen. Dan kami percaya bahwa Sainskerta Nusantara adalah tim tepat yang bisa mendukung visi dan misi Anda untuk memenangkan hati masyarakat Indonesia.',
                achievementTitle: 'Over 30+ Completed work & Still counting.',
                achievementText: 'Dipercaya baik perusahaan nasional maupun internasional. Berkolaborasi bersama untuk memanfaatkan teknologi guna meningkatkan efektivitas, efisiensi dan produktivitas.',
                stats: [
                    { number: 2, label: 'Offices' },
                    { number: 7, label: 'Experiences', suffix: '+' },
                    { number: 15, label: 'Warriors', suffix: '+' },
                    { number: 50, label: 'Projects', suffix: '+' },
                ],
                partners: [
                    { img: '/images/client/bni.png' },
                    { img: '/images/client/bpjs.png' },
                    { img: '/images/client/kemnaker.png' },
                    { img: '/images/client/logo.png' },
                    { img: '/images/client/logo-brainloka.png' },
                    { img: '/images/client/logo-kemendikbud.png' },
                    { img: '/images/client/logo-cei.png' },
                    { img: '/images/client/logo-sizra.png' },
                    { img: '/images/client/logo-bssn.png' },
                ],
            },
        },
    })
    console.log('✅ About page content seeded')

    // Sample Article
    const admin = await prisma.user.findUnique({ where: { email: 'admin@sainskerta.id' } })
    const techCat = await prisma.category.findUnique({ where: { slug: 'teknologi' } })
    if (admin && techCat) {
        await prisma.article.upsert({
            where: { slug: 'selamat-datang-di-blog-sainskerta' },
            update: {},
            create: {
                title: 'Selamat Datang di Blog Sainskerta Nusantara',
                slug: 'selamat-datang-di-blog-sainskerta',
                excerpt: 'Blog resmi Sainskerta Nusantara hadir untuk berbagi informasi seputar teknologi, bisnis digital, dan tips pengembangan software.',
                content: '<h2>Apa yang Akan Anda Temukan?</h2><p>Blog ini akan menjadi wadah berbagi pengetahuan dan pengalaman kami dalam dunia teknologi informasi.</p><p>Beberapa topik yang akan kami bahas meliputi:</p><ul><li><strong>Tutorial Teknologi</strong> - Panduan langkah demi langkah</li><li><strong>Tips Bisnis Digital</strong> - Strategi untuk mengembangkan bisnis</li><li><strong>Berita Terbaru</strong> - Update teknologi terkini</li><li><strong>Case Study</strong> - Studi kasus dari proyek kami</li></ul><p>Tetap ikuti update terbaru dari kami!</p>',
                tags: ['welcome', 'sainskerta', 'teknologi'],
                status: 'PUBLISHED',
                categoryId: techCat.id,
                authorId: admin.id,
            },
        })
        console.log('✅ Sample article created')
    }

    console.log('🎉 Seeding complete!')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
