'use client';

/**
 * Utility untuk mendeteksi kecepatan koneksi dan informasi perangkat pengguna
 * untuk menyesuaikan pengalaman loading
 */

// Deteksi kecepatan koneksi
export function detectConnectionSpeed() {
  if (typeof navigator === 'undefined' || !navigator.connection) {
    return {
      effectiveType: 'unknown',
      downlink: null,
      rtt: null,
      saveData: false,
      type: 'unknown'
    };
  }

  const connection = navigator.connection;
  
  return {
    // 'slow-2g', '2g', '3g', '4g', atau 'unknown'
    effectiveType: connection.effectiveType || 'unknown',
    // Bandwidth dalam Mbps
    downlink: connection.downlink,
    // Round-trip time dalam ms
    rtt: connection.rtt,
    // Apakah mode hemat data aktif
    saveData: connection.saveData || false,
    // Tipe koneksi: 'bluetooth', 'cellular', 'ethernet', 'wifi', 'wimax', 'none', 'other', 'unknown'
    type: connection.type || 'unknown'
  };
}

// Deteksi informasi perangkat
export function detectDeviceInfo() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      deviceMemory: null,
      hardwareConcurrency: null,
      isLowEndDevice: false,
      isReducedMotion: false
    };
  }

  // Deteksi tipe perangkat berdasarkan user agent dan ukuran layar
  const userAgent = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;
  
  const isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent) || width < 768;
  const isTablet = /ipad|android/i.test(userAgent) && !/mobile/i.test(userAgent) || (width >= 768 && width < 1024);
  const isDesktop = !isMobile && !isTablet;
  
  // Deteksi memori perangkat (hanya tersedia di Chrome)
  const deviceMemory = navigator.deviceMemory || null;
  
  // Deteksi jumlah core CPU (perkiraan performa)
  const hardwareConcurrency = navigator.hardwareConcurrency || null;
  
  // Perkiraan apakah perangkat low-end
  const isLowEndDevice = (
    (deviceMemory !== null && deviceMemory <= 2) || 
    (hardwareConcurrency !== null && hardwareConcurrency <= 2) ||
    (navigator.connection && navigator.connection.saveData)
  );
  
  // Deteksi preferensi reduced motion (aksesibilitas)
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    deviceMemory,
    hardwareConcurrency,
    isLowEndDevice,
    isReducedMotion
  };
}

// Fungsi untuk mendapatkan durasi loading yang sesuai berdasarkan koneksi dan perangkat
export function getAdaptiveLoadingDuration() {
  const connection = detectConnectionSpeed();
  const device = detectDeviceInfo();
  
  // Durasi default (dalam ms)
  let duration = 2000;
  
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
}

// Fungsi untuk mendapatkan teks loading yang sesuai berdasarkan koneksi
export function getAdaptiveLoadingText(defaultText = "Memuat...") {
  const connection = detectConnectionSpeed();
  
  if (connection.saveData) {
    return "Memuat (mode hemat data)...";
  }
  
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    return "Memuat dengan koneksi lambat...";
  }
  
  return defaultText;
}

// Fungsi untuk mendapatkan konfigurasi loading yang adaptif
export function getAdaptiveLoadingConfig(customText = "Memuat...") {
  return {
    duration: getAdaptiveLoadingDuration(),
    text: getAdaptiveLoadingText(customText),
    connection: detectConnectionSpeed(),
    device: detectDeviceInfo()
  };
}