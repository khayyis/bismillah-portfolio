'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useConnection } from '../utils/ConnectionProvider';
import './ElegantLoading.css';

/**
 * ElegantLoading - Komponen loading elegan dengan CSS murni
 * 
 * Komponen ini menampilkan animasi loading saat navigasi atau saat halaman pertama kali dimuat.
 * Menggunakan CSS murni untuk animasi tanpa GSAP.
 */
export default function ElegantLoading({ isNavigating, isFirstLoad }) {
  // State untuk tracking progress dan visibilitas
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  // Ref untuk animasi
  const animationRef = useRef(null);
  
  // Gunakan context koneksi
  const { getAdaptiveLoadingConfig, shouldUseLightAnimations } = useConnection();
  
  // Dapatkan konfigurasi loading yang adaptif
  const loadingConfig = getAdaptiveLoadingConfig("Memuat...");
  
  // Tentukan apakah harus menggunakan animasi ringan
  const useLightAnimations = shouldUseLightAnimations();
  
  // Kelas CSS berdasarkan koneksi dan perangkat
  const connectionClass = loadingConfig.connection?.saveData 
    ? 'data-saver-mode' 
    : loadingConfig.connection?.effectiveType === 'slow-2g' || loadingConfig.connection?.effectiveType === '2g'
      ? 'slow-connection'
      : '';
  
  const deviceClass = loadingConfig.device?.isLowEndDevice 
    ? 'low-end-device' 
    : '';
  
  const motionClass = loadingConfig.device?.isReducedMotion 
    ? 'reduced-motion' 
    : '';
  
  // Kelas CSS gabungan
  const combinedClasses = [
    'elegant-loading',
    isExiting ? 'exit-animation' : 'enter-animation',
    connectionClass,
    deviceClass,
    motionClass,
    useLightAnimations ? 'light-animations' : ''
  ].filter(Boolean).join(' ');
  
  // Efek untuk mengelola visibilitas loading
  useEffect(() => {
    let exitTimer = null;
    let fallbackTimer = null;
    
    if (isNavigating || isFirstLoad) {
      // Reset progress dan tampilkan konten
      setProgress(0);
      setIsExiting(false);
      setShowContent(true);
    } else {
      // Jika tidak sedang navigasi, mulai animasi keluar
      if (showContent) {
        setIsExiting(true);
        
        // Gunakan setTimeout untuk menunggu animasi keluar selesai
        exitTimer = setTimeout(() => {
          setShowContent(false);
        }, 800); // Sesuaikan dengan durasi animasi CSS
      }
    }
    
    // Fallback: paksa sembunyikan loading setelah 5 detik jika masih tampil
    // Ini memastikan loading tidak stuck selamanya
    if (showContent && !isNavigating && !isFirstLoad) {
      fallbackTimer = setTimeout(() => {
        setShowContent(false);
        setIsExiting(false);
      }, 1500);
    }
    
    return () => {
      if (exitTimer) clearTimeout(exitTimer);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [isNavigating, isFirstLoad, showContent]);
  
  // Efek untuk mengelola progress bar
  useEffect(() => {
    // Fungsi untuk menghitung increment berdasarkan progress saat ini
    const calculateIncrement = (currentProgress) => {
      // Percepat progress di akhir untuk pengalaman yang lebih responsif
      if (currentProgress < 30) return 0.3;
      if (currentProgress < 60) return 0.5;
      if (currentProgress < 80) return 1.0;
      if (currentProgress < 90) return 1.5;
      return 2.0;
    };
    
    if (isNavigating || isFirstLoad) {
      // Bersihkan animasi sebelumnya jika ada
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Reset progress ke 0
      setProgress(0);
      
      // Tentukan durasi berdasarkan konfigurasi
      const duration = loadingConfig.duration || 3000; // Durasi default 3000ms
      
      // Gunakan requestAnimationFrame untuk animasi yang lebih halus
      let lastTimestamp = null;
      let accumulatedTime = 0;
      const targetInterval = 1000 / 30; // Target 30 fps untuk update progress
      
      const updateProgress = (timestamp) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        
        accumulatedTime += deltaTime;
        
        // Update progress pada interval yang ditentukan
        if (accumulatedTime >= targetInterval) {
          accumulatedTime = 0;
          
          setProgress(prev => {
            const increment = calculateIncrement(prev) * (deltaTime / 16.67); // Normalisasi berdasarkan 60fps
            const nextProgress = prev + increment;
            
            // Batasi progress maksimum ke 99% sampai navigasi selesai
            return nextProgress >= 100 ? 99 : nextProgress;
          });
        }
        
        // Lanjutkan animasi jika masih navigasi
        if (isNavigating || isFirstLoad) {
          animationRef.current = requestAnimationFrame(updateProgress);
        }
      };
      
      // Mulai animasi dengan requestAnimationFrame
      animationRef.current = requestAnimationFrame(updateProgress);
      
      return () => {
        // Bersihkan animasi saat unmount
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else if (progress < 100) {
      // Navigasi selesai, selesaikan progress ke 100%
      setProgress(100);
    }
  }, [isNavigating, isFirstLoad, loadingConfig.duration, progress]);
  
  // Jika tidak perlu menampilkan konten loading, jangan render apa-apa
  if (!showContent) {
    return null;
  }
  
  return (
    <div className={combinedClasses}>
      <div className="elegant-overlay">
        <div className="elegant-content">
          <div className="elegant-loading-text">{loadingConfig.text}</div>
          
          <div className="elegant-progress-container">
            <div className="elegant-progress-track">
              <div 
                className="elegant-progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
              <div className="elegant-progress-glow"></div>
            </div>
          </div>
          
          {/* Teks logo dihapus sesuai permintaan, hanya menampilkan loading dan progress bar */}
          
          <div className="elegant-connection-status">
            {loadingConfig.connection?.saveData && 'Mode Hemat Data Aktif'}
            {loadingConfig.device?.isLowEndDevice && ' • Mode Performa'}
          </div>
        </div>
      </div>
    </div>
  );
}