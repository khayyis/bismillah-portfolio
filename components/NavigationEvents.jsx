'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * NavigationEvents - Komponen untuk mendeteksi navigasi antar halaman
 * 
 * Versi yang dioptimalkan dengan penanganan performa yang lebih baik dan
 * mengurangi false positives dalam deteksi navigasi.
 */
export function NavigationEvents({ setIsNavigating }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef(null);
  
  // Fungsi untuk membersihkan timeout navigasi
  const clearNavigationTimeout = () => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
  };

  // Deteksi perubahan rute dengan throttling untuk menghindari multiple triggers
  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      // Buat URL dengan pathname dan searchParams
      const searchParamsString = searchParams?.toString() || '';
      const url = `${pathname}${searchParamsString ? `?${searchParamsString}` : ''}`;
      const prevUrl = sessionStorage.getItem('currentUrl');
      
      // Simpan URL saat ini
      sessionStorage.setItem('currentUrl', url);

      // Cek apakah ini adalah navigasi baru
      if (prevUrl && prevUrl !== url && !isNavigatingRef.current) {
        // Set flag navigasi
        isNavigatingRef.current = true;
        setIsNavigating(true);
        
        // Simpan waktu mulai navigasi
        sessionStorage.setItem('navigationStartTime', Date.now().toString());
        
        // Reset flag navigasi setelah beberapa waktu
        clearNavigationTimeout();
        navigationTimeoutRef.current = setTimeout(() => {
          isNavigatingRef.current = false;
        }, 1000); // Tunggu 1 detik sebelum mengizinkan navigasi baru
      }
    }
    
    return () => {
      clearNavigationTimeout();
    };
  }, [pathname, searchParams, setIsNavigating]);

  // Deteksi navigasi browser dengan debouncing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let clickTimeout = null;
      
      // Fungsi untuk menangani awal navigasi
      const handleStart = () => {
        if (!isNavigatingRef.current) {
          isNavigatingRef.current = true;
          setIsNavigating(true);
          
          // Reset flag navigasi setelah beberapa waktu
          clearNavigationTimeout();
          navigationTimeoutRef.current = setTimeout(() => {
            isNavigatingRef.current = false;
          }, 1000);
        }
      };

      // Tambahkan event listener untuk klik link dengan debouncing
      const handleLinkClick = (e) => {
        // Cek apakah yang diklik adalah link internal
        const target = e.target.closest('a');
        if (target && target.href && target.href.startsWith(window.location.origin)) {
          // Gunakan debouncing untuk menghindari multiple triggers
          if (clickTimeout) clearTimeout(clickTimeout);
          
          clickTimeout = setTimeout(() => {
            if (!isNavigatingRef.current) {
              isNavigatingRef.current = true;
              setIsNavigating(true);
              
              // Reset flag navigasi setelah beberapa waktu
              clearNavigationTimeout();
              navigationTimeoutRef.current = setTimeout(() => {
                isNavigatingRef.current = false;
              }, 1000);
            }
          }, 50); // Debounce 50ms
        }
      };

      // Tambahkan event listeners
      window.addEventListener('beforeunload', handleStart);
      document.addEventListener('click', handleLinkClick);

      return () => {
        window.removeEventListener('beforeunload', handleStart);
        document.removeEventListener('click', handleLinkClick);
        if (clickTimeout) clearTimeout(clickTimeout);
        clearNavigationTimeout();
      };
    }
  }, [setIsNavigating]);

  return null;
}