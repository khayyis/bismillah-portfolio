'use client';

import OptimizedHelloTransition from '../components/OptimizedHelloTransition';
import { useEffect, useState } from 'react';

/**
 * Loading - Komponen loading untuk Next.js App Router
 * 
 * Komponen ini akan ditampilkan secara otomatis oleh Next.js saat halaman sedang dimuat.
 * Menggunakan OptimizedHelloTransition untuk menampilkan animasi loading yang konsisten.
 * 
 * Versi yang dioptimalkan dengan penanganan performa yang lebih baik.
 */
export default function Loading() {
  // Gunakan state untuk memastikan komponen hanya dirender di client-side
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Tandai komponen sebagai mounted setelah dirender di client
    setMounted(true);
    
    // Cleanup function
    return () => {
      setMounted(false);
    };
  }, []);
  
  // Jika belum mounted, jangan render apa-apa untuk menghindari hydration mismatch
  if (!mounted) return null;
  
  // Gunakan isNavigating=true untuk memastikan animasi loading ditampilkan
  // dan isFirstLoad=false karena ini bukan first load, tapi loading antar halaman
  return <OptimizedHelloTransition isNavigating={true} isFirstLoad={false} />;
}