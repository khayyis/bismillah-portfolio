'use client';

import React, { useState, useCallback, useContext } from 'react';
import { motion } from 'framer-motion';
import { ConnectionContext } from './ConnectionProvider';
import OptimizedImage from './OptimizedImage';
import Aurora from './Aurora';
import GlassButton from './GlassButton';

/**
 * OptimizedAuroraCard - Versi yang dioptimalkan dari AuroraCard
 * @param {Object} props - Properties komponen
 * @param {string} props.title - Judul proyek
 * @param {string} props.description - Deskripsi proyek
 * @param {string} props.image - URL gambar proyek
 * @param {Array} props.colorStops - Array warna untuk efek Aurora
 * @param {string} props.status - Status proyek
 * @param {Function} props.onClick - Handler untuk klik card
 * @param {string} props.className - Class tambahan
 */
export default function OptimizedAuroraCard({
  title,
  description,
  image,
  colorStops = ["#5227FF", "#7cff67", "#5227FF"],
  status,
  onClick,
  className = '',
  ...props
}) {
  // State untuk tracking hover
  const [isHovered, setIsHovered] = useState(false);
  
  // Gunakan context koneksi
  const { connection, device } = useContext(ConnectionContext);
  
  // Tentukan apakah harus menggunakan animasi ringan
  const useLightAnimations = connection?.effectiveType === 'slow-2g' || 
                           connection?.effectiveType === '2g' || 
                           connection?.saveData || 
                           device?.isLowEndDevice || 
                           device?.isReducedMotion;
  
  // Handler untuk hover
  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
  }, []);
  
  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);
  
  // Handler untuk klik
  const handleClick = useCallback(() => {
    if (onClick) onClick();
  }, [onClick]);
  
  // Variasi animasi berdasarkan preferensi pengguna
  const cardVariants = useLightAnimations
    ? {
        // Animasi ringan untuk perangkat low-end atau koneksi lambat
        initial: { opacity: 0.9 },
        hover: { opacity: 1 },
        tap: { scale: 0.98 }
      }
    : {
        // Animasi penuh untuk perangkat high-end dan koneksi cepat
        initial: { y: 0 },
        hover: { y: -10 },
        tap: { scale: 0.98 }
      };
  
  // Variasi animasi untuk konten
  const contentVariants = {
    initial: { opacity: 0.9 },
    hover: { opacity: 1 }
  };
  
  // Konfigurasi Aurora berdasarkan preferensi pengguna
  const auroraConfig = useLightAnimations
    ? {
        // Konfigurasi ringan
        amplitude: 0.5,
        blend: 0.3,
        speed: 0.5
      }
    : {
        // Konfigurasi penuh
        amplitude: 1.0,
        blend: 0.5,
        speed: 1.0
      };
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl shadow-lg ${className}`}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={handleClick}
      style={{ height: '100%', cursor: onClick ? 'pointer' : 'default' }}
      {...props}
    >
      {/* Background Aurora */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Aurora 
          colorStops={colorStops} 
          {...auroraConfig}
        />
      </div>
      
      {/* Overlay gelap */}
      <div className="absolute inset-0 z-10 bg-black bg-opacity-40" />
      
      {/* Gambar */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={image}
          alt={title}
          className="w-full h-full aurora-card-image"
          objectFit="cover"
          objectPosition="center"
          placeholderSrc="/images/Dalam-Tahap-Pengembangan.jpeg"
        />
      </div>
      
      {/* Konten */}
      <motion.div 
        className="relative z-20 flex flex-col justify-between h-full p-6 text-white"
        variants={contentVariants}
      >
        <div>
          {status && <p className="text-sm font-medium text-green-400">{status}</p>}
          <h3 className="mt-1 text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-gray-300">{description}</p>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <GlassButton onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}>
            Lihat Detail
          </GlassButton>
          <GlassButton onClick={(e) => {
            e.stopPropagation();
            // Scroll ke bagian kontak
            const contactSection = document.getElementById('kontak');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            Hubungi Saya
          </GlassButton>
        </div>
      </motion.div>
    </motion.div>
  );
}