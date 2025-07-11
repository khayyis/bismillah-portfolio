/**
 * File konfigurasi untuk tema dan tampilan website
 * Ubah nilai-nilai di bawah ini sesuai dengan preferensi tampilan Anda
 */

const themeConfig = {
  // Mode tema (light atau dark)
  mode: 'dark', // Ubah ke 'light' untuk tema terang
  
  // Warna utama website
  colors: {
    primary: {
      light: '#60a5fa', // blue-400
      main: '#3b82f6',  // blue-500
      dark: '#2563eb',  // blue-600
    },
    secondary: {
      light: '#a78bfa', // purple-400
      main: '#8b5cf6',  // purple-500
      dark: '#7c3aed',  // purple-600
    },
    background: {
      light: '#f9fafb', // gray-50
      main: '#f3f4f6',  // gray-100
      dark: '#1f2937',  // gray-800
      darker: '#111827', // gray-900 (untuk dark mode)
    },
    text: {
      primary: '#1f2937',   // gray-800
      secondary: '#4b5563', // gray-600
      light: '#f9fafb',     // gray-50
      dark: {              // Warna teks untuk dark mode
        primary: '#f9fafb',   // gray-50
        secondary: '#e5e7eb', // gray-200
      }
    },
    gradient: {
      primary: 'linear-gradient(145deg, #3b82f6, #8b5cf6)', // blue to purple
      secondary: 'linear-gradient(145deg, #60a5fa, #a78bfa)', // light blue to light purple
      dark: 'linear-gradient(145deg, #1e40af, #6d28d9)', // dark blue to dark purple (untuk dark mode)
    },
  },
  
  // Font dan tipografi
  typography: {
    fontFamily: {
      heading: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      body: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
  },
  
  // Efek dan animasi
  effects: {
    enableTilt: true,         // Efek tilt pada kartu profil
    enableParallax: true,     // Efek parallax pada scroll
    enableShinyText: true,    // Efek teks berkilau
    enableCrosshair: false,   // Efek crosshair cursor
  },
  
  // Layout dan spacing
  layout: {
    maxWidth: '1200px',       // Lebar maksimum konten
    navbarHeight: '80px',     // Tinggi navbar
    footerHeight: '200px',    // Tinggi footer
    sectionSpacing: '5rem',   // Jarak antar section
  },
  
  // Responsivitas
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export default themeConfig;