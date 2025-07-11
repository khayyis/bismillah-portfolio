'use client';

import { useEffect } from 'react';

/**
 * Komponen untuk menginisialisasi efek blur global
 * Komponen ini menambahkan fungsi handleGlobalBlur ke window
 * yang dapat digunakan oleh komponen lain untuk mengaktifkan/menonaktifkan efek blur global
 */
export default function GlobalBlurInitializer() {
  useEffect(() => {
    // Menambahkan fungsi handleGlobalBlur ke window
    window.handleGlobalBlur = (isActive) => {
      // Jika isActive true, tambahkan class 'blur-active' ke body
      // Jika isActive false, hapus class 'blur-active' dari body
      if (isActive) {
        document.body.classList.add('blur-active');
      } else {
        document.body.classList.remove('blur-active');
      }
    };

    // Cleanup function untuk menghapus fungsi dari window saat komponen unmount
    return () => {
      delete window.handleGlobalBlur;
    };
  }, []);

  // Komponen ini tidak merender apapun ke DOM
  return null;
}