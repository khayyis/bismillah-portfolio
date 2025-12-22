'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ElectricBorder from './ElectricBorder';
import GlassButton from './GlassButton';
import { FiEye } from 'react-icons/fi';
import './ElectricProjectCard.css';

function ElectricProjectCard({
  title,
  category,
  description,
  imageSrc,
  status,
  onClick,
  priority = false,
  color = '#7df9ff',
  id = 1
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isValidImage = (imagePath) => {
    return imagePath && imagePath.trim() !== '';
  };

  const handleButtonClick = () => {
    onClick?.();
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const normalizedImageSrc = useMemo(() => {
    if (!imageSrc) return '/images/Dalam-Tahap-Pengembangan.jpeg';
    
    try {
      if (typeof imageSrc === 'string' && (imageSrc.startsWith('http://') || imageSrc.startsWith('https://'))) {
        return imageSrc;
      }
      
      if (typeof imageSrc === 'string' && !imageSrc.startsWith('/') && !imageSrc.startsWith('./')) {
        return '/images/' + imageSrc;
      }
      
      if (typeof imageSrc === 'string' && imageSrc.startsWith('./')) {
        return imageSrc.replace('./', '/');
      }
      
      return imageSrc;
    } catch (e) {
      console.error('Error normalizing image URL:', e, imageSrc);
      return '/images/Dalam-Tahap-Pengembangan.jpeg';
    }
  }, [imageSrc]);

  const getValidImageUrl = () => {
    if (!normalizedImageSrc || imageError) {
      return '/images/Dalam-Tahap-Pengembangan.jpeg';
    }
    return normalizedImageSrc;
  };

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = normalizedImageSrc;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [normalizedImageSrc, imageSrc]);

  return (
    <ElectricBorder
      color={color}
      speed={isHovered ? 1.5 : 1}
      chaos={isHovered ? 0.7 : 0.5}
      thickness={isHovered ? 3 : 2}
      className="electric-project-card"
      style={{ borderRadius: 16 }}
    >
      <div
        className="electric-card-inner"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="electric-card-content">
          {isValidImage(imageSrc) ? (
            <div className="electric-card-image-container" suppressHydrationWarning>
              <img
                className="electric-card-placeholder"
                src="/images/Dalam-Tahap-Pengembangan.jpeg"
                alt="Placeholder"
                suppressHydrationWarning
              />
              <img
                className={`electric-card-image ${imageLoaded ? 'loaded' : ''}`}
                src={getValidImageUrl()}
                alt={title || 'Project image'}
                loading={priority ? 'eager' : 'lazy'}
                onLoad={handleImageLoad}
                onError={handleImageError}
                decoding="async"
                fetchPriority={priority ? 'high' : 'auto'}
                suppressHydrationWarning
              />
              <div
                className={`electric-card-loading ${!imageLoaded && !imageError ? 'visible' : ''}`}
                suppressHydrationWarning
              >
                <span>Loading...</span>
              </div>
              <div
                className={`electric-card-error ${imageError ? 'visible' : ''}`}
                suppressHydrationWarning
              >
                <span>Gambar tidak tersedia</span>
              </div>
            </div>
          ) : (
            <div className="electric-card-no-image" suppressHydrationWarning>
              <p suppressHydrationWarning>
                [Gambar {title}]<br />
                <span suppressHydrationWarning>(Akan ditambahkan nanti)</span>
              </p>
            </div>
          )}

          <h3 className="electric-card-title">{title}</h3>
          <p className="electric-card-category">{category}</p>
          <div className="electric-card-description">{description}</div>
        </div>

        <div className="electric-card-footer">
          <div className="electric-card-status">
            {status}
          </div>
          <div className="electric-card-btn-container">
            <GlassButton
              items={[
                {
                  icon: <FiEye />,
                  color: 'blue',
                  label: 'Lihat Detail',
                  onClick: handleButtonClick,
                  customClass: 'detail-btn'
                }
              ]}
              className="project-detail-btn"
            />
          </div>
        </div>
      </div>
    </ElectricBorder>
  );
}

const ElectricProjectCardMemo = React.memo(ElectricProjectCard);

export default ElectricProjectCardMemo;
