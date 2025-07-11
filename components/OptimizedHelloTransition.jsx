'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useConnection } from '../utils/ConnectionProvider';
import AnimatedContent from './AnimatedContent';
import AnimatedExit from './AnimatedExit';
import { gsap } from 'gsap';
import './HelloTransitionEffect.css';
import './AdaptiveLoading.css';

/**
 * OptimizedHelloTransition - Versi yang dioptimalkan dari HelloTransition
 * 
 * Komponen ini menampilkan animasi loading saat navigasi atau saat halaman pertama kali dimuat.
 * Animasi akan muncul dengan efek fade in dan menghilang dengan efek fade out setelah konten dimuat.
 */
export default function OptimizedHelloTransition({ isNavigating, isFirstLoad }) {
  // State untuk tracking progress dan visibilitas
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  // Ref untuk interval
  const progressIntervalRef = useRef(null);
  
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
    'hello-transition',
    isExiting ? 'hello-fade-out' : '',
    connectionClass,
    deviceClass,
    motionClass,
    useLightAnimations ? 'light-animations' : ''
  ].filter(Boolean).join(' ');
  
  // Efek untuk mengelola visibilitas loading dengan performa yang lebih baik
  useEffect(() => {
    // Referensi ke elemen yang akan dianimasikan
    let animationElements = null;
    
    if (isNavigating || isFirstLoad) {
      // Reset progress dan tampilkan konten dengan animasi masuk
      setProgress(0);
      setIsExiting(false);
      setShowContent(true);
      
      // Gunakan setTimeout untuk memastikan DOM sudah dirender
      const animationTimer = setTimeout(() => {
        // Animasi masuk dengan GSAP - gunakan selector yang lebih spesifik
        animationElements = document.querySelectorAll('.hello-transition:not(.hello-fade-out)');
        if (animationElements.length > 0) {
          gsap.fromTo(animationElements, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          );
        }
      }, 10); // Delay kecil untuk memastikan DOM sudah dirender
      
      return () => clearTimeout(animationTimer);
    } else {
      // Jika tidak sedang navigasi, mulai animasi keluar
      if (showContent) {
        setIsExiting(true);
        
        // Gunakan setTimeout untuk memastikan DOM sudah dirender
        const exitTimer = setTimeout(() => {
          // Animasi keluar dengan GSAP - gunakan selector yang lebih spesifik
          animationElements = document.querySelectorAll('.hello-transition:not(.hello-fade-out)');
          if (animationElements.length > 0) {
            gsap.to(animationElements, {
              opacity: 0, 
              y: -20, 
              duration: 0.5, 
              ease: 'power2.in',
              onComplete: () => {
                setShowContent(false);
              }
            });
          } else {
            // Jika tidak ada elemen yang ditemukan, langsung set showContent ke false
            setShowContent(false);
          }
        }, 10); // Delay kecil untuk memastikan DOM sudah dirender
        
        return () => clearTimeout(exitTimer);
      }
    }
  }, [isNavigating, isFirstLoad]);
  
  // Efek untuk mengelola progress bar dengan performa yang lebih baik
  useEffect(() => {
    // Fungsi untuk membersihkan interval
    const cleanupInterval = () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
    
    // Fungsi untuk menghitung increment berdasarkan progress saat ini
    const calculateIncrement = (currentProgress) => {
      // Percepat progress di akhir untuk pengalaman yang lebih responsif
      // Gunakan kurva yang lebih halus
      if (currentProgress < 30) return 0.3;
      if (currentProgress < 60) return 0.5;
      if (currentProgress < 80) return 1.0;
      if (currentProgress < 90) return 1.5;
      return 2.0;
    };
    
    if (isNavigating || isFirstLoad) {
      // Bersihkan interval sebelumnya jika ada
      cleanupInterval();
      
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
          requestAnimationFrame(updateProgress);
        }
      };
      
      // Mulai animasi dengan requestAnimationFrame
      const animationId = requestAnimationFrame(updateProgress);
      
      return () => {
        // Bersihkan animasi saat unmount
        cancelAnimationFrame(animationId);
        cleanupInterval();
      };
    } else if (progress < 100) {
      // Navigasi selesai, selesaikan progress ke 100%
      setProgress(100);
      cleanupInterval();
    }
  }, [isNavigating, isFirstLoad, loadingConfig.duration, progress]);
  
  // Jika tidak perlu menampilkan konten loading, jangan render apa-apa
  if (!showContent) {
    return null;
  }
  
  return (
    <AnimatedExit
      isActive={isNavigating || isFirstLoad}
      distance={100}
      direction="vertical"
      reverse={false}
      duration={0.8}
      ease="power3.out"
      finalOpacity={0}
      animateOpacity={true}
      scale={0.95}
      delay={0}
    >
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={0.8}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity={true}
        scale={1.05}
        threshold={0}
        delay={0}
        useScrollTrigger={false}
        triggerOnLoad={true}
      >
        <div className={combinedClasses}>
          <div className="hello-overlay">
            <div className="hello-content">
              <AnimatedContent
                distance={30}
                direction="vertical"
                reverse={false}
                duration={0.8}
                ease="power2.out"
                initialOpacity={0}
                animateOpacity={true}
                scale={1}
                threshold={0}
                delay={0}
                useScrollTrigger={false}
                triggerOnLoad={true}
              >
                <div className="hello-loading-text">{loadingConfig.text}</div>
              </AnimatedContent>
              
              {/* Teks logo dihapus sesuai permintaan, hanya menampilkan loading dan progress bar */}
              
              <AnimatedContent
                distance={50}
                direction="horizontal"
                reverse={true}
                duration={1}
                ease="bounce.out"
                initialOpacity={0.2}
                animateOpacity={true}
                scale={1.1}
                threshold={0}
                delay={0}
                useScrollTrigger={false}
                triggerOnLoad={true}
              >
                <div className="hello-progress-container">
                  <div className="hello-progress-track">
                    <div 
                      className="hello-progress-bar"
                      style={{ width: `${progress}%` }}
                    ></div>
                    <div className="hello-progress-glow"></div>
                  </div>
                </div>
              </AnimatedContent>
              
              <AnimatedContent
                distance={40}
                direction="vertical"
                reverse={false}
                duration={0.7}
                ease="power2.out"
                initialOpacity={0}
                animateOpacity={true}
                scale={1}
                threshold={0}
                delay={0}
                useScrollTrigger={false}
                triggerOnLoad={true}
              >
                <div className="hello-connection-status">
                  {loadingConfig.connection?.saveData && 'Mode Hemat Data Aktif'}
                  {loadingConfig.device?.isLowEndDevice && ' • Mode Performa'}
                </div>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </AnimatedContent>
    </AnimatedExit>
  );
}