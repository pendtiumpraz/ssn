import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Services - Sainskerta Nusantara',
    description: 'Layanan Sainskerta Nusantara - Web Development, Mobile Development, Data Analytics, dan lainnya.',
}

const services = [
    { title: 'Web Development', img: '/images/menu-img/web.jpg', color: '#2b78ff', desc: 'Pengembangan web untuk kebutuhan proses bisnis yang general maupun spesifik. Seperti marketplace, landing page, company profile, e-office, social network services, blog, dan lain sebagainya.' },
    { title: 'UX & Interface Design', img: '/images/menu-img/ux-design.jpg', color: '#ff5176', desc: 'Desain dan pengalaman pengguna merupakan kesan awal yang sangat penting dalam membangun bisnis. Bersama Sainskerta Nusantara, kami memberikan dukungan serta garansi desain dan pengalaman pengguna untuk pelayanan yang terbaik.' },
    { title: 'Mobile Development', img: '/images/menu-img/mobile.jpg', color: '#03e7f6', desc: 'Pengembangan aplikasi untuk smartphone baik android maupun iOS. Tidak semua organisasi memiliki platform sendiri, aplikasi mobile terbukti mampu meningkatkan kepercayaan pelanggan.' },
    { title: 'Corporate Information System', img: '/images/menu-img/information.jpg', color: '#ffaf2d', desc: 'Pengembangan sistem informasi untuk perusahaan. Mulai dari Sistem Informasi, Sistem Informasi Manajemen, Sistem Informasi Eksekutif, Business Intelligent, dan lain sebagainya.' },
    { title: 'Research & Market Analysis', img: '/images/menu-img/market.jpg', color: '#28a745', desc: 'Perkembangan bisnis yang dinamis menjadikan kebutuhan pasar juga terus berkembang. Untuk itu, setiap decision maker perlu mendalami strategi marketing yang paling tepat untuk kondisi dan dinamika market yang dituju.' },
    { title: 'Startup MVP & Prototype', img: '/images/menu-img/mvp.jpg', color: '#17a2b8', desc: 'Kondisi startup yang masih mencari model bisnis yang tepat sangat perlu untuk memvalidasi ide bisnisnya. Minimum Viable Product dan Prototyping adalah salah satu metode yang tepat untuk memvalidasi ide dalam waktu yang lebih efektif dan efisien.' },
    { title: 'Campaign Digital Strategist', img: '/images/menu-img/digital.jpg', color: '#6f42c1', desc: 'Produk atau layanan yang bagus adalah yang berada pada market yang tepat dan memiliki engagement yang kuat. Maka perlu ada strategi untuk membangun brand activation sekaligus brand awareness yang sesuai dengan market yang dituju.' },
    { title: 'Data Analytic', img: '/images/menu-img/information.jpg', color: '#6610f2', desc: 'Data sudah menjadi aset yang begitu berharga bagi perkembangan bisnis. Namun harus melalui tahap pemrosesan terlebih dahulu agar mendapatkan insight yang reliable dan valid. Data Mining, Artificial Intelligent, Machine Learning serta Data Science adalah beberapa pendekatan yang seringkali digunakan untuk meningkatkan daya guna data.' },
    { title: 'Video Production', img: '/images/menu-img/information.jpg', color: '#1aceff', desc: 'Video production untuk Company Profile, TV Commercial, Marketing Tools, Konten Social Media seperti Youtube, Instagram, Facebook dan lain sebagainya.' },
    { title: 'Social Media Campaign', img: '/images/menu-img/information.jpg', color: '#ff6262', desc: 'Menemukan strategi yang tepat untuk berkampanye di social media. Sehingga mendapatkan jangkauan dan exposure yang lebih luas.' },
]

const testimonials = [
    { text: 'Senang bekerja sama dengan Tim Sainskerta Nusantara. Profil Banana Provider menjadi semakin menarik ditampilkan melalui video yang dibuatkan oleh Tim Sainskerta Nusantara.', name: 'Nyuhani Prasasti', role: 'CEO, Banana Provider' },
    { text: 'Aplikasi yang dibuatkan oleh Tim Sainskerta Nusantara sangat menguntungkan perusahaan kami. Kepercayaan pelanggan perusahaan kami semakin meningkat dengan adanya aplikasi mobile yang telah dibuatkan oleh Tim Sainskerta.', name: 'Diko', role: 'Asisten Vice President, CEI' },
    { text: 'Terima kasih Sainskerta Nusantara sudah membantu kami menganalisa data, sehingga kami bisa memetakan konten Youtube yang lebih tepat dan bermanfaat untuk target market Dunia Akademisi.', name: 'Muhammad Khoiron', role: 'Founder, Dunia Akademisi' },
    { text: 'Sangat puas dengan pelayanan yang diberikan Tim Sainskerta. Setiap konsultasi selalu disambut dengan ramah. Benar-benar memberikan kebahagiaan.', name: 'Andi Indra Saputra Alamsyah', role: 'Founder, Rumah Kardus Indonesia' },
]

