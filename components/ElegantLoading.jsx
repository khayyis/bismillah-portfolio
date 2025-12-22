'use client';
import React from 'react';
import './ElegantLoading.css';

const ElegantLoading = ({ isNavigating = false, isFirstLoad = false }) => {
  // Hanya tampilkan loading jika sedang navigasi atau first load
  const shouldShow = isNavigating || isFirstLoad;
  
  if (!shouldShow) return null;

  return (
    <div className="loading-wrapper">
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
