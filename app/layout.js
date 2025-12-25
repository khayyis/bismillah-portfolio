import './globals.css'
import './darkTheme.css'
import OptimizedLayout from './optimized-layout'
import './optimized-imports' // Import stylesheet untuk optimasi
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  // Primary SEO
  title: 'Khayyis Billawal Rozikin | Portofolio Teknik Mekatronika',
  description: 'Khayyis Billawal Rozikin - Portofolio resmi siswa Teknik Mekatronika SMKN 4 Jakarta. Keahlian dalam robotik, desain 3D, pemrograman, dan Artificial Intelligence. Lihat proyek dan karya terbaik Khayyis.',
  keywords: [
    'Khayyis', 'Khayyis Billawal', 'Khayyis Billawal Rozikin', 'Khayyis Rozikin',
    'Portofolio Khayyis', 'Portfolio Khayyis',
    'Teknik Mekatronika', 'SMKN 4 Jakarta', 'SMK 4 Jakarta',
    'Robotik', 'Robotika', 'Desain 3D', 'AI', 'Artificial Intelligence',
    'Web Developer Jakarta', 'Siswa SMK Berbakat', 'Programmer Muda Indonesia'
  ],
  authors: [{ name: 'Khayyis Billawal Rozikin', url: 'https://khayyis.vercel.app' }],
  creator: 'Khayyis Billawal Rozikin',
  publisher: 'Khayyis Billawal Rozikin',

  // Canonical URL
  metadataBase: new URL('https://khayyis.vercel.app'),
  alternates: {
    canonical: '/',
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://khayyis.vercel.app',
    siteName: 'Khayyis Billawal Rozikin Portfolio',
    title: 'Khayyis Billawal Rozikin | Portofolio Teknik Mekatronika',
    description: 'Portofolio resmi Khayyis Billawal Rozikin - Siswa Teknik Mekatronika SMKN 4 Jakarta dengan keahlian robotik, desain 3D, dan AI.',
    images: [
      {
        url: '/images/khayyis-profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Khayyis Billawal Rozikin - Portofolio',
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'Khayyis Billawal Rozikin | Portofolio',
    description: 'Portofolio resmi Khayyis - Siswa Teknik Mekatronika dengan keahlian robotik dan AI.',
    images: ['/images/khayyis-profile.jpg'],
    creator: '@Khayyis_Billawal',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification (already have these)
  verification: {
    google: '1d9885586a9031b9',
    other: {
      'msvalidate.01': '80186E6FB990AC76A1CF39A553D015A7',
    },
  },

  formatDetection: {
    email: false,
    telephone: false
  }
}

// Komponen layout yang dibuat lebih stabil untuk menghindari masalah hydration
export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/cropped-khayyis-profile.jpg" type="image/jpeg" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/lemon-milk" />
        <link rel="stylesheet" href="/fix-profile-image.css" />
        <link rel="stylesheet" href="/fix-project-images.css" />
        <link rel="stylesheet" href="/fix-image-display.css" />
        <link rel="stylesheet" href="/force-image-display.css" />
        <link rel="stylesheet" href="/fix-hydration-styles.css" />
        <link rel="stylesheet" href="/fix-image-loading.css" />
        <link rel="stylesheet" href="/project-loading.css" />
        <script src="/fix-hydration-mismatch.js"></script>
        <script src="/preload-project-images.js" defer></script>
        <script src="/debug-images.js" defer></script>

        {/* JSON-LD Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Khayyis Billawal Rozikin",
              "alternateName": ["Khayyis", "Khayyis Billawal", "Khayyis Rozikin"],
              "url": "https://khayyis.vercel.app",
              "image": "https://khayyis.vercel.app/images/khayyis-profile.jpg",
              "description": "Siswa Teknik Mekatronika SMKN 4 Jakarta dengan keahlian dalam robotik, desain 3D, dan Artificial Intelligence",
              "jobTitle": "Siswa Teknik Mekatronika",
              "worksFor": {
                "@type": "EducationalOrganization",
                "name": "SMKN 4 Jakarta"
              },
              "knowsAbout": ["Robotika", "Desain 3D", "Artificial Intelligence", "Pemrograman", "Web Development"],
              "sameAs": [
                "https://instagram.com/Khayyis_Billawal",
                "https://github.com/khayyis"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Khayyis Billawal Rozikin Portfolio",
              "alternateName": "Portofolio Khayyis",
              "url": "https://khayyis.vercel.app",
              "description": "Portofolio resmi Khayyis Billawal Rozikin - Siswa Teknik Mekatronika SMKN 4 Jakarta",
              "author": {
                "@type": "Person",
                "name": "Khayyis Billawal Rozikin"
              }
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <OptimizedLayout>
          {children}
        </OptimizedLayout>
        <SpeedInsights />
      </body>
    </html>
  )
}