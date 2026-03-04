import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact - Sainskerta Nusantara',
    description: 'Hubungi Sainskerta Nusantara - Get in touch with our team.',
}

export default function ContactPage() {
    return (
        <>
            {/* Text Inner Banner */}
            <div className="text-inner-banner-one pos-r">
                <div className="shape-wrapper">
                    <svg className="img-shape shape-one"><path fillRule="evenodd" fill="rgb(255, 223, 204)" d="M6.000,12.000 C9.314,12.000 12.000,9.314 12.000,6.000 C12.000,2.686 9.314,-0.000 6.000,-0.000 C2.686,-0.000 -0.000,2.686 -0.000,6.000 C-0.000,9.314 2.686,12.000 6.000,12.000 Z" /></svg>
                    <svg className="img-shape shape-two"><path fillRule="evenodd" fill="rgb(182, 255, 234)" d="M6.000,12.000 C9.314,12.000 12.000,9.314 12.000,6.000 C12.000,2.686 9.314,-0.000 6.000,-0.000 C2.686,-0.000 -0.000,2.686 -0.000,6.000 C-0.000,9.314 2.686,12.000 6.000,12.000 Z" /></svg>
                    <svg className="img-shape shape-three"><path fillRule="evenodd" fill="rgb(181, 198, 255)" d="M12.000,24.000 C18.627,24.000 24.000,18.627 24.000,12.000 C24.000,5.372 18.627,-0.000 12.000,-0.000 C5.372,-0.000 -0.000,5.372 -0.000,12.000 C-0.000,18.627 5.372,24.000 12.000,24.000 Z" /></svg>
                    <svg className="img-shape shape-four"><path fillRule="evenodd" fill="rgb(255, 156, 161)" d="M7.500,15.000 C11.642,15.000 15.000,11.642 15.000,7.500 C15.000,3.358 11.642,-0.000 7.500,-0.000 C3.358,-0.000 -0.000,3.358 -0.000,7.500 C-0.000,11.642 3.358,15.000 7.500,15.000 Z" /></svg>
                    <svg className="img-shape shape-five"><path fillRule="evenodd" fill="rgb(178, 236, 255)" d="M12.500,25.000 C19.403,25.000 25.000,19.403 25.000,12.500 C25.000,5.596 19.403,-0.000 12.500,-0.000 C5.596,-0.000 -0.000,5.596 -0.000,12.500 C-0.000,19.403 5.596,25.000 12.500,25.000 Z" /></svg>
                </div>
                <div className="container">
                    <p>Get in Touch</p>
                    <h2 className="pt-30 pb-15">contact us</h2>
                    <p className="sub-heading">From a team of passionate creators working side-by-side with our partners to deliver engaging digital and physical campaigns.</p>
                </div>
            </div>

            {/* Contact Address */}
            <div className="contact-address-two">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="address-block">
                                <div className="icon-box"><img src="/images/icon/icon20.svg" alt="" /></div>
                                <h5>Our Location</h5>
                                <p>Jalan Villa Ragunan No. 20 Kelurahan Ragunan, <br />Kec. Pasar Minggu, Jakarta Selatan 12550</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="address-block">
                                <div className="icon-box"><img src="/images/icon/icon21.svg" alt="" /></div>
                                <h5>Email &amp; Phone</h5>
                                <p><a href="mailto:info@sainskerta.id">info@sainskerta.id</a> <br /><a href="tel:081359883131">081359883131</a></p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="address-block">
                                <div className="icon-box"><img src="/images/icon/icon22.svg" alt="" /></div>
                                <h5>Sosial Media</h5>
                                <p>Hubungi melalui sosial media kami</p>
                                <ul>
                                    <li><a href="https://www.instagram.com/sainskerta.id/"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                    <li><a href="https://wa.me/6281359883131"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="contact-us-section pt-80 pb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 order-lg-last">
                            <div className="contact-form">
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
                                        <button className="theme-btn solid-button-one radius3" type="submit">Kirim Pesan</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-first">
                            <img src="/images/home/esteh-ask.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
