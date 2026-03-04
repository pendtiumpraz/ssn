import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="theme-footer-one pt-130">
            <div className="top-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 col-12 footer-about-widget">
                            <Link href="/" className="logo">
                                <img src="/images/logo/sainskerta.svg" style={{ marginLeft: '-7px' }} className="logo-footer" alt="Sainskerta Nusantara" />
                            </Link>
                            <a href="mailto:info@sainskerta.id" className="email">info@sainskerta.id</a>
                            <a href="tel:081359883131" className="phone">+62813-5988-3131</a>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12 footer-list">
                            <h5 className="footer-title">Services</h5>
                            <ul>
                                <li><Link href="/service">Web Development</Link></li>
                                <li><Link href="/service">Mobile Development</Link></li>
                                <li><Link href="/service">Corporate Information System</Link></li>
                                <li><Link href="/service">Research &amp; Market Analysis</Link></li>
                                <li><Link href="/service">Startup MVP &amp; Prototyping</Link></li>
                                <li><Link href="/service">Campaign Digital Strategist</Link></li>
                                <li><Link href="/service">Analysis Data</Link></li>
                                <li><Link href="/service">Video Production</Link></li>
                                <li><Link href="/service">Social Media Campaign</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12 footer-list">
                            <h5 className="footer-title">About us</h5>
                            <ul>
                                <li><Link href="/about">About us</Link></li>
                                <li><Link href="/portfolio">Work Portfolio</Link></li>
                                <li><Link href="/team">Team</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12 footer-information">
                            <h5 className="footer-title">Our Office</h5>
                            <strong>Head Quarter Office:</strong>
                            <p>
                                Gedung Graha Mampang Lt. 3 Suite 305 Jl. Mampang Prapatan Raya No. Kav. 100 Duren Tiga Pancoran Kota Adm. Jakarta Selatan DKI Jakarta 12760
                            </p>
                            <strong>Basecamp Office:</strong>
                            <p>
                                Jalan Tebet Barat Dalam VA No. 35, Tebet, Kota Adm. Jakarta Selatan DKI Jakarta 12810
                            </p>
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/sainskerta.id/" target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/sainskerta_id" target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/company/sainskertaid/" target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="bottom-footer-content">
                    <p>&copy; 2013 - {currentYear} Copyright all right reserved</p>
                    <p>Sainskerta Nusantara - PT. Sainskerta Solusi Nusantara</p>
                </div>
            </div>
        </footer>
    )
}
