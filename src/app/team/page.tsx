import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Team - Sainskerta Nusantara',
    description: 'Tim Sainskerta Nusantara - Expert team of passionate creators.',
}

const teamMembers = [
    { name: 'M. Rizal Karunia Haris', role: 'Chief Executive Officer', img: '/images/team/rizal.png', linkedin: '#' },
    { name: 'Achmad Faik Faruqi', role: 'Chief Technology Officer', img: '/images/team/faik.jpeg', linkedin: '#' },
    { name: 'Ifa Alif', role: 'Chief Information Officer', img: '/images/team/alif.jpg', linkedin: '#' },
    { name: 'Galih Prasetyo', role: 'Chief AI Engineer', img: '/images/team/galih2.jpg', linkedin: 'https://linkedin.com/in/pendtiumpraz' },
    { name: "Hilwin Nisa'", role: 'Chief Operating Officer', img: '/images/team/hilwin.jpg', linkedin: '#' },
    { name: 'Mery Yulikuntari', role: 'Data Analyst', img: '/images/team/mery.jpg', linkedin: '#' },
    { name: 'Nyuhani Prasasti', role: 'Human Resource & Development', img: '/images/team/hani.jpg', linkedin: '#' },
    { name: 'Irvan Ariyanto', role: 'Data Scientist', img: '/images/team/irvan.jpeg', linkedin: '#' },
    { name: 'Dany Asyari', role: 'UI/UX Designer', img: '/images/team/dani.jpeg', linkedin: '#' },
    { name: 'Alfan Ghinan Rusydi', role: 'Full Stack Developer', img: '/images/team/alfan.jpg', linkedin: '#' },
    { name: 'M. Dhofir Alibi', role: 'Senior Android Programmer', img: '/images/team/alibi.jpeg', linkedin: '#' },
    { name: 'Ahmad Dzul Fikri', role: 'Senior Backend Engineer', img: '/images/team/fikri.JPG', linkedin: '#' },
    { name: 'Abdan Syakuro', role: 'Senior Web Programmer', img: '/images/team/abdan.jpeg', linkedin: '#' },
    { name: 'Alif Nur I', role: 'Senior Full Stack Programmer', img: '/images/team/alif-nur.jpeg', linkedin: '#' },
    { name: 'Naufaldi Rafif S', role: 'Senior Frontend Programmer', img: '/images/team/naufal.JPG', linkedin: '#' },
    { name: 'Eldo Alvianto', role: 'Videographer & Editing', img: '/images/team/eldo.jpg', linkedin: '#' },
    { name: 'Vetuwa', role: 'Videographer & Editing', img: '/images/team/vetuwa.jpg', linkedin: '#' },
]

export default function TeamPage() {
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
                    <p>Team</p>
                    <h2 className="pt-30 pb-15">We&apos;ve expert Team.</h2>
                    <p className="sub-heading">From a team of passionate creators working side-by-side with our partners to deliver engaging digital approach.</p>
                </div>
            </div>

            {/* Team Members */}
            <div className="team-standard our-team pb-200 md-pb-80">
                <div className="container">
                    <div className="row">
                        {teamMembers.map((member, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div className="single-team-member">
                                    <div className="wrapper pos-r">
                                        <div className="img-box"><img src={member.img} alt={member.name} /></div>
                                        <div className="info-meta">
                                            <h6 className="name">{member.name}</h6>
                                            <span>{member.role}</span>
                                        </div>
                                    </div>
                                    <div className="hover-content">
                                        <ul>
                                            <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                            <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                            <li><a href={member.linkedin}><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                        </ul>
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
