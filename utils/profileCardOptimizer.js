/**
 * Utilitas untuk mengoptimalkan komponen ProfileCard
 */

// Fungsi untuk memvalidasi URL avatar
export function isValidAvatarUrl(url) {
  if (!url) return false;
  
  // Cek apakah URL adalah string
  if (typeof url !== 'string') return false;
  
  // Cek apakah URL kosong setelah trim
  if (url.trim() === '') return false;
  
  // Cek apakah URL adalah URL gambar yang valid
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];
  const hasValidExtension = imageExtensions.some(ext => 
    url.toLowerCase().endsWith(ext)
  );
  
  // Cek apakah URL adalah URL absolut atau relatif yang valid
  const isAbsoluteUrl = /^(https?:\/\/|\/)/.test(url) || /^[A-Za-z]:\\/.test(url);
  
  return hasValidExtension || isAbsoluteUrl;
}

// Fungsi untuk preload avatar dengan timeout dan retry
export function preloadAvatar(url, onSuccess, onError, maxRetries = 2) {
  if (!isValidAvatarUrl(url)) {
    onError(new Error('URL avatar tidak valid'));
    return { cancel: () => {} };
  }
  
  let retryCount = 0;
  let timeoutId;
  let img;
  
  const load = () => {
    // Bersihkan timeout sebelumnya jika ada
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Buat image baru
    img = new Image();
    
    // Set timeout untuk loading
    timeoutId = setTimeout(() => {
      if (retryCount < maxRetries) {
        console.warn(`Avatar loading timeout: ${url}, retrying (${retryCount + 1}/${maxRetries})`);
        retryCount++;
        load(); // Retry
      } else {
        console.error(`Avatar loading failed after ${maxRetries} retries: ${url}`);
        onError(new Error(`Loading timeout after ${maxRetries} retries`));
      }
    }, 5000); // 5 detik timeout
    
    // Event handlers
    img.onload = () => {
      clearTimeout(timeoutId);
      onSuccess(img);
    };
    
    img.onerror = () => {
      clearTimeout(timeoutId);
      
      if (retryCount < maxRetries) {
        console.warn(`Avatar loading error: ${url}, retrying (${retryCount + 1}/${maxRetries})`);
        retryCount++;
        load(); // Retry
      } else {
        console.error(`Avatar loading failed after ${maxRetries} retries: ${url}`);
        onError(new Error(`Loading failed after ${maxRetries} retries`));
      }
    };
    
    // Mulai loading
    img.src = url;
  };
  
  // Mulai proses loading
  load();
  
  // Return fungsi untuk membatalkan loading
  return {
    cancel: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (img) {
        img.onload = null;
        img.onerror = null;
        img.src = ''; // Cancel loading
      }
    }
  };
}

// Fungsi untuk mengoptimalkan animasi dengan throttling
export function createThrottledAnimationHandler(handler, fps = 60) {
  const interval = 1000 / fps;
  let lastTime = 0;
  let requestId = null;
  
  return (event) => {
    // Store event values since the event object will be nullified
    const clientX = event.clientX;
    const clientY = event.clientY;
    
    // Cancel any pending animation frame
    if (requestId) {
      cancelAnimationFrame(requestId);
    }
    
    // Schedule new animation frame
    requestId = requestAnimationFrame((timestamp) => {
      if (timestamp - lastTime >= interval) {
        lastTime = timestamp;
        handler({
          clientX,
          clientY
        });
      }
    });
  };
}

// Fungsi untuk mengoptimalkan gradient berdasarkan preferensi pengguna
export function getOptimizedGradient(defaultGradient, reducedMotion = false) {
  // Cek apakah pengguna memilih reduced motion
  if (reducedMotion) {
    // Return gradient statis tanpa animasi
    return defaultGradient.replace(/\blinear-gradient\b/, 'linear-gradient');
  }
  
  return defaultGradient;
}

// Fungsi untuk mengoptimalkan performa berdasarkan device
export function getProfileCardPerformanceConfig(deviceInfo) {
  const config = {
    enableTilt: true,
    enableGlow: true,
    enableAnimation: true,
    animationFPS: 60,
    maxRetries: 2,
    loadTimeout: 5000,
  };
  
  // Jika device info tersedia, sesuaikan konfigurasi
  if (deviceInfo) {
    // Untuk perangkat low-end, kurangi efek visual
    if (deviceInfo.isLowEndDevice) {
      config.enableTilt = false;
      config.enableGlow = false;
      config.animationFPS = 30;
    }
    
    // Untuk koneksi lambat, kurangi timeout dan retry
    if (deviceInfo.connectionType === 'slow-2g' || deviceInfo.connectionType === '2g') {
      config.maxRetries = 1;
      config.loadTimeout = 10000; // 10 detik untuk koneksi lambat
    }
    
    // Untuk mode hemat baterai, matikan animasi
    if (deviceInfo.isBatterySaving) {
      config.enableAnimation = false;
      config.enableTilt = false;
      config.enableGlow = false;
    }
  }
  
  return config;
}