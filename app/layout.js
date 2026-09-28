import './globals.css';
import { TelegramWebAppProvider } from '../components/TelegramWebAppProvider';

export const metadata = {
  title: 'Khayyis Billawal Rozikin | Portofolio Teknik Mekatronika & AI',
  description: 'Portofolio resmi Khayyis Billawal Rozikin, siswa Teknik Mekatronika SMKN 4 Jakarta. Spesialisasi dalam robotika otonom LKS, perancangan 3D CAD konveyor industri PT BAS, firmware ECU, dan AI.',
  keywords: [
    'Khayyis', 'Khayyis Billawal', 'Khayyis Billawal Rozikin',
    'Portofolio Khayyis', 'Teknik Mekatronika', 'SMKN 4 Jakarta',
    'Autonomous Mobile Robotic', 'Autodesk Inventor', 'PT Bumi Alam Segar',
    'Wings Group', 'ECU Web Serial', 'We.Sut', 'Telegram Mini App'
  ],
  authors: [{ name: 'Khayyis Billawal Rozikin', url: 'https://khayyis.vercel.app' }],
  creator: 'Khayyis Billawal Rozikin',
  metadataBase: new URL('https://khayyis.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://khayyis.vercel.app',
    siteName: 'Khayyis Billawal Rozikin | Portfolio',
    title: 'Khayyis Billawal Rozikin | Portofolio Teknik Mekatronika & AI',
    description: 'Siswa Teknik Mekatronika SMKN 4 Jakarta dengan spesialisasi robotika otonom, CAD industri, dan AI systems.',
    images: [
      {
        url: '/images/khayyis-profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Khayyis Billawal Rozikin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khayyis Billawal Rozikin | Portofolio Teknik Mekatronika',
    description: 'Siswa Teknik Mekatronika SMKN 4 Jakarta dengan keahlian robotik, desain 3D, dan AI.',
    images: ['/images/khayyis-profile.jpg'],
    creator: '@Khayyis_Billawal',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#09090b',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async></script>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Khayyis Billawal Rozikin",
              "url": "https://khayyis.vercel.app",
              "image": "https://khayyis.vercel.app/images/khayyis-profile.jpg",
              "jobTitle": "Siswa Teknik Mekatronika",
              "worksFor": {
                "@type": "EducationalOrganization",
                "name": "SMKN 4 Jakarta"
              },
              "knowsAbout": [
                "Autonomous Mobile Robotics",
                "Autodesk Inventor 3D CAD",
                "Kinematika Konveyor Industri",
                "PLC Programming",
                "Computer Vision & AI",
                "Web Serial Firmware",
                "Telegram Mini App"
              ],
              "sameAs": [
                "https://github.com/khayyis",
                "https://instagram.com/Khayyis_Billawal",
                "https://t.me/KhayyisBillawal"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-blue-600 selection:text-white" suppressHydrationWarning>
        <TelegramWebAppProvider>
          {children}
        </TelegramWebAppProvider>
      </body>
    </html>
  );
}
