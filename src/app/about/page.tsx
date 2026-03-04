import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'About - Sainskerta Nusantara',
    description: 'Tentang Sainskerta Nusantara - Partner terbaik untuk solusi teknologi Anda sejak 2013.',
}

export default function AboutPage() {
    return (
        <>
            {/* Inner Banner */}
            <div className="inner-banner pos-r banner-bg bg-style-one" style={{ backgroundImage: 'url(/images/about/sainskerta-together.jpeg)' }}>
                <div className="opacity">
                    <div className="container">
                        <p>About us</p>
                        <h2>Company Story</h2>
                    </div>
                </div>
            </div>

            {/* Feature Block */}
            <div className="about-feature pos-r">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="feature-block-two md-mb-40 text-center">
                                <img src="/images/icon/icon11.svg" alt="" className="icon" />
                                <h5 className="pt-25 pb-35">Berpengalaman</h5>
                                <p>Inisiasi oleh anak-anak muda kreatif yang kini menjelma menjadi para profesional yang multi talenta dan berpengalaman sejak 2013.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="feature-block-two md-mb-40 text-center">
                                <img src="/images/icon/icon12.svg" alt="" className="icon" />
                                <h5 className="pt-25 pb-35">Bersahabat</h5>
                                <p>Berkonsultasi kapan saja dan gratis. Kami juga bisa diundang untuk memberikan seminar/workshop dunia IT secara gratis.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 m-auto">
                            <div className="feature-block-two md-mb-40 text-center">
                                <img src="/images/icon/icon13.svg" alt="" className="icon" />
                                <h5 className="pt-25 pb-35">Cepat</h5>
                                <p>Pendekatan efektif dan efisien untuk terus memberikan karya-karya terbaik sebagai solusi dari beragam masalah Anda.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Text Block */}
            <div className="about-us-text bg-color pt-200 pos-r pb-200 md-pt-50 md-pb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="theme-title-one">
                                <div className="upper-title mb-5">Tentang Kami</div>
                                <h2 className="main-title">Diinisiasi Sejak 2013</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 about-text-one">
                            <h4 className="pb-20 md-pt-50">Our Vision</h4>
                            <p>Digital bukan lagi masa depan, digital sudah kita alami dan rasakan setiap hari. Inovasi teknologi akan terus bertransformasi dan mempermudah cara hidup manusia.</p>
                            <p>Transformasi ini juga menjadi pemicu perubahan gaya hidup, sehingga semua elemen bisnispun harus terus bersinergi mengikuti iklim bisnis yang dinamis.</p>
                            <p>Cara perusahaan mendekatkan diri pada market juga terus menerus berkembang.</p>
                        </div>
                        <div className="col-lg-4 about-text-one">
                            <h4 className="pb-20 md-pt-50">&nbsp;</h4>
                            <p>Perilaku konsumen yang dinamis di era digital ini harus senantiasa diadaptasi agar perusahaan mampu mencuri perhatian market dan melekat di hati masing-masing pelanggan.</p>
                            <p>Agility dan teknologi menjadi hal yang wajib dimiliki bagi setiap perusahaan agar tetap dekat di hati konsumen. Dan kami percaya bahwa Sainskerta Nusantara adalah tim tepat yang bisa mendukung visi dan misi Anda untuk memenangkan hati masyarakat Indonesia.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Achievement Section */}
            <div className="achivement-section pt-300 pb-300 md-pt-130 md-pb-150 pos-r">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 order-lg-last">
                            <div className="theme-title-one">
                                <div className="upper-title mb-5">Achievement</div>
                                <h2 className="main-title underline">Over 30+ Completed work &amp; Still counting.</h2>
                            </div>
                            <p className="pt-55">Dipercaya baik perusahaan nasional maupun internasional. Berkolaborasi bersama untuk memanfaatkan teknologi guna meningkatkan efektivitas, efisiensi dan produktivitas.</p>
                        </div>
                        <div className="col-lg-7 order-lg-first">
                            <div className="theme-counter-one pos-r md-mt-100 md-mb-110 sm-mt-60 sm-mb-10">
                                <div className="shape-wrapper">
                                    <img src="/images/shape/45.svg" alt="" className="shape-one img-shape" />
                                    <img src="/images/shape/4.svg" alt="" className="shape-two img-shape" />
                                    <img src="/images/shape/23.svg" alt="" className="shape-three img-shape" />
                                    <img src="/images/shape/9.svg" alt="" className="shape-four img-shape" />
                                    <img src="/images/shape/17.svg" alt="" className="shape-five img-shape" />
                                    <img src="/images/shape/24.svg" alt="" className="shape-six img-shape" />
                                    <img src="/images/shape/25.svg" alt="" className="shape-seven img-shape" />
                                </div>
                                <div className="inner-round-shape pos-r">
                                    <div className="counter-box-one pos-a">
                                        <h2 className="number color-one"><span className="timer" data-from="0" data-to="2" data-speed="1200" data-refresh-interval="5">2</span></h2>
                                        <p>Offices</p>
                                    </div>
                                    <div className="counter-box-one pos-a">
                                        <h2 className="number color-two"><span className="timer" data-from="0" data-to="7" data-speed="1200" data-refresh-interval="5">7</span>+</h2>
                                        <p>Experiences</p>
                                    </div>
                                    <div className="counter-box-one pos-a">
                                        <h2 className="number color-three"><span className="timer" data-from="0" data-to="15" data-speed="1200" data-refresh-interval="5">15</span>+</h2>
                                        <p>Warriors</p>
                                    </div>
                                    <div className="counter-box-one pos-a">
                                        <h2 className="number color-four"><span className="timer" data-from="0" data-to="50" data-speed="1200" data-refresh-interval="5">50</span>+</h2>
                                        <p>Projects</p>
                                    </div>
                                    <div className="center-shape pos-a"><img src="/images/shape/44.svg" alt="" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Partner Section */}
            <div className="op-partner-section-one pt-80 pb-110 sm-pb-60">
                <div className="container">
                    <div className="row">
                        {[
                            { img: '/images/client/bni.png', className: 'bx-a', colClass: 'col-lg-3 col-md-4 col-6', style: { width: '70%' } },
                            { img: '/images/client/bpjs.png', className: 'bx-b', colClass: 'col-lg-2 col-md-4 col-6', style: { width: '80%' } },
                            { img: '/images/client/kemnaker.png', className: 'bx-c', colClass: 'col-lg-3 col-md-4 col-6', style: { width: '70%' } },
                            { img: '/images/client/logo.png', className: 'bx-d', colClass: 'col-xl-2 col-lg-3 col-md-4 col-6' },
                            { img: '/images/client/logo-brainloka.png', className: 'bx-e', colClass: 'col-xl-2 col-lg-3 col-md-4 col-6', imgClass: 'p-3' },
                            { img: '/images/client/logo-kemendikbud.png', className: 'bx-f', colClass: 'col-xl-4 col-lg-2 col-md-4 col-6', imgClass: 'p-1' },
                            { img: '/images/client/logo-cei.png', className: 'bx-g', colClass: 'col-xl-2 col-lg-3 col-md-4 col-6' },
                            { img: '/images/client/logo-sizra.png', className: 'bx-h', colClass: 'col-xl-3 col-lg-3 col-md-4 col-6', imgClass: 'p-4' },
                            { img: '/images/client/logo-bssn.png', className: 'bx-i', colClass: 'col-xl-3 col-lg-11 col-md-4 col-6', imgClass: 'p-1' },
                        ].map((client, index) => (
                            <div className={client.colClass} key={index}>
                                <div className={`img-box ${client.className}`}>
                                    <a href="#">
                                        <img src={client.img} className={client.imgClass || ''} style={client.style || {}} alt="" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
