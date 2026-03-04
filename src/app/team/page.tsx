import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
    title: 'Team - Sainskerta Nusantara',
    description: 'Tim Sainskerta Nusantara - Expert team of passionate creators.',
}

export default async function TeamPage() {
    let teamMembers: any[] = []
    try {
        teamMembers = await prisma.teamMember.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        })
    } catch {
        // fallback if DB unavailable
    }

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
                        {teamMembers.map((member) => (
                            <div className="col-lg-4 col-md-6" key={member.id}>
                                <div className="single-team-member">
                                    <div className="wrapper pos-r">
                                        <div className="img-box"><img src={member.image} alt={member.name} /></div>
                                        <div className="info-meta">
                                            <h6 className="name">{member.name}</h6>
                                            <span>{member.role}</span>
                                        </div>
                                    </div>
                                    <div className="hover-content">
                                        <ul>
                                            {member.facebook && member.facebook !== '#' && (
                                                <li><a href={member.facebook} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                            )}
                                            {member.twitter && member.twitter !== '#' && (
                                                <li><a href={member.twitter} target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                            )}
                                            {member.linkedin && member.linkedin !== '#' && (
                                                <li><a href={member.linkedin} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                            )}
                                            {member.instagram && member.instagram !== '#' && (
                                                <li><a href={member.instagram} target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                            )}
                                            {/* Fallback if no social links */}
                                            {(!member.facebook || member.facebook === '#') && (!member.twitter || member.twitter === '#') && (!member.linkedin || member.linkedin === '#') && (!member.instagram || member.instagram === '#') && (
                                                <>
                                                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                                    <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                                    <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                                </>
                                            )}
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
