'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { NavigationEvents } from './NavigationEvents';
import { ConnectionProvider } from '../utils/ConnectionProvider';
import { LoadingProvider } from '../contexts/LoadingContext';
import ObysPreloader from './ObysPreloader';

/**
 * OptimizedTransitionLayout - Layout dengan Obys Preloader
 */
export default function OptimizedTransitionLayout({ children }) {
  // State untuk tracking navigasi
  const [isNavigating, setIsNavigating] = useState(false);
  // Track loading complete (false awal saat preloader jalan)
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  // Efek untuk menangani navigasi
  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isNavigating]);

  return (
    <ConnectionProvider>
      <LoadingProvider value={{ isLoadingComplete, setLoadingComplete: setIsLoadingComplete }}>
        {/* Obys Preloader Animation */}
        <ObysPreloader onComplete={() => setIsLoadingComplete(true)} />

        {/* Komponen NavigationEvents untuk mendeteksi navigasi */}
        <Suspense fallback={null}>
          <NavigationEvents setIsNavigating={setIsNavigating} />
        </Suspense>

        {/* Konten halaman */}
        {children}
      </LoadingProvider>
    </ConnectionProvider>
  );
}