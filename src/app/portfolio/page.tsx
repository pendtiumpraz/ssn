import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Portfolio - Sainskerta Nusantara',
    description: 'Portfolio Sainskerta Nusantara - Our completed projects and gallery.',
}

const portfolioItems = [
    { img: '/images/portofolio/hiasan1-min.png', caption: 'Mobile App Relawan' },
    { img: '/images/portofolio/hiasan2-min.png', caption: 'Web Platform' },
    { img: '/images/portofolio/hiasan3-min.png', caption: 'Digital Campaign' },
    { img: '/images/portofolio/hiasan4-min.png', caption: 'E-Commerce Platform' },
    { img: '/images/portofolio/hiasan5-min.png', caption: 'Mobile App Design' },
    { img: '/images/portofolio/hiasan6-min.png', caption: 'Corporate System' },
    { img: '/images/portofolio/hiasan7-min.png', caption: 'Data Dashboard' },
    { img: '/images/portofolio/hiasan8-min.png', caption: 'UI/UX Design' },
    { img: '/images/portofolio/hiasan9-min.png', caption: 'Video Production' },
    { img: '/images/portofolio/hiasan10-min.png', caption: 'Social Media Campaign' },
]

export default function PortfolioPage() {
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
                    <p>Our Work</p>
                    <h2 className="pt-30 pb-15">Portfolio Gallery</h2>
                    <p className="sub-heading">Berikut adalah beberapa karya dan proyek yang telah kami selesaikan bersama klien-klien kami.</p>
                </div>
            </div>

            {/* Portfolio Gallery */}
            <div className="portfolio-gallery pt-150 pb-200 md-pt-80 md-pb-80">
                <div className="container">
                    <div className="row">
                        {portfolioItems.map((item, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div className="gallery-polar-state p-green mb-50">
                                    <div className="img-holder pos-r">
                                        <img src={item.img} alt={item.caption} />
                                        <a href={item.img} className="icon zoom fancybox" data-fancybox="gallery" data-caption={item.caption}>+</a>
                                    </div>
                                    <div className="text-content">
                                        <h6>{item.caption}</h6>
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
