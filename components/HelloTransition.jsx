'use client';

import { useEffect, useState } from 'react';
import './HelloTransitionEffect.css';
import './AdaptiveLoading.css';
import { detectConnectionSpeed, detectDeviceInfo } from '@/utils/connectionDetector';

export default function HelloTransition({
  isNavigating,
  onAnimationComplete,
  customText = null,
  isPageLoading = false
}) {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [connectionInfo, setConnectionInfo] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);

  // Deteksi informasi koneksi dan perangkat saat komponen dimuat
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Gunakan setTimeout untuk memastikan kode berjalan di client-side
      setTimeout(() => {
        setConnectionInfo(detectConnectionSpeed());
        setDeviceInfo(detectDeviceInfo());
      }, 0);
    }
  }, []);

  // Reset state ketika navigasi dimulai
  useEffect(() => {
    if (isNavigating) {
      setIsActive(true);
      setProgress(0);
      setIsComplete(false);

      // Simulasi progress loading dengan percepatan di awal dan perlambatan di akhir
      const startTime = Date.now();

      // Sesuaikan durasi berdasarkan koneksi dan perangkat
      let duration = isPageLoading ? 2000 : 1000; // Durasi default

      // Jika informasi koneksi tersedia, sesuaikan durasi
      if (connectionInfo) {
        if (connectionInfo.effectiveType === 'slow-2g' || connectionInfo.effectiveType === '2g') {
          duration = isPageLoading ? 3000 : 1500;
        } else if (connectionInfo.effectiveType === '3g') {
          duration = isPageLoading ? 2500 : 1200;
        }

        // Jika mode hemat data aktif, percepat animasi
        if (connectionInfo.saveData) {
          duration = Math.max(duration * 0.7, 800);
        }
      }

      // Jika informasi perangkat tersedia, sesuaikan durasi
      if (deviceInfo) {
        // Untuk perangkat low-end, tambahkan waktu
        if (deviceInfo.isLowEndDevice) {
          duration += 500;
        }

        // Untuk preferensi reduced motion, kurangi durasi
        if (deviceInfo.isReducedMotion) {
          duration = Math.min(duration, isPageLoading ? 1500 : 800);
        }
      }

      // Fungsi easing untuk membuat animasi lebih alami
      const easeOutQuart = (x) => {
        return 1 - Math.pow(1 - x, 4);
      };

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const rawProgress = Math.min(1, elapsed / duration);

        // Aplikasikan fungsi easing untuk progress yang lebih alami
        const easedProgress = easeOutQuart(rawProgress) * 100;

        setProgress(easedProgress);

        if (rawProgress < 1) {
          requestAnimationFrame(updateProgress);
        } else {
          // Tambahkan sedikit delay sebelum menandai sebagai selesai
          setTimeout(() => {
            setIsComplete(true);
          }, 200);
        }
      };

      requestAnimationFrame(updateProgress);
    }
  }, [isNavigating, isPageLoading, connectionInfo, deviceInfo]);

  // Tangani penyelesaian animasi
  useEffect(() => {
    if (isComplete && isActive && !isPageLoading) {
      // Tambahkan delay untuk animasi fade out
      const timer = setTimeout(() => {
        // Panggil onAnimationComplete setelah animasi fade out selesai
        const fadeOutTimer = setTimeout(() => {
          setIsActive(false);
          onAnimationComplete && onAnimationComplete();
        }, 400); // Durasi animasi fade out

        return () => clearTimeout(fadeOutTimer);
      }, 200); // Delay sebelum memulai fade out

      return () => clearTimeout(timer);
    }
  }, [isComplete, isActive, onAnimationComplete, isPageLoading]);

  if (!isActive) return null;

  // Tentukan teks yang akan ditampilkan - diganti dengan string kosong
  const displayText = customText || '';

  // Tentukan kelas CSS berdasarkan informasi koneksi dan perangkat
  const getAdaptiveClasses = () => {
    const classes = [];

    // Kelas dasar
    classes.push(isComplete && !isPageLoading ? 'hello-fade-out' : 'hello-fade-in');

    // Tambahkan kelas berdasarkan informasi koneksi
    if (connectionInfo) {
      // Untuk koneksi lambat
      if (connectionInfo.effectiveType === 'slow-2g' || connectionInfo.effectiveType === '2g') {
        classes.push('slow-connection');
      }

      // Untuk mode hemat data
      if (connectionInfo.saveData) {
        classes.push('data-saver');
      }
    }

    // Tambahkan kelas berdasarkan informasi perangkat
    if (deviceInfo) {
      // Untuk perangkat low-end
      if (deviceInfo.isLowEndDevice) {
        classes.push('low-end-device');
      }
    }

    return classes.join(' ');
  };

  // Tentukan teks status koneksi - diganti dengan teks portofolio
  const getConnectionStatusText = () => {
    // Teks logo dihapus sesuai permintaan, hanya menampilkan loading dan progress bar
    return "";
  };

  return (
    <div className={`hello-transition ${getAdaptiveClasses()}`}>
      <div className="hello-transition-content">
        <div className="hello-logo hello-logo-reveal">
          <div className="hello-logo-circle hello-pulse"></div>
          <div className="hello-logo-text">{displayText.charAt(0)}</div>
        </div>
        {customText && (
          <div className="hello-loading-text hello-logo-reveal" style={{ animationDelay: '0.1s' }}>
            {customText}
          </div>
        )}
        <div className="hello-progress hello-logo-reveal" style={{ animationDelay: '0.2s' }}>
          <div
            className="hello-progress-bar"
            style={{
              width: `${progress}%`,
              transition: progress < 10 ? 'none' : 'width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          ></div>
        </div>

        {/* Tampilkan teks portofolio */}
        <div className="connection-status">
          {getConnectionStatusText()}
        </div>
      </div>
    </div>
  );
}