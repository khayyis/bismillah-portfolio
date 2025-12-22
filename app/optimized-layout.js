'use client';

import ThemeProvider from '../components/ThemeProvider';
import SplashCursor from '../components/SplashCursor';
import OptimizedTransitionLayout from '../components/OptimizedTransitionLayout';
import ClickSpark from '../components/ClickSpark';

/**
 * OptimizedLayout - Layout yang dioptimalkan untuk performa
 * 
 * Komponen ini menggabungkan ThemeProvider, SplashCursor, ClickSpark, dan OptimizedTransitionLayout
 * untuk memberikan pengalaman pengguna yang optimal dengan mempertimbangkan
 * kecepatan koneksi dan kemampuan perangkat.
 * 
 * Menggunakan ElegantLoading untuk animasi loading yang elegan dengan CSS murni.
 * ClickSpark memberikan efek spark animasi saat user mengklik di mana saja.
 */
export default function OptimizedLayout({ children }) {
  return (
    <ThemeProvider>
      <ClickSpark
        sparkColor="#6366f1"
        sparkSize={12}
        sparkRadius={20}
        sparkCount={10}
        duration={500}
      >
        <SplashCursor />
        <OptimizedTransitionLayout>
          {children}
        </OptimizedTransitionLayout>
      </ClickSpark>
    </ThemeProvider>
  );
}
