import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sainskerta Nusantara - Innovating Technology to Deliver Happiness',
  description: 'Sainskerta Nusantara, Innovating Technology to Deliver Happiness. Kami menghadirkan solusi teknologi yang komprehensif untuk mengembangkan bisnis Anda.',
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="rogan-hero-section rogan-hero-one pt-200 pb-350 md-pt-200 md-pb-130 pos-r">
        <div className="shape-wrapper">
          <img src="/images/shape/1.svg" alt="" className="shape-one wow fadeInRight animated" data-wow-duration="2s" />
          <div className="main-illustration">
            <img src="/images/home/ssn-solution.svg" alt="" className="wow zoomIn animated rogan-hero__img" />
          </div>
          <img src="/images/shape/2.svg" alt="" className="line-shape-one img-shape wow fadeInRight animated" data-wow-duration="3s" />
          <img src="/images/shape/3.svg" alt="" className="line-shape-two img-shape wow fadeInLeft animated" data-wow-duration="3s" />
          <img src="/images/shape/15.svg" alt="" className="light-lamp img-shape wow fadeInDown animated" data-wow-duration="2s" data-wow-delay="1.7s" />
          <img src="/images/shape/4.svg" alt="" className="shape-two img-shape" />
          <img src="/images/shape/5.svg" alt="" className="shape-three img-shape" />
          <img src="/images/shape/6.svg" alt="" className="shape-four img-shape" />
          <img src="/images/shape/7.svg" alt="" className="shape-five img-shape" />
          <img src="/images/shape/8.svg" alt="" className="shape-six img-shape" />
          <img src="/images/shape/9.svg" alt="" className="shape-seven img-shape" />
          <img src="/images/shape/10.svg" alt="" className="shape-eight img-shape" />
          <img src="/images/shape/11.svg" alt="" className="shape-nine img-shape" />
          <img src="/images/shape/12.svg" alt="" className="shape-ten img-shape" />
          <img src="/images/shape/13.svg" alt="" className="shape-eleven img-shape" />
          <img src="/images/shape/14.svg" alt="" className="shape-twelve img-shape" />
        </div>
        <div className="container">
          <div className="main-wrapper pos-r">
            <div className="banner-upper-heading wow fadeInDown animated">Sainskerta <span>Nusantara</span></div>
            <h1 className="banner-main-title underline pt-15 pb-45 md-pt-10 md-pb-30 wow fadeInUp animated" data-wow-delay="0.4s">
              <span>Innovating Technology</span> <br /> <span> to Deliver Happiness</span>
            </h1>
            <p className="banner-sub-title pb-45 md-pb-30 wow fadeInUp animated" data-wow-delay="0.9s">
              Kami menghadirkan solusi teknologi yang komprehensif<br />untuk mengembangkan bisnis Anda.
            </p>
            <a href="#" className="theme-btn solid-button-one wow fadeInLeft animated scroll-more" data-wow-delay="1.5s">Lebih Lengkap</a>
            <Link href="/contact" className="theme-btn line-button-one wow fadeInRight animated" data-wow-delay="1.5s">Hubungi Kami</Link>
          </div>
        </div>
      </div>

      {/* Core Feature */}
      <div className="our-core-feature pb-30 md-pt-80 pos-r" id="#corefeature">
        <div className="shape-wrapper"></div>
        <div className="container">
          <div className="theme-title-one text-center pb-100 md-pb-50">
            <div className="upper-title mb-5">Features</div>
            <h2 className="main-title">Sainskerta Nusantara <br /><i>Solusi Bisnis Anda.</i></h2>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="feature-block-four text-center mt-40">
                <div className="icon-box" style={{ background: '#fef8e2' }}><img src="/images/icon/icon30.svg" alt="" /></div>
                <p className="pt-30 pb-10">Berpengalaman</p>
                <h5><Link href="/service">Berpengalaman Sejak 2013!</Link></h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature-block-four text-center mt-40">
                <div className="icon-box" style={{ background: '#defcee' }}><img src="/images/icon/icon31.svg" alt="" /></div>
                <p className="pt-30 pb-10">Bersahabat</p>
                <h5><Link href="/service">Konsultasi mudah &amp; Siap Membantu!</Link></h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature-block-four text-center mt-40">
                <div className="icon-box" style={{ background: '#f4e7fb' }}><img src="/images/icon/icon32.svg" alt="" /></div>
                <p className="pt-30 pb-10">Cepat</p>
                <h5><Link href="/service">Katakan &amp; Kami Wujudkan!</Link></h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us */}
      <div className="about-us-block-one pt-350 pb-30 md-pt-130 pos-r">
        <div className="shape-wrapper">
          <img src="/images/shape/21.svg" alt="" className="shape-one img-shape" />
          <img src="/images/shape/23.svg" alt="" className="shape-two img-shape" />
          <img src="/images/shape/24.svg" alt="" className="shape-three img-shape" />
          <img src="/images/shape/17.svg" alt="" className="shape-four img-shape" />
          <img src="/images/shape/9.svg" alt="" className="shape-five img-shape" />
          <img src="/images/shape/25.svg" alt="" className="shape-six img-shape" />
        </div>
        <div className="inner-wrapper pos-r">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="theme-title-one">
                  <div className="upper-title mb-5">Tentang Kami</div>
                  <h2 className="main-title underline"><span>Partner Terbaik</span> <span>untuk Kamu!</span></h2>
                </div>
                <p className="pt-40 pb-45">Sainskerta Nusantara berkomitmen membantu mewujudkan ide-ide brilian mengenai rencana bisnis yang ingin Anda implementasikan. Kami selalu berupaya menghadirkan solusi yang paling tepat. Ceritakan pada kami, dan biarkan kami yang membangun untuk Anda.</p>
                <Link href="/about" className="theme-btn solid-button-one" data-aos="fade-up">Lebih Lengkap<i className="fa fa-angle-right" aria-hidden="true"></i></Link>
              </div>
            </div>
          </div>
          <div className="path-shape-holder">
            <img src="/images/shape/16.svg" alt="" data-aos="fade-left" />
            <div className="image-box" data-aos="fade-left" data-aos-delay="300">
              <svg width="666" height="578">
                <g clipPath="url(#path-shape-one)">
                  <image width="666" height="578" href="/images/home/esteh-about.svg" className="image-shape" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Our Service */}
      <div className="our-service-one pt-350 pos-r mb-250 md-mb-150 md-pt-140">
        <div className="shape-wrapper">
          <img src="/images/shape/26.svg" alt="" className="shape-one img-shape" />
          <img src="/images/shape/28.svg" alt="" className="shape-two img-shape" />
          <img src="/images/shape/13.svg" alt="" className="shape-three img-shape" />
          <img src="/images/shape/29.svg" alt="" className="shape-four img-shape" />
          <img src="/images/shape/9.svg" alt="" className="shape-five img-shape" />
          <img src="/images/shape/30.svg" alt="" className="shape-six img-shape" />
          <img src="/images/shape/27.svg" alt="" className="shape-seven img-shape" />
          <img src="/images/shape/31.svg" alt="" className="shape-eight img-shape" />
          <img src="/images/shape/32.svg" alt="" className="shape-nine img-shape" />
        </div>
        <div className="container">
          <div className="inner-wrapper pos-r">
            <div className="theme-title-one">
              <h2 className="main-title underline"><span>Let&apos;s check our</span><br /> <span>services.</span></h2>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="feature-block-one mt-300 md-mt-50 mb-45">
                  <img src="/images/icon/icon2.svg" alt="" className="img-icon" />
                  <h5 className="pt-30 pb-25 tran3s title">Web Development</h5>
                  <p className="tran3s">Pengembangan web untuk kebutuhan proses bisnis yang general maupun spesifik. Seperti marketplace, landing page, company profile, e-office, social network dst</p>
                  <Link href="/service" className="read-more tran3s"><i className="flaticon-next-1"></i></Link>
                </div>
                <div className="feature-block-one mb-45">
                  <div className="icon icon-one flaticon-web tran3s"></div>
                  <h5 className="pt-30 pb-25 tran3s title">Mobile Development</h5>
                  <p className="tran3s">Pengembangan aplikasi untuk smartphone baik android maupun iOS. Tidak semua organisasi memiliki platform sendiri, aplikasi mobile terbukti mampu meningkatkan kepercayaan pelanggan.</p>
                  <Link href="/service" className="read-more tran3s"><i className="flaticon-next-1"></i></Link>
                </div>
                <div className="feature-block-one mb-45 md-mt-40">
                  <img src="/images/icon/icon12.svg" alt="" className="img-icon" />
                  <h5 className="pt-30 pb-25 tran3s title">Data Analysis</h5>
                  <p className="tran3s">Data sudah menjadi aset yang begitu berharga bagi perkembangan bisnis. Namun data saja belum cukup, perlu ada analisis data sebagai upaya untuk meningkatkan daya guna data.</p>
                  <Link href="/service" className="read-more tran3s"><i className="flaticon-next-1"></i></Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="feature-block-one mb-45 mt-85 md-mt-40">
                  <img src="/images/icon/icon3.svg" alt="" className="img-icon" />
                  <h5 className="pt-30 pb-25 tran3s title">Corporat Information System</h5>
                  <p className="tran3s">Pengembangan Sistem Informasi Perusahaan, mulai dari Sistem Informasi, Sistem Informasi Manajemen, Sistem Informasi Eksekutif, Bisnis Cerdas.</p>
                  <Link href="/service" className="read-more tran3s"><i className="flaticon-next-1"></i></Link>
                </div>
                <div className="feature-block-one mb-45 md-mt-40">
                  <img src="/images/icon/icon4.svg" alt="" className="img-icon" />
                  <h5 className="pt-30 pb-25 tran3s title">Research &amp; Market Analysis</h5>
                  <p className="tran3s">Perkembangan bisnis yang dinamis menjadikan kebutuhan pasar terus berkembang. Untuk itu, setiap decision maker perlu mendalami strategi marketing yang paling tepat untuk kondisi dan dinamika market yang dituju.</p>
                  <Link href="/service" className="read-more tran3s"><i className="flaticon-next-1"></i></Link>
                </div>
                <div className="feature-block-one mb-45 md-mt-40">
                  <img src="/images/icon/icon11.svg" alt="" className="img-icon" />
                  <h5 className="pt-30 pb-25 tran3s title">Video Production</h5>
                  <p className="tran3s">Produksi video untuk Company Profile, TV Commercial, Marketing Tools, Konten Media Sosial seperti Youtube, Instagram, Facebook, dan lain sebagainya.</p>
                  <Link href="/service" className="read-more tran3s"><i className="flaticon-next-1"></i></Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="feature-block-one mb-45 md-mt-40">
                  <img src="/images/icon/icon5.svg" alt="" className="img-icon" />
                  <h5 className="pt-30 pb-25 tran3s title">Startup MVP &amp; Prototype.</h5>
                  <p className="tran3s">Minimum Viable Product dan Prototyping adalah salah satu metode yang tepat untuk memvalidasi ide dalam waktu yang lebih efektif dan efisien.</p>
                  <Link href="/service" className="read-more tran3s"><i className="flaticon-next-1"></i></Link>
                </div>
                <div className="feature-block-one mb-45 md-mt-40">
                  <img src="/images/icon/icon6.svg" alt="" className="img-icon" />
                  <h5 className="pt-30 pb-25 tran3s title">Campaign Digital Strategist</h5>
                  <p className="tran3s">Kami memberikan layanan untuk membangun brand activation sekaligus brand awareness yang sesuai dengan market yang dituju agar produk anda memiliki engagement yang kuat.</p>
                  <Link href="/service" className="read-more tran3s"><i className="flaticon-next-1"></i></Link>
                </div>
                <div className="feature-block-one mb-45 md-mt-40">
                  <img src="/images/icon/icon13.svg" alt="" className="img-icon" />
                  <h5 className="pt-30 pb-25 tran3s title">Social Media Campaign</h5>
                  <p className="tran3s">Menemukan strategi yang tepat untuk berkampanye di media sosial, sehingga mendapatkan jangkauan dan exposure yang lebih luas.</p>
                  <Link href="/service" className="read-more tran3s"><i className="flaticon-next-1"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Gallery */}
      <div className="project-gallery-home-one pos-r mt-200">
        <div className="container">
          <div className="d-md-flex align-items-center justify-content-between pos-r">
            <div className="theme-title-one">
              <div className="upper-title mb-5">Project</div>
              <h2 className="main-title">Project <i>Gallery.</i></h2>
            </div>
            <Link href="/portfolio" className="theme-btn line-button-one sm-mt-40">View Gallery</Link>
          </div>
        </div>

        <div className="slider-item-wrapper">
          <div className="home-gallery-slider">
            {[
              { img: 'hiasan1-min.png', caption: 'Mobile App Relawan' },
              { img: 'hiasan2-min.png', caption: 'Project Gallery' },
              { img: 'hiasan3-min.png', caption: 'Project Gallery' },
              { img: 'hiasan10-min.png', caption: 'Project Gallery' },
              { img: 'hiasan8-min.png', caption: 'Project Gallery' },
              { img: 'hiasan4-min.png', caption: 'Project Gallery' },
            ].map((item, index) => (
              <div className="item" key={index}>
                <div className="gallery-polar-state p-green">
                  <div className="img-holder pos-r">
                    <img src={`/images/portofolio/${item.img}`} alt={item.caption} />
                    <a href={`/images/portofolio/${item.img}`} className="icon zoom fancybox" data-fancybox="images" data-caption={item.caption}>+</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consultation Section */}
      <div className="consultation-section pos-r pt-50 pb-150 md-pt-80">
        <img src="/images/home/esteh-ask.svg" alt="" className="wow zoomIn animated consultation-section__img" />
        <div className="container">
          <div className="row">
            <div className="col-lg-6 order-lg-last">
              <div className="theme-title-one mb-85 md-mb-50">
                <h2 className="main-title underline"><span>Dapatkan Gratis!</span><br /> <span>Konsultasi dan Bertanya</span> <br /><span>Kepada Kami.</span></h2>
              </div>

              <div className="theme-form-style-one">
                <form className="form theme-form-style-one" id="contact-form" action="/api/contact" method="POST">
                  <div className="messages"></div>
                  <div className="controls">
                    <div className="form-group">
                      <input id="form_email" type="email" name="email" placeholder="Email Address*" required />
                      <div className="help-block with-errors"></div>
                    </div>
                    <div className="form-group">
                      <input id="form_sub" type="text" name="sub" placeholder="Judul*" required />
                      <div className="help-block with-errors"></div>
                    </div>
                    <div className="form-group">
                      <textarea id="form_message" name="message" className="form_message" placeholder="Pesanmu*" required></textarea>
                      <div className="help-block with-errors"></div>
                    </div>
                    <div className="row d-flex justify-content-start">
                      <button className="theme-btn solid-button-one" type="submit">Kirim</button>
                      <div className="upper-title ml-4 mr-4 d-flex align-items-center">atau</div>
                      <a href="https://wa.me/6281359883131?text=Halo, Sainskerta Nusantara." className="theme-btn line-button-one whatsapp-btn">via Whatsapp</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 order-lg-first"></div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="home-blog-one pos-r pt-180 pb-250 md-pt-20 md-pb-200">
        <div className="container">
          <div className="theme-title-one text-center pb-80">
            <div className="upper-title mb-5">Our Blog</div>
            <h2 className="main-title underline"><span>Our Company News</span></h2>
          </div>

          <div className="row">
            {[
              {
                img: '/images/testimo/asian-1-min.jpeg',
                name: 'Putri Anjani.',
                date: '21 Januari 2020',
                title: 'Membuat Mobile atau Website Dahulu ?.',
                excerpt: 'Memiliki website merupakan hal yang wajib, apakah mobile Apps juga ?',
              },
              {
                img: '/images/testimo/asian-2-min.jpeg',
                name: 'Jannatul Ferdus.',
                date: '11 Januari 2020',
                title: 'Penggunaan Data untuk Pengambilan keputusan',
                excerpt: 'Data merupakan nadi penting dalam keputusan dan sudah selayaknya data memiliki peranan penting dalam perusahaan.',
              },
              {
                img: '/images/testimo/asian-3-min.jpeg',
                name: 'Zubayer hasan.',
                date: '01 Januari 2020',
                title: 'Maksimalkan Konten Company Profile',
                excerpt: 'Company profile merupakan representatif dari perusahaan, sehingga peranannya pun harus maksimal.',
              },
            ].map((post, index) => (
              <div className="col-lg-4" key={index}>
                <div className="blog-post-block-one mt-40">
                  <div className="flip-box-front">
                    <div className="clearfix">
                      <img src={post.img} alt="" className="author-img" />
                      <div className="author-info">
                        <h6 className="name">{post.name}</h6>
                        <div className="date">{post.date}</div>
                      </div>
                    </div>
                    <a href="#" className="title">{post.title}</a>
                    <p>{post.excerpt}</p>
                  </div>
                  <div className="flip-box-back">
                    <div className="author-info">
                      <h6 className="name">{post.name}</h6>
                      <div className="date">{post.date}</div>
                    </div>
                    <a href="#" className="title">{post.title}</a>
                    <a href="#" className="more"><i className="flaticon-next-1"></i></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
