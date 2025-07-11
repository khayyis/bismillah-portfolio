'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from "framer-motion";
import Aurora from "./Aurora";
import GlassButton from "./GlassButton";
import { FiEye } from "react-icons/fi";

function AuroraCard({
  title,
  category,
  description,
  imageSrc,
  status,
  onClick,
  priority = false,
  colorStops = ["#3A29FF", "#FF94B4", "#FF3232"],
  id = 1
}) {
  const [isHovered, setIsHovered] = useState(false);
  // Inisialisasi state dengan nilai false untuk konsistensi server-client
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Memeriksa apakah gambar valid
  const isValidImage = (imagePath) => {
    return imagePath && imagePath.trim() !== '';
  };

  const handleButtonClick = () => {
    onClick?.();
  };

  const handleImageLoad = () => {
    // Fungsi ini hanya akan dijalankan di client-side
    setImageLoaded(true);
    setImageError(false); // Reset error state jika gambar berhasil dimuat
    console.log(`Image loaded successfully: ${imageSrc}`);
  };
  
  // Fungsi untuk menangani error gambar
  const handleImageError = () => {
    // Fungsi ini hanya akan dijalankan di client-side
    console.log(`Image error: ${imageSrc}`);
    setImageError(true);
    setImageLoaded(false); // Gambar tidak berhasil dimuat
  };
  
  // Normalisasi URL gambar untuk menghindari masalah hydration
  const normalizedImageSrc = useMemo(() => {
    if (!imageSrc) return 'C:\\Users\\LENOVO\\Desktop\\bismillah\\public\\images\\autonomous-mobile-robotic.jpeg';
    
    try {
      // Jika URL absolut, gunakan apa adanya
      if (typeof imageSrc === 'string' && (imageSrc.startsWith('http://') || imageSrc.startsWith('https://'))) {
        return imageSrc;
      }
      
      // Jika path absolut dengan C:\ sudah ada, gunakan apa adanya
      if (typeof imageSrc === 'string' && imageSrc.startsWith('C:\\')) {
        return imageSrc;
      }
      
      // Pastikan URL relatif dimulai dengan / untuk konsistensi
      if (typeof imageSrc === 'string' && !imageSrc.startsWith('/') && !imageSrc.startsWith('./') && !imageSrc.startsWith('C:\\')) {
        return 'C:\\Users\\LENOVO\\Desktop\\bismillah\\public\\images\\' + imageSrc;
      }
      
      // Jika URL relatif dengan ./, ubah menjadi path absolut
      if (typeof imageSrc === 'string' && imageSrc.startsWith('./')) {
        return 'C:\\Users\\LENOVO\\Desktop\\bismillah\\public\\' + imageSrc.replace('./', '');
      }
      
      // Jika URL relatif dengan /, ubah menjadi path absolut
      if (typeof imageSrc === 'string' && imageSrc.startsWith('/')) {
        return 'C:\\Users\\LENOVO\\Desktop\\bismillah\\public' + imageSrc;
      }
      
      return imageSrc;
    } catch (e) {
      console.error('Error normalizing image URL:', e, imageSrc);
      return 'C:\\Users\\LENOVO\\Desktop\\bismillah\\public\\images\\autonomous-mobile-robotic.jpeg';
    }
  }, [imageSrc]);
  
  // Verifikasi keberadaan placeholder image (hanya di client-side)
  useEffect(() => {
    // Kode ini hanya akan dijalankan di client-side setelah hydration
    const placeholderImg = new Image();
    placeholderImg.src = 'C:\\Users\\LENOVO\\Desktop\\bismillah\\public\\images\\autonomous-mobile-robotic.jpeg';
    placeholderImg.onerror = () => {
      console.error('Placeholder image not found: C:\\Users\\LENOVO\\Desktop\\bismillah\\public\\images\\autonomous-mobile-robotic.jpeg');
    };
  }, []);
  
  // Fungsi untuk mendapatkan URL gambar yang valid
  const getValidImageUrl = () => {
    if (!normalizedImageSrc || imageError) {
      // Gunakan path absolut untuk placeholder yang sudah terkonfirmasi ada
      return 'C:\\Users\\LENOVO\\Desktop\\bismillah\\public\\images\\autonomous-mobile-robotic.jpeg';
    }
    // Gunakan URL yang sudah dinormalisasi
    return normalizedImageSrc;
  };
  
  // Preload gambar saat komponen dimount (hanya di client-side)
  useEffect(() => {
    // Kode ini hanya akan dijalankan di client-side setelah hydration
    if (imageSrc) {
      const img = new Image();
      // Gunakan normalizedImageSrc untuk konsistensi
      img.src = normalizedImageSrc;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      
      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [normalizedImageSrc, imageSrc, handleImageLoad, handleImageError]);

  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
        <Aurora 
          colorStops={colorStops}
          amplitude={isHovered ? 1.2 : 0.8}
          speed={isHovered ? 1.5 : 1.0}
          blend={isHovered ? 0.6 : 0.4}
        />
      </div>
      
      <div className="relative z-10 flex flex-col h-full bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 theme-dark:border-gray-800/50">
        <div className="flex-1">
          {isValidImage(imageSrc) ? (
            <div 
              className="relative w-full h-40 mb-4 overflow-hidden rounded-lg"
              suppressHydrationWarning
            >
              {/* Placeholder image yang selalu dimuat terlebih dahulu - menggunakan gambar yang sudah terkonfirmasi ada */}
              <img 
                className="w-full h-full object-cover absolute inset-0"
                src="/images/Dalam-Tahap-Pengembangan.jpeg" 
                alt="Placeholder"
                suppressHydrationWarning
              />
              
              {/* Gambar utama dengan suppressHydrationWarning untuk menghindari hydration mismatch */}
              <img
                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                src={getValidImageUrl()}
                alt={title || "Project image"}
                loading={priority ? "eager" : "lazy"}
                onLoad={handleImageLoad}
                onError={handleImageError}
                decoding="async"
                fetchPriority={priority ? "high" : "auto"}
                suppressHydrationWarning
              />
              {/* Loading state dengan suppressHydrationWarning */}
              <div 
                className={`absolute inset-0 flex items-center justify-center bg-gray-800 animate-pulse transition-opacity duration-300 ${!imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'}`}
                suppressHydrationWarning
              >
                <span className="text-gray-300">Loading...</span>
              </div>
              {/* Error container dengan suppressHydrationWarning */}
              <div 
                className={`absolute inset-0 flex items-center justify-center bg-gray-800 image-error-container transition-opacity duration-300 ${imageError ? 'opacity-100' : 'opacity-0'}`}
                suppressHydrationWarning
              >
                <span className="text-center text-gray-300 p-2">Gambar tidak tersedia</span>
              </div>
            </div>
          ) : (
            <div 
              className="relative w-full h-40 mb-4 overflow-hidden rounded-lg bg-gray-800 flex items-center justify-center"
              suppressHydrationWarning
            >
              <p className="text-center text-gray-300 p-4" suppressHydrationWarning>
                [Gambar {title}]<br />
                <span className="text-sm" suppressHydrationWarning>(Akan ditambahkan nanti)</span>
              </p>
            </div>
          )}
          
          <h3 className="text-lg font-bold text-white mb-1 theme-dark:text-gray-50">{title}</h3>
          <p className="text-sm mb-3 text-blue-200 dark:text-blue-300 theme-dark:text-blue-300">{category}</p>
          <div className="text-sm text-white/80 mb-4 line-clamp-3 theme-dark:text-gray-200">{description}</div>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-800/80 text-blue-300 border border-blue-900/50 theme-dark:bg-gray-900/80 theme-dark:text-blue-200 theme-dark:border-blue-800/50">
            {status}
          </div>
          <div className="detail-btn-container">
            <GlassButton 
              items={[
                { 
                  icon: <FiEye />, 
                  color: "blue", 
                  label: "Lihat Detail",
                  onClick: handleButtonClick,
                  customClass: "detail-btn"
                }
              ]} 
              className="project-detail-btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const AuroraCardMemo = React.memo(AuroraCard);

export default AuroraCardMemo;