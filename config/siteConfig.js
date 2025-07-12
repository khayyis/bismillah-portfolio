/**
 * File konfigurasi untuk pengaturan situs secara keseluruhan
 * Ubah nilai-nilai di bawah ini sesuai dengan kebutuhan situs Anda
 */

const siteConfig = {
  // Informasi dasar situs
  title: "Portfolio",
  description: "Portfolio personal Khayyis Billawal Rozikin, siswa Teknik Mekatronika SMKN 4 Jakarta dengan fokus pada robotik, desain 3D, dan teknologi AI.",
  siteUrl: "https://khayyis.vercel.app", // URL situs Anda
  language: "id-ID",
  locale: "id_ID",
  
  // Metadata untuk SEO
  metadata: {
    keywords: "khayyis, portfolio, robotik, mekatronika, desain 3D, teknologi, AI, SMKN 4 Jakarta",
    author: "Khayyis Billawal Rozikin",
    creator: "Khayyis Billawal Rozikin",
    publisher: "Khayyis Billawal Rozikin",
    themeColor: "#3b82f6", // Warna tema untuk browser mobile
    colorScheme: "dark light", // Skema warna yang didukung
  },
  
  // Pengaturan Open Graph untuk media sosial
  openGraph: {
    type: "website",
    image: "/images/cropped-khayyis-profile.jpg", // Path relatif dari folder public
    imageAlt: "Foto profil Khayyis Billawal Rozikin",
    imageWidth: 1200,
    imageHeight: 630,
  },
  
  // Pengaturan Twitter Card
  twitter: {
    card: "summary_large_image",
    creator: "@khayyis", // Username Twitter Anda
    image: "/images/cropped-khayyis-profile.jpg", // Path relatif dari folder public
  },
  
  // Pengaturan analitik (opsional)
  analytics: {
    googleAnalyticsId: "", // ID Google Analytics (jika digunakan)
  },
  
  // Pengaturan navigasi
  navigation: {
    menuItems: [
      { name: "Beranda", path: "/" },
      { name: "Tentang", path: "/#about" },
      { name: "Keahlian", path: "/#skills" },
      { name: "Proyek", path: "/#projects" },
      { name: "Kontak", path: "/#kontak" },
    ],
  },
};

export default siteConfig;