export default function ServicePage() {
    return (
        <>
            {/* Text Inner Banner */}
            <div className="text-inner-banner-one pos-r">
                <div className="shape-wrapper">
                    <svg className="img-shape shape-one">
                        <path fillRule="evenodd" fill="rgb(255, 223, 204)" d="M6.000,12.000 C9.314,12.000 12.000,9.314 12.000,6.000 C12.000,2.686 9.314,-0.000 6.000,-0.000 C2.686,-0.000 -0.000,2.686 -0.000,6.000 C-0.000,9.314 2.686,12.000 6.000,12.000 Z" />
                    </svg>
                    <svg className="img-shape shape-two">
                        <path fillRule="evenodd" fill="rgb(182, 255, 234)" d="M6.000,12.000 C9.314,12.000 12.000,9.314 12.000,6.000 C12.000,2.686 9.314,-0.000 6.000,-0.000 C2.686,-0.000 -0.000,2.686 -0.000,6.000 C-0.000,9.314 2.686,12.000 6.000,12.000 Z" />
                    </svg>
                    <svg className="img-shape shape-three">
                        <path fillRule="evenodd" fill="rgb(181, 198, 255)" d="M12.000,24.000 C18.627,24.000 24.000,18.627 24.000,12.000 C24.000,5.372 18.627,-0.000 12.000,-0.000 C5.372,-0.000 -0.000,5.372 -0.000,12.000 C-0.000,18.627 5.372,24.000 12.000,24.000 Z" />
                    </svg>
                    <svg className="img-shape shape-four">
                        <path fillRule="evenodd" fill="rgb(255, 156, 161)" d="M7.500,15.000 C11.642,15.000 15.000,11.642 15.000,7.500 C15.000,3.358 11.642,-0.000 7.500,-0.000 C3.358,-0.000 -0.000,3.358 -0.000,7.500 C-0.000,11.642 3.358,15.000 7.500,15.000 Z" />
                    </svg>
                    <svg className="img-shape shape-five">
                        <path fillRule="evenodd" fill="rgb(178, 236, 255)" d="M12.500,25.000 C19.403,25.000 25.000,19.403 25.000,12.500 C25.000,5.596 19.403,-0.000 12.500,-0.000 C5.596,-0.000 -0.000,5.596 -0.000,12.500 C-0.000,19.403 5.596,25.000 12.500,25.000 Z" />
                    </svg>
                </div>
                <div className="container">
                    <p>Services</p>
                    <h2 className="pt-30 pb-15">Provided Services</h2>
                    <p className="sub-heading">Kami memberikan layanan dengan sepenuh hati, diinisiasi oleh anak-anak muda kreatif yang telah berpengalaman menyelesaikan berbagai proyek dan terus berkreasi untuk turut larut dalam menghadirkan teknologi terkini yang mengesankan.</p>
                </div>
            </div>

            {/* Intro Text */}
            <div className="intro-text-block--green pos-r">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-lg-last">
                            <h5>Kami memberikan banyak layanan digital <span>dari para ahli dengan dukungan terbaik</span></h5>
                            <p>Sainskerta Nusantara menerapkan pendekatan seefektif dan seefisien mungkin. Kami bergerak cepat untuk terus memberikan karya-karya terbaik sebagai solusi dari beragam masalah Anda di dunia teknologi informasi.</p>
                            <h6>Sainskerta Nusantara</h6>
                        </div>
                        <div className="col-lg-6 order-lg-first">
                            <div className="icon md-mt-40">
                                <img src="/images/menu-img/esteh-service.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Service */}
            <div className="our-service pt-200 md-pt-150">
                <div className="container">
                    <div className="row">
                        {services.map((service, index) => (
                            <div className="col-md-6" key={index}>
                                <div className="service-classic-block mb-90 md-mb-60">
                                    <div className="img-holder"><img src={service.img} alt={service.title} /></div>
                                    <div className="text-holder">
                                        <div className="icon-holder" style={{ background: service.color }}><img src="/images/icon/icon18.svg" alt="" /></div>
                                        <h3><a href="#">{service.title}</a></h3>
                                        <p>{service.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Banner */}
            <div className="action-banner-one mt-100">
                <div className="theme-title-one">
                    <h2 className="main-title">Do you have any projects?<br /><i>Contact us.</i></h2>
                </div>
                <Link href="/contact" className="theme-btn line-button-one">Contact us</Link>
            </div>

            {/* Testimonial */}
            <div className="testimonial-section-classic style-one pos-r md-pt-40 md-pb-200">
                <img src="/images/shape/33.svg" alt="" className="main-bg" />
                <div className="shape-wrapper">
                    <img src="/images/shape/34.svg" alt="" className="shape-one img-shape" />
                </div>
                <div className="shape-wrapper">
                    <img src="/images/testimo/asian-1-min.jpeg" alt="" className="people" />
                    <img src="/images/testimo/asian-2-min.jpeg" alt="" className="people" />
                    <img src="/images/testimo/asian-3-min.jpeg" alt="" className="people" />
                    <img src="/images/testimo/asian-4-min.jpeg" alt="" className="people" />
                    <img src="/images/testimo/asian-1-min.jpeg" alt="" className="people" />
                    <img src="/images/testimo/asian-2-min.jpeg" alt="" className="people" />
                </div>
                <div className="container">
                    <div className="theme-title-one text-center">
                        <div className="icon-box hide-pr">
                            <img src="/images/icon/icon7.svg" alt="" className="icon" />
                        </div>
                        <h2 className="main-title underline"><span>Kata Mereka</span><br /> <span>Mengenai Kami.</span></h2>
                    </div>

                    <div className="inner-container">
                        <div className="main-content">
                            <div className="classic-testimonial-slider">
                                {testimonials.map((item, index) => (
                                    <div className="item" key={index}>
                                        <p>{item.text}</p>
                                        <h6 className="name">{item.name}</h6>
                                        <span className="designation">{item.role}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
