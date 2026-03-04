import type { Metadata } from "next"
import LayoutShell from "@/components/LayoutShell"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sainskerta Nusantara - Innovating Technology to Deliver Happiness",
  description: "Sainskerta Nusantara, Innovating Technology to Deliver Happiness. Kami menghadirkan solusi teknologi yang komprehensif untuk mengembangkan bisnis Anda.",
  keywords: "software house, IT Konsultan, IT, Web Development, Mobile Apps Development, Startup, Android",
  authors: [{ name: "sainskertanusantara" }],
  openGraph: {
    images: ['/images/home/ogg.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="theme-color" content="#fff" />
        <link rel="icon" type="image/png" sizes="56x56" href="/images/fav-icon/favicon-sainskerta.ico" />
        {/* Vendor CSS */}
        <link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/vendor/aos-next/dist/aos.css" />
        <link rel="stylesheet" href="/vendor/owl-carousel/owl.carousel.min.css" />
        <link rel="stylesheet" href="/vendor/fancybox/dist/jquery.fancybox.min.css" />
        {/* Main CSS */}
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
        <link rel="stylesheet" href="/css/esteh.css" />
        <link rel="stylesheet" href="/css/custom-animation.css" />
      </head>
      <body>
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  )
}
