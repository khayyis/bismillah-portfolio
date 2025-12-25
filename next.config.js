/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
    remotePatterns: [
      { protocol: 'https', hostname: '**.imgur.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '**.imgbb.com' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: '**.postimg.cc' },
      { protocol: 'https', hostname: 'i.postimg.cc' },
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.pexels.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
      // Instagram CDN
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: 'scontent.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: 'scontent-*.cdninstagram.com' },
    ],
  },
  // Konfigurasi tambahan untuk mengatasi masalah hydration
  compiler: {
    // Menonaktifkan reaktif hydrasi yang mungkin menyebabkan masalah
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  // Mematikan optimasi yang dapat menyebabkan masalah hydration
  experimental: {
    // Menonaktifkan optimasi yang mungkin menyebabkan masalah hydration
    optimizeCss: false,
  },
};

module.exports = nextConfig; 