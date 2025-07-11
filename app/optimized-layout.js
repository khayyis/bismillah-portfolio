'use client';

import ThemeProvider from '../components/ThemeProvider';
import SplashCursor from '../components/SplashCursor';
import OptimizedTransitionLayout from '../components/OptimizedTransitionLayout';

/**
 * OptimizedLayout - Layout yang dioptimalkan untuk performa
 * 
 * Komponen ini menggabungkan ThemeProvider, SplashCursor, dan OptimizedTransitionLayout
 * untuk memberikan pengalaman pengguna yang optimal dengan mempertimbangkan
 * kecepatan koneksi dan kemampuan perangkat.
 * 
 * Menggunakan ElegantLoading untuk animasi loading yang elegan dengan CSS murni.
 */
export default function OptimizedLayout({ children }) {
  return (
    <ThemeProvider>
      <SplashCursor />
      <OptimizedTransitionLayout>
        {children}
      </OptimizedTransitionLayout>
    </ThemeProvider>
  );
}