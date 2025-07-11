'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { NavigationEvents } from './NavigationEvents';
import { ConnectionProvider } from '../utils/ConnectionProvider';
import ElegantLoading from './ElegantLoading';

/**
 * OptimizedTransitionLayout - Versi yang dioptimalkan dari TransitionLayout
 * 
 * Komponen ini mengelola transisi antar halaman dengan menggunakan
 * OptimizedHelloTransition yang adaptif terhadap koneksi dan perangkat pengguna.
 */
export default function OptimizedTransitionLayout({ children }) {
  // State untuk tracking navigasi
  const [isNavigating, setIsNavigating] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Efek untuk menangani first load dengan performa yang lebih baik
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Gunakan localStorage untuk menyimpan status kunjungan
      // localStorage lebih persisten daripada sessionStorage
      const hasVisited = localStorage.getItem('hasVisitedPortfolio');
      const visitTimestamp = localStorage.getItem('visitTimestamp');
      const currentTime = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 jam dalam milidetik
      
      // Cek apakah ini kunjungan pertama atau sudah lebih dari 1 jam sejak kunjungan terakhir
      const isNewSession = !hasVisited || 
                          !visitTimestamp || 
                          (currentTime - parseInt(visitTimestamp, 10)) > oneHour;

      if (!isNewSession) {
        // Bukan kunjungan pertama dan masih dalam 1 jam terakhir
        setIsFirstLoad(false);
      } else {
        // Kunjungan pertama atau sudah lebih dari 1 jam
        // Simpan status kunjungan dan timestamp
        localStorage.setItem('hasVisitedPortfolio', 'true');
        localStorage.setItem('visitTimestamp', currentTime.toString());
        
        // Tampilkan animasi first load
        const timer = setTimeout(() => {
          setIsFirstLoad(false);
        }, 2500); // Hapus setelah 2.5 detik

        return () => clearTimeout(timer);
      }
      
      // Fungsi untuk menangani loading selesai dengan performa yang lebih baik
      const handleLoadComplete = () => {
        // Gunakan requestAnimationFrame untuk animasi yang lebih halus
        requestAnimationFrame(() => {
          // Tambahkan sedikit delay untuk memastikan animasi terlihat
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });
      };
      
      // Cek apakah dokumen sudah dimuat sepenuhnya
      if (document.readyState === 'complete') {
        handleLoadComplete();
      } else {
        // Simulasi loading selesai setelah konten dimuat
        window.addEventListener('load', handleLoadComplete);
      }
      
      // Fallback jika event load tidak terpicu
      // Gunakan waktu yang lebih pendek untuk meningkatkan responsivitas
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 2500); // Kurangi dari 3000ms menjadi 2500ms
      
      return () => {
        window.removeEventListener('load', handleLoadComplete);
        clearTimeout(loadingTimer);
      };
    }
  }, []);
  
  // Efek untuk menangani navigasi
  useEffect(() => {
    // Jika sedang navigasi, set timeout untuk mengubah isNavigating menjadi false
    if (isNavigating) {
      setIsLoading(true); // Aktifkan loading saat navigasi
      const timer = setTimeout(() => {
        setIsNavigating(false);
        setTimeout(() => {
          setIsLoading(false); // Nonaktifkan loading setelah navigasi selesai
        }, 500);
      }, 800); // Durasi minimum untuk menampilkan animasi navigasi
      
      return () => clearTimeout(timer);
    }
  }, [isNavigating]);
  
  return (
    <ConnectionProvider>
      {/* Komponen NavigationEvents untuk mendeteksi navigasi */}
      <Suspense fallback={null}>
        <NavigationEvents setIsNavigating={setIsNavigating} />
      </Suspense>
      
      {/* Komponen Loading dengan animasi CSS murni yang elegan */}
      <ElegantLoading isNavigating={isNavigating || isLoading} isFirstLoad={isFirstLoad} />
      
      {/* Konten halaman */}
      {children}
    </ConnectionProvider>
  );
}