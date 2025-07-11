'use client';

import { useState, useEffect } from 'react';
import { NavigationEvents } from './NavigationEvents';
import HelloTransition from './HelloTransition';

export default function TransitionLayout({ children }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Deteksi load pertama halaman
  useEffect(() => {
    // Jika ini load pertama, kita bisa menampilkan animasi loading juga
    if (isFirstLoad) {
      // Simpan waktu mulai navigasi untuk perhitungan durasi minimum
      sessionStorage.setItem('navigationStartTime', Date.now().toString());
      setIsNavigating(true);
      
      // Tandai bahwa ini bukan load pertama lagi setelah komponen di-mount
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  const handleAnimationComplete = () => {
    // Periksa apakah sudah melewati durasi minimum untuk animasi
    const navigationStartTime = sessionStorage.getItem('navigationStartTime');
    const currentTime = Date.now();
    const minimumDuration = 800; // Durasi minimum dalam milidetik
    
    if (navigationStartTime) {
      const elapsedTime = currentTime - parseInt(navigationStartTime);
      
      if (elapsedTime < minimumDuration) {
        // Jika belum mencapai durasi minimum, tunggu sebentar
        const remainingTime = minimumDuration - elapsedTime;
        setTimeout(() => {
          setIsNavigating(false);
        }, remainingTime);
      } else {
        // Jika sudah melewati durasi minimum, langsung selesaikan
        setIsNavigating(false);
      }
    } else {
      // Jika tidak ada waktu mulai, langsung selesaikan
      setIsNavigating(false);
    }
  };

  return (
    <>
      <NavigationEvents setIsNavigating={setIsNavigating} />
      <HelloTransition 
        isNavigating={isNavigating} 
        onAnimationComplete={handleAnimationComplete} 
      />
      {children}
    </>
  );
}