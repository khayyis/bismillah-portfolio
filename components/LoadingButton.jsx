'use client';

import React from 'react';
import LoadingIndicator from './LoadingIndicator';
import './LoadingButton.css';

/**
 * Komponen LoadingButton yang menampilkan indikator loading saat tombol sedang dalam proses
 */
const LoadingButton = ({
  children,
  isLoading = false,
  disabled = false,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost'
  size = 'medium', // 'small', 'medium', 'large'
  fullWidth = false,
  loadingText = null,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  // Tentukan kelas CSS berdasarkan props
  const getButtonClasses = () => {
    const classes = ['loading-button'];
    
    // Tambahkan kelas variant
    classes.push(`loading-button-${variant}`);
    
    // Tambahkan kelas ukuran
    classes.push(`loading-button-${size}`);
    
    // Tambahkan kelas loading jika sedang loading
    if (isLoading) {
      classes.push('loading-button-is-loading');
    }
    
    // Tambahkan kelas disabled jika tombol dinonaktifkan
    if (disabled) {
      classes.push('loading-button-disabled');
    }
    
    // Tambahkan kelas full width jika diperlukan
    if (fullWidth) {
      classes.push('loading-button-full-width');
    }
    
    // Tambahkan kelas kustom
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  // Tentukan warna loading indicator berdasarkan variant
  const getLoadingColor = () => {
    if (variant === 'primary') return 'white';
    if (variant === 'secondary') return 'white';
    if (variant === 'outline') return 'primary';
    if (variant === 'ghost') return 'primary';
    return 'primary';
  };

  return (
    <button
      type={type}
      className={getButtonClasses()}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <div className="loading-button-content">
          <div className="loading-button-indicator">
            <LoadingIndicator 
              size={size === 'small' ? 'small' : 'small'} 
              color={getLoadingColor()} 
              type="spinner"
            />
          </div>
          <span className="loading-button-text">
            {loadingText || children}
          </span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;