'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LoadingIndicator from './LoadingIndicator';
import { detectConnectionSpeed, detectDeviceInfo } from '@/utils/connectionDetector';
import './LoadingImage.css';

/**
 * Komponen LoadingImage yang menampilkan indikator loading saat gambar sedang dimuat
 * dan menangani error loading dengan lebih baik
 */
const LoadingImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'empty',
  sizes = '100vw',
  style = {},
  fallbackSrc = '/images/Dalam-Tahap-Pengembangan.jpeg',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [connectionInfo, setConnectionInfo] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [shouldUseBlurPlaceholder, setShouldUseBlurPlaceholder] = useState(false);

  // Deteksi informasi koneksi dan perangkat saat komponen dimuat
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Gunakan setTimeout untuk memastikan kode berjalan di client-side
      setTimeout(() => {
        const connection = detectConnectionSpeed();
        const device = detectDeviceInfo();
        
        setConnectionInfo(connection);
        setDeviceInfo(device);
        
        // Gunakan blur placeholder untuk koneksi lambat atau mode hemat data
        if (
          connection.effectiveType === 'slow-2g' || 
          connection.effectiveType === '2g' ||
          connection.saveData
        ) {
          setShouldUseBlurPlaceholder(true);
        }
      }, 0);
    }
  }, []);

  // Reset state saat src berubah
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setImageSrc(src);
  }, [src]);

  // Handler saat gambar berhasil dimuat
  const handleLoad = (e) => {
    setIsLoading(false);
    setHasError(false);
    onLoad && onLoad(e);
  };

  // Handler saat gambar gagal dimuat
  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    
    // Coba gunakan URL absolut jika URL relatif gagal dimuat
    if (imageSrc === src && !src.startsWith('http') && !src.startsWith('/')) {
      const absoluteUrl = `${window.location.origin}/${src}`;
      setImageSrc(absoluteUrl);
    } else if (imageSrc !== fallbackSrc) {
      // Jika masih gagal, gunakan fallback image
      setImageSrc(fallbackSrc);
    }
    
    onError && onError(e);
  };

  // Tentukan kelas CSS berdasarkan state dan props
  const getImageClasses = () => {
    const classes = ['loading-image'];
    
    if (isLoading) {
      classes.push('loading-image-loading');
    }
    
    if (hasError) {
      classes.push('loading-image-error');
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  // Tentukan placeholder berdasarkan koneksi dan preferensi
  const getPlaceholderType = () => {
    if (shouldUseBlurPlaceholder) {
      return 'blur';
    }
    
    return placeholder;
  };

  // Tentukan kualitas gambar berdasarkan koneksi dan perangkat
  const getAdaptiveQuality = () => {
    if (!connectionInfo) return quality;
    
    // Kurangi kualitas untuk koneksi lambat atau mode hemat data
    if (connectionInfo.saveData) {
      return Math.min(quality, 60);
    }
    
    if (connectionInfo.effectiveType === 'slow-2g' || connectionInfo.effectiveType === '2g') {
      return Math.min(quality, 65);
    }
    
    if (connectionInfo.effectiveType === '3g') {
      return Math.min(quality, 75);
    }
    
    return quality;
  };

  return (
    <div className="loading-image-container">
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={getImageClasses()}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
        }}
        priority={priority}
        quality={getAdaptiveQuality()}
        placeholder={getPlaceholderType()}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      
      {isLoading && (
        <div className="loading-image-indicator">
          <LoadingIndicator 
            size="medium" 
            color="primary" 
            type={deviceInfo?.isReducedMotion ? 'dots' : 'spinner'}
          />
        </div>
      )}
      
      {hasError && imageSrc === fallbackSrc && (
        <div className="loading-image-error-message">
          <span>Gagal memuat gambar</span>
        </div>
      )}
    </div>
  );
};

export default LoadingImage;