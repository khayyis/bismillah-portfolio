'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ProfileCardProvider from './ProfileCardProvider';

// Dynamically import OptimizedProfileCard with no SSR
const OptimizedProfileCard = dynamic(
  () => import('./OptimizedProfileCard'),
  { ssr: false, loading: () => <ProfileCardPlaceholder /> }
);

// Simple placeholder component
const ProfileCardPlaceholder = () => (
  <div className="pc-card-wrapper">
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
 * ProfileCardWithProvider - Combines ProfileCardProvider with OptimizedProfileCard
 * 
 * This component provides a complete solution with:
 * - Performance optimization based on device capabilities
 * - Adaptive loading based on network conditions
 * - Reduced motion support
 * - Error handling and retry mechanisms
 */
const ProfileCardWithProvider = (props) => {
  return (
    <ProfileCardProvider>
      <OptimizedProfileCard {...props} />
    </ProfileCardProvider>
  );
};

export default ProfileCardWithProvider;