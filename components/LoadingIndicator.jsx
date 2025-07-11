'use client';

import React, { useEffect, useState } from 'react';
import { detectDeviceInfo } from '@/utils/connectionDetector';
import './LoadingIndicator.css';

/**
 * Komponen LoadingIndicator yang ringan untuk digunakan pada elemen-elemen kecil
 * seperti tombol atau form yang sedang loading
 */
const LoadingIndicator = ({
  size = 'medium', // 'small', 'medium', 'large'
  color = 'primary', // 'primary', 'secondary', 'white'
  type = 'spinner', // 'spinner', 'dots', 'pulse'
  text = null,
  fullWidth = false,
  className = '',
}) => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [adaptiveType, setAdaptiveType] = useState(type);

  // Deteksi informasi perangkat saat komponen dimuat
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Gunakan setTimeout untuk memastikan kode berjalan di client-side
      setTimeout(() => {
        const info = detectDeviceInfo();
        setDeviceInfo(info);
        
        // Sesuaikan tipe animasi berdasarkan preferensi reduced motion
        if (info.isReducedMotion && type === 'spinner') {
          setAdaptiveType('dots'); // Gunakan dots untuk reduced motion karena lebih sederhana
        } else if (info.isLowEndDevice && type === 'pulse') {
          setAdaptiveType('spinner'); // Gunakan spinner untuk perangkat low-end karena lebih ringan
        } else {
          setAdaptiveType(type);
        }
      }, 0);
    }
  }, [type]);

  // Tentukan kelas CSS berdasarkan props dan informasi perangkat
  const getClasses = () => {
    const classes = ['loading-indicator'];
    
    // Tambahkan kelas ukuran
    classes.push(`loading-indicator-${size}`);
    
    // Tambahkan kelas warna
    classes.push(`loading-indicator-${color}`);
    
    // Tambahkan kelas tipe
    classes.push(`loading-indicator-${adaptiveType}`);
    
    // Tambahkan kelas full width jika diperlukan
    if (fullWidth) {
      classes.push('loading-indicator-full-width');
    }
    
    // Tambahkan kelas berdasarkan informasi perangkat
    if (deviceInfo) {
      if (deviceInfo.isReducedMotion) {
        classes.push('loading-indicator-reduced-motion');
      }
      
      if (deviceInfo.isLowEndDevice) {
        classes.push('loading-indicator-low-end');
      }
    }
    
    // Tambahkan kelas kustom
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  return (
    <div className={getClasses()}>
      <div className="loading-indicator-container">
        {adaptiveType === 'spinner' && (
          <div className="loading-spinner"></div>
        )}
        
        {adaptiveType === 'dots' && (
          <div className="loading-dots">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        )}
        
        {adaptiveType === 'pulse' && (
          <div className="loading-pulse"></div>
        )}
        
        {text && (
          <div className="loading-indicator-text">{text}</div>
        )}
      </div>
    </div>
  );
};

export default LoadingIndicator;