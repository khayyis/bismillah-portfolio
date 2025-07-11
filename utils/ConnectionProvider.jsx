'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectConnectionSpeed, detectDeviceInfo } from './connectionDetector';

// Buat context untuk informasi koneksi dan perangkat
const ConnectionContext = createContext({
  connectionInfo: { effectiveType: '4g', saveData: false },
  deviceInfo: { isLowEndDevice: false, isReducedMotion: false },
  isLoading: true,
  getAdaptiveLoadingDuration: () => 2000,
  getAdaptiveLoadingText: (defaultText = "Memuat...") => defaultText,
  getAdaptiveLoadingConfig: (customText = "Memuat...") => ({
    duration: 2000,
    text: customText,
    connection: { effectiveType: '4g', saveData: false },
    device: { isLowEndDevice: false, isReducedMotion: false },
  }),
  shouldUseLightAnimations: () => false,
});

// Hook untuk menggunakan context
export function useConnection() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('useConnection harus digunakan di dalam ConnectionProvider');
  }
  return context;
}

// Provider untuk informasi koneksi dan perangkat
export function ConnectionProvider({ children }) {
  // State untuk menyimpan informasi koneksi dan perangkat
  const [connectionInfo, setConnectionInfo] = useState({ effectiveType: '4g', saveData: false });
  const [deviceInfo, setDeviceInfo] = useState({ isLowEndDevice: false, isReducedMotion: false });
  const [isLoading, setIsLoading] = useState(true);
  
  // Deteksi informasi koneksi dan perangkat saat komponen dimuat
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Gunakan setTimeout untuk memastikan kode berjalan di client-side
      const timer = setTimeout(() => {
        setConnectionInfo(detectConnectionSpeed());
        setDeviceInfo(detectDeviceInfo());
        setIsLoading(false);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Fungsi untuk mendapatkan durasi loading yang sesuai berdasarkan koneksi dan perangkat
  const getAdaptiveLoadingDuration = () => {
    // Durasi default (dalam ms)
    let duration = 2000;
    
    if (!connectionInfo || !deviceInfo) return duration;
    
    // Sesuaikan durasi berdasarkan kecepatan koneksi
    if (connectionInfo.effectiveType === 'slow-2g' || connectionInfo.effectiveType === '2g') {
      duration = 3000; // Koneksi lambat, animasi lebih lama
    } else if (connectionInfo.effectiveType === '3g') {
      duration = 2500;
    } else if (connectionInfo.effectiveType === '4g') {
      duration = 2000;
    }
    
    // Sesuaikan berdasarkan perangkat
    if (deviceInfo.isLowEndDevice) {
      duration += 500; // Tambahkan waktu untuk perangkat low-end
    }
    
    // Kurangi durasi jika pengguna memilih reduced motion
    if (deviceInfo.isReducedMotion) {
      duration = Math.min(duration, 1500); // Batasi maksimum 1.5 detik untuk reduced motion
    }
    
    return duration;
  };
  
  // Fungsi untuk mendapatkan teks loading yang sesuai berdasarkan koneksi
  const getAdaptiveLoadingText = (defaultText = "Memuat...") => {
    if (!connectionInfo) return defaultText;
    
    if (connectionInfo.saveData) {
      return "Memuat (mode hemat data)...";
    }
    
    if (connectionInfo.effectiveType === 'slow-2g' || connectionInfo.effectiveType === '2g') {
      return "Memuat dengan koneksi lambat...";
    }
    
    return defaultText;
  };
  
  // Fungsi untuk mendapatkan konfigurasi loading yang adaptif
  const getAdaptiveLoadingConfig = (customText = "Memuat...") => {
    return {
      duration: getAdaptiveLoadingDuration(),
      text: getAdaptiveLoadingText(customText),
      connection: connectionInfo,
      device: deviceInfo
    };
  };
  
  // Fungsi untuk menentukan apakah harus menggunakan animasi ringan
  const shouldUseLightAnimations = () => {
    if (!connectionInfo || !deviceInfo) return false;
    
    // Gunakan animasi ringan jika:
    // 1. Koneksi lambat (2g atau slow-2g)
    // 2. Mode hemat data aktif
    // 3. Perangkat low-end
    // 4. Pengguna memilih reduced motion
    return (
      connectionInfo.effectiveType === 'slow-2g' ||
      connectionInfo.effectiveType === '2g' ||
      connectionInfo.saveData ||
      deviceInfo.isLowEndDevice ||
      deviceInfo.isReducedMotion
    );
  };
  
  // Nilai yang akan disediakan oleh context
  const value = {
    connectionInfo,
    deviceInfo,
    isLoading,
    getAdaptiveLoadingDuration,
    getAdaptiveLoadingText,
    getAdaptiveLoadingConfig,
    shouldUseLightAnimations
  };
  
  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
}