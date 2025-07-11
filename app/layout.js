import './globals.css'
import './darkTheme.css'
import OptimizedLayout from './optimized-layout'
import './optimized-imports' // Import stylesheet untuk optimasi
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: 'Khayyis Billawal Rozikin | Portofolio',
  description: 'Portofolio profesional Khayyis Billawal Rozikin, siswa SMKN 4 Jakarta jurusan Teknik Mekatronika dengan fokus pada robotik, desain 3D, dan AI',
  keywords: ['Khayyis Billawal Rozikin', 'Portofolio', 'Teknik Mekatronika', 'Robotik', 'Desain 3D', 'AI', 'SMKN 4 Jakarta'],
  authors: [{ name: 'Khayyis Billawal Rozikin' }],
  creator: 'Khayyis Billawal Rozikin',
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
        <meta name="msvalidate.01" content="80186E6FB990AC76A1CF39A553D015A7" />
        <link rel="icon" href="/images/cropped-khayyis-profile.jpg" type="image/jpeg" />
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