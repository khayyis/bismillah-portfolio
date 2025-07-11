'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectConnectionSpeed, detectDeviceInfo } from '../utils/connectionDetector';

// Buat context untuk informasi koneksi dan perangkat
export const ConnectionContext = createContext(null);

// Provider untuk informasi koneksi dan perangkat
export function ConnectionProvider({ children }) {
  // State untuk menyimpan informasi koneksi dan perangkat
  const [connection, setConnection] = useState(null);
  const [device, setDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Deteksi informasi koneksi dan perangkat saat komponen dimuat
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Gunakan setTimeout untuk memastikan kode berjalan di client-side
      const timer = setTimeout(() => {
        setConnection(detectConnectionSpeed());
        setDevice(detectDeviceInfo());
        setIsLoading(false);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Fungsi untuk mendapatkan durasi loading yang sesuai berdasarkan koneksi dan perangkat
  const getAdaptiveLoadingDuration = () => {
    // Durasi default (dalam ms)
    let duration = 2000;
    
    if (!connection || !device) return duration;
    
    // Sesuaikan durasi berdasarkan kecepatan koneksi
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      duration = 3000; // Koneksi lambat, animasi lebih lama
    } else if (connection.effectiveType === '3g') {
      duration = 2500;
    } else if (connection.effectiveType === '4g') {
      duration = 2000;
    }
    
    // Sesuaikan berdasarkan perangkat
    if (device.isLowEndDevice) {
      duration += 500; // Tambahkan waktu untuk perangkat low-end
    }
    
    // Kurangi durasi jika pengguna memilih reduced motion
    if (device.isReducedMotion) {
      duration = Math.min(duration, 1500); // Batasi maksimum 1.5 detik untuk reduced motion
    }
    
    return duration;
  };
  
  // Fungsi untuk mendapatkan teks loading yang sesuai berdasarkan koneksi
  const getAdaptiveLoadingText = (defaultText = "Memuat...") => {
    if (!connection) return defaultText;
    
    if (connection.saveData) {
      return "Memuat (mode hemat data)...";
    }
    
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return "Memuat dengan koneksi lambat...";
    }
    
    return defaultText;
  };
  
  // Fungsi untuk mendapatkan konfigurasi loading yang adaptif
  const getAdaptiveLoadingConfig = (customText = "Memuat...") => {
    return {
      duration: getAdaptiveLoadingDuration(),
      text: getAdaptiveLoadingText(customText),
      connection,
      device
    };
  };
  
  // Fungsi untuk menentukan apakah harus menggunakan animasi ringan
  const shouldUseLightAnimations = () => {
    if (!connection || !device) return false;
    
    // Gunakan animasi ringan jika:
    // 1. Koneksi lambat (2g atau slow-2g)
    // 2. Mode hemat data aktif
    // 3. Perangkat low-end
    // 4. Pengguna memilih reduced motion
    return (
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      connection.saveData ||
      device.isLowEndDevice ||
      device.isReducedMotion
    );
  };
  
  // Nilai yang akan disediakan oleh context
  const value = {
    connection,
    device,
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