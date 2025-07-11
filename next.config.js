/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
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