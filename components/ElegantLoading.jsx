'use client';
import React, { useState, useEffect } from 'react';
import './ElegantLoading.css';

const ElegantLoading = ({ isNavigating = false, isFirstLoad = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  const shouldShow = isNavigating || isFirstLoad;

  useEffect(() => {
    if (shouldShow) {
      // Masuk: tampilkan dengan animasi slide up
      setIsExiting(false);
      setIsVisible(true);
    } else if (isVisible) {
      // Keluar: animasi slide down dulu, baru hide
      setIsExiting(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsExiting(false);
      }, 500); // Durasi animasi keluar
      return () => clearTimeout(timer);
    }
  }, [shouldShow]);

  if (!isVisible) return null;

  return (
    <div className={`loading-wrapper ${isExiting ? 'loading-exit' : 'loading-enter'}`}>
      <div className="loading-card">
        <div className="loading-loader">
          <p>loading</p>
          <div className="loading-words">
            <span className="loading-word">portfolio</span>
            <span className="loading-word">projects</span>
            <span className="loading-word">skills</span>
            <span className="loading-word">about</span>
            <span className="loading-word">portfolio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElegantLoading;
