/**
 * File konfigurasi untuk tautan sosial media dan eksternal
 * Ubah nilai-nilai di bawah ini sesuai dengan akun sosial media dan tautan Anda
 */

const socialConfig = {
  // Tautan sosial media
  socialMedia: {
    instagram: {
      url: "https://instagram.com/Khayyis_Billawal",
      username: "@Khayyis_Billawal",
      enabled: true,
    },
    github: {
      url: "https://github.com/khayyis",
      username: "khayyis",
      enabled: true,
    },
    linkedin: {
      url: "https://linkedin.com/in/khayyis-billawal",
      username: "khayyis-billawal",
      enabled: true,
    },
    twitter: {
      url: "https://twitter.com/khayyis_dev",
      username: "@khayyis_dev",
      enabled: false, // Set ke false jika tidak ingin ditampilkan
    },
    youtube: {
      url: "https://youtube.com/@khayyis",
      username: "@khayyis",
      enabled: false, // Set ke false jika tidak ingin ditampilkan
    },
  },
  
  // Tautan eksternal
  externalLinks: {
    portfolio: {
      url: "https://khayyis-portfolio.vercel.app",
      label: "Portfolio Website",
      enabled: true,
    },
    resume: {
      url: "/files/khayyis-resume.pdf", // Path relatif dari folder public
      label: "Download Resume",
      enabled: true,
    },
    school: {
      url: "https://smkn4jakarta.sch.id",
      label: "SMKN 4 Jakarta",
      enabled: true,
    },
  },
  
  // Pengaturan kontak
  contact: {
    email: {
      address: "khayyis8@gmail.com",
      subject: "Kontak dari Website Portfolio", // Subject default untuk mailto link
      enabled: true,
    },
    whatsapp: {
      number: "+6281234567890", // Ganti dengan nomor WhatsApp Anda
      message: "Halo, saya melihat portfolio Anda dan ingin berbicara lebih lanjut.", // Pesan default
      enabled: true,
    },
    telegram: {
      username: "KhayyisBillawal",
      url: "http://t.me/KhayyisBillawal",
      enabled: true, // Mengaktifkan tampilan Telegram
    },
  },
  
  // Pengaturan sharing
  sharing: {
    enabled: true, // Aktifkan fitur berbagi
    platforms: ["facebook", "twitter", "linkedin", "whatsapp"], // Platform yang diaktifkan
    defaultMessage: "Lihat portfolio Khayyis Billawal Rozikin!", // Pesan default untuk berbagi
  },
};

export default socialConfig;