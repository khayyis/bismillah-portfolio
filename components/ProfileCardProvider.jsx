'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getProfileCardPerformanceConfig } from '../utils/profileCardOptimizer';

// Create context
const ProfileCardContext = createContext(null);

/**
 * Hook untuk menggunakan ProfileCard context
 */
export const useProfileCard = () => {
  const context = useContext(ProfileCardContext);
  if (!context) {
    throw new Error('useProfileCard must be used within a ProfileCardProvider');
  }
  return context;
};

/**
 * Provider untuk mengelola state dan konfigurasi ProfileCard
 */
export const ProfileCardProvider = ({ children }) => {
  // State untuk device dan connection info
  const [deviceInfo, setDeviceInfo] = useState({
    isLowEndDevice: false,
    connectionType: 'unknown',
    isBatterySaving: false,
    prefersReducedMotion: false,
  });

  // Deteksi device capabilities dan user preferences
  useEffect(() => {
    // Deteksi low-end device
    const isLowEnd = () => {
      // Check for hardware concurrency (CPU cores)
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
        return true;
      }
      
      // Check for device memory (RAM)
      if (navigator.deviceMemory && navigator.deviceMemory <= 4) {
        return true;
      }
      
      return false;
    };
    
    // Deteksi connection type
    const getConnectionType = () => {
      if (navigator.connection) {
        return navigator.connection.effectiveType || 'unknown';
      }
      return 'unknown';
    };
    
    // Deteksi battery saving mode
    const checkBatterySaving = async () => {
      try {
        if (navigator.getBattery) {
          const battery = await navigator.getBattery();
          return battery.level <= 0.2 && !battery.charging;
        }
      } catch (error) {
        console.warn('Battery status detection failed:', error);
      }
      return false;
    };
    
    // Deteksi prefers-reduced-motion
    const checkReducedMotion = () => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };
    
    // Update device info
    const updateDeviceInfo = async () => {
      const isBatterySaving = await checkBatterySaving();
      
      setDeviceInfo({
        isLowEndDevice: isLowEnd(),
        connectionType: getConnectionType(),
        isBatterySaving,
        prefersReducedMotion: checkReducedMotion(),
      });
    };
    
    // Initial update
    updateDeviceInfo();
    
    // Listen for changes
    const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionMediaQuery.addEventListener('change', updateDeviceInfo);
    
    // Connection change listener
    if (navigator.connection) {
      navigator.connection.addEventListener('change', updateDeviceInfo);
    }
    
    return () => {
      reducedMotionMediaQuery.removeEventListener('change', updateDeviceInfo);
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', updateDeviceInfo);
      }
    };
  }, []);

  // Get optimized performance config based on device info
  const performanceConfig = useMemo(() => {
    return getProfileCardPerformanceConfig(deviceInfo);
  }, [deviceInfo]);

  // Context value
  const value = {
    deviceInfo,
    performanceConfig,
  };

  return (
    <ProfileCardContext.Provider value={value}>
      {children}
    </ProfileCardContext.Provider>
  );
};

export default ProfileCardProvider;