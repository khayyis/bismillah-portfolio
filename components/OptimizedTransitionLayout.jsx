'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { NavigationEvents } from './NavigationEvents';
import { ConnectionProvider } from '../utils/ConnectionProvider';
import { LoadingProvider } from '../contexts/LoadingContext';

/**
 * OptimizedTransitionLayout - Versi yang dioptimalkan dari TransitionLayout
 * 
 * Layout tanpa loading page - konten langsung ditampilkan.
 */
export default function OptimizedTransitionLayout({ children }) {
  // State untuk tracking navigasi
  const [isNavigating, setIsNavigating] = useState(false);
  // Loading complete langsung true supaya konten langsung muncul
  const [isLoadingComplete, setIsLoadingComplete] = useState(true);

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
        {/* Komponen NavigationEvents untuk mendeteksi navigasi */}
        <Suspense fallback={null}>
          <NavigationEvents setIsNavigating={setIsNavigating} />
        </Suspense>

        {/* Konten halaman - langsung tampil tanpa loading */}
        {children}
      </LoadingProvider>
    </ConnectionProvider>
  );
}