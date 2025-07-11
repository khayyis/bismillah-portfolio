'use client';

import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { ConnectionContext } from './ConnectionProvider';
import {
  normalizeImageUrl,
  isValidImageUrl,
  getOptimizedImageProps,
  isImageInViewport,
  fixBrokenImage
} from '../utils/imageOptimizer';

// Placeholder default
const DEFAULT_PLACEHOLDER = '/images/Dalam-Tahap-Pengembangan.jpeg';

/**
 * Komponen OptimizedImage - Gambar yang dioptimalkan berdasarkan koneksi dan perangkat
 */
export default function OptimizedImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  placeholderSrc = DEFAULT_PLACEHOLDER,
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  onError,
  ...props
}) {
  // Gunakan context koneksi
  const { connection, device } = useContext(ConnectionContext);
  
  // State untuk tracking loading dan error
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Ref untuk elemen gambar
  const imgRef = useRef(null);
  
  // Normalisasi URL gambar
  const normalizedSrc = useMemo(() => {
    return isValidImageUrl(src) ? normalizeImageUrl(src) : '';
  }, [src]);
  
  // Normalisasi URL placeholder
  const normalizedPlaceholder = useMemo(() => {
    return isValidImageUrl(placeholderSrc) 
      ? normalizeImageUrl(placeholderSrc)
      : normalizeImageUrl(DEFAULT_PLACEHOLDER);
  }, [placeholderSrc]);
  
  // Dapatkan props yang dioptimalkan berdasarkan koneksi dan perangkat
  const optimizedProps = useMemo(() => {
    return getOptimizedImageProps(
      normalizedSrc || normalizedPlaceholder,
      connection,
      device
    );
  }, [normalizedSrc, normalizedPlaceholder, connection, device]);
  
  // Cek apakah gambar dalam viewport
  useEffect(() => {
    if (!imgRef.current) return;
    
    const checkVisibility = () => {
      if (imgRef.current && isImageInViewport(imgRef.current, 200)) {
        setIsVisible(true);
      }
    };
    
    // Cek visibilitas saat komponen dimount
    checkVisibility();
    
    // Gunakan throttle untuk mengurangi jumlah pemanggilan fungsi
    let scrollTimeout;
    const throttledCheckVisibility = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          checkVisibility();
          scrollTimeout = null;
        }, 100);
      }
    };
    
    // Tambahkan event listener untuk scroll dan resize
    window.addEventListener('scroll', throttledCheckVisibility, { passive: true });
    window.addEventListener('resize', throttledCheckVisibility, { passive: true });
    
    // Jika priority true, set langsung isVisible ke true
    if (priority) {
      setIsVisible(true);
    }
    
    return () => {
      window.removeEventListener('scroll', throttledCheckVisibility);
      window.removeEventListener('resize', throttledCheckVisibility);
      clearTimeout(scrollTimeout);
    };
  }, [priority]);
  
  // Handler untuk event onLoad
  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };
  
  // Handler untuk event onError
  const handleError = (e) => {
    console.warn(`Error loading image: ${normalizedSrc}`);
    setHasError(true);
    setIsLoading(false);
    
    // Coba perbaiki gambar yang rusak
    if (imgRef.current) {
      fixBrokenImage(imgRef.current, normalizedPlaceholder);
    }
    
    if (onError) onError(e);
  };
  
  // Tentukan kelas CSS berdasarkan state
  const imageClasses = [
    className,
    isLoading ? 'image-loading' : '',
    hasError ? 'image-error' : '',
    !isVisible && !priority ? 'lazy-image' : '',
    isVisible && !isLoading ? 'loaded' : ''
  ].filter(Boolean).join(' ');
  
  // Style inline untuk gambar
  const imageStyle = {
    objectFit,
    objectPosition,
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%',
    ...props.style
  };
  
  return (
    <div 
      className={`relative ${hasError ? 'image-placeholder' : ''}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
        overflow: 'hidden'
      }}
    >
      {/* Placeholder selalu dimuat untuk menghindari layout shift */}
      {isLoading && !hasError && (
        <img
          src={normalizedPlaceholder}
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{ objectFit, objectPosition }}
          aria-hidden="true"
        />
      )}
      
      {/* Gambar utama */}
      // Implementasi lazy loading
      <img 
        ref={imgRef}
        src={isVisible || priority ? (hasError ? normalizedPlaceholder : normalizedSrc) : normalizedPlaceholder}
        alt={alt}
        width={width}
        height={height}
        className={imageClasses}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        suppressHydrationWarning={true}
        {...props}
      />
    </div>
  );
}