'use client';

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useProfileCard } from './ProfileCardProvider';
import './ProfileCardStyle.css';

// Lazy load the actual ProfileCard component
const ProfileCard = lazy(() => import('./ProfileCard'));

// Import utilities
import { preloadAvatar } from '../utils/profileCardOptimizer';

// Loading placeholder component
const ProfileCardPlaceholder = ({ className = '' }) => (
  <div className={`pc-card-wrapper ${className}`.trim()}>
    <section className="pc-card">
      <div className="pc-inside">
        <div className="pc-content pc-avatar-content">
          <div className="avatar-container">
            <div className="avatar-loading">
              <div className="avatar-loading-spinner"></div>
            </div>
          </div>
        </div>
        <div className="pc-content">
          <div className="pc-details">
            <div className="pc-placeholder">Loading profile...</div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

/**
 * OptimizedProfileCard - A wrapper around ProfileCard that adds:
 * - Lazy loading
 * - Error boundaries
 * - Loading placeholders
 * - Intersection Observer for delayed loading
 * - Performance optimizations based on device capabilities
 * - Preloading of avatar images
 */
const OptimizedProfileCard = (props) => {
  // Get performance config from context
  const { performanceConfig, deviceInfo } = useProfileCard();
  
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [avatarPreloaded, setAvatarPreloaded] = useState(false);

  // Preload avatar images
  useEffect(() => {
    if (!isVisible || !props.avatarUrl) return;
    
    // Start preloading avatar
    const preloader = preloadAvatar(
      props.avatarUrl,
      () => setAvatarPreloaded(true),
      (error) => console.warn('Avatar preload failed:', error.message),
      performanceConfig.maxRetries
    );
    
    // If mini avatar is different, preload it too
    let miniPreloader = null;
    if (props.miniAvatarUrl && props.miniAvatarUrl !== props.avatarUrl) {
      miniPreloader = preloadAvatar(
        props.miniAvatarUrl,
        () => {}, // No need to track mini avatar preload status
        (error) => console.warn('Mini avatar preload failed:', error.message),
        performanceConfig.maxRetries
      );
    }
    
    return () => {
      // Cancel preloading if component unmounts
      preloader.cancel();
      if (miniPreloader) miniPreloader.cancel();
    };
  }, [isVisible, props.avatarUrl, props.miniAvatarUrl, performanceConfig.maxRetries]);

  // Use Intersection Observer to detect when the card is in viewport
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '200px', // Load when within 200px of viewport
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    }, options);

    // Get the reference to the container element
    const container = document.getElementById('profile-card-container');
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
      observer.disconnect();
    };
  }, []);

  // Error boundary
  if (hasError) {
    return (
      <div className={`pc-card-wrapper ${props.className || ''}`.trim()}>
        <section className="pc-card">
          <div className="pc-inside">
            <div className="pc-content">
              <div className="pc-details">
                <div className="pc-placeholder">
                  <span style={{ color: '#ff5555' }}>Error loading profile card</span>
                  <button 
                    onClick={() => setHasError(false)}
                    style={{
                      marginTop: '10px',
                      padding: '5px 10px',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Prepare optimized props based on performance config
  const optimizedProps = {
    ...props,
    enableTilt: props.enableTilt !== undefined ? props.enableTilt : performanceConfig.enableTilt,
    onError: () => setHasError(true)
  };

  // Add connection info for debugging in development
  if (process.env.NODE_ENV === 'development') {
    optimizedProps.debugInfo = {
      connectionType: deviceInfo.connectionType,
      isLowEndDevice: deviceInfo.isLowEndDevice,
      prefersReducedMotion: deviceInfo.prefersReducedMotion
    };
  }

  return (
    <div id="profile-card-container">
      {isVisible ? (
        <Suspense fallback={<ProfileCardPlaceholder className={props.className} />}>
          <ProfileCard 
            {...optimizedProps}
          />
        </Suspense>
      ) : (
        <ProfileCardPlaceholder className={props.className} />
      )}
    </div>
  );
};

export default OptimizedProfileCard;