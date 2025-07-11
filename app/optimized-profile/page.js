'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import DeviceInfo from '../../components/DeviceInfo';
import './styles.css';

// Dynamically import the ProfileCardWithProvider to avoid SSR issues
const ProfileCardWithProvider = dynamic(
  () => import('../../components/ProfileCardWithProvider'),
  { ssr: false }
);

// Simple loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="text-white text-xl">Loading profile card...</div>
  </div>
);

// Performance metrics component
const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    fcp: { value: '1.2s', status: 'good' },
    lcp: { value: '2.4s', status: 'good' },
    cls: { value: '0.05', status: 'good' },
    inp: { value: '120ms', status: 'average' }
  });
  
  // In a real app, you would measure these metrics using web vitals
  useEffect(() => {
    // Simulate measuring performance metrics
    const timer = setTimeout(() => {
      // This would be replaced with actual measurements in production
      setMetrics({
        fcp: { value: '1.2s', status: 'good' },
        lcp: { value: '2.4s', status: 'good' },
        cls: { value: '0.05', status: 'good' },
        inp: { value: '120ms', status: 'average' }
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="mt-12 w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Performance Metrics</h2>
      <div className="performance-metrics">
        <div className="metric-card">
          <div className="metric-title">First Contentful Paint (FCP)</div>
          <div className={`metric-value ${metrics.fcp.status}`}>{metrics.fcp.value}</div>
          <div className="metric-description">
            Measures the time from when the page starts loading to when any part of the page's content is rendered on the screen.
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-title">Largest Contentful Paint (LCP)</div>
          <div className={`metric-value ${metrics.lcp.status}`}>{metrics.lcp.value}</div>
          <div className="metric-description">
            Measures the time from when the page starts loading to when the largest text block or image element is rendered on the screen.
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-title">Cumulative Layout Shift (CLS)</div>
          <div className={`metric-value ${metrics.cls.status}`}>{metrics.cls.value}</div>
          <div className="metric-description">
            Measures the sum of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page.
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-title">Interaction to Next Paint (INP)</div>
          <div className={`metric-value ${metrics.inp.status}`}>{metrics.inp.value}</div>
          <div className="metric-description">
            Measures the responsiveness of a page to user interactions by observing the latency of all click, tap, and keyboard interactions.
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Optimized Profile Page
 * 
 * This page demonstrates the use of the optimized ProfileCardWithProvider component
 * with all performance optimizations enabled.
 */
export default function OptimizedProfilePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-900">
      <h1 className="text-3xl font-bold text-white mb-8">Optimized Profile Card</h1>
      
      <div className="max-w-md w-full">
        <Suspense fallback={<Loading />}>
          <ProfileCardWithProvider
            avatarUrl="/images/khayyis-profile.jpg"
            miniAvatarUrl="/images/cropped-khayyis-profile.jpg"
            name="Khayyis"
            title="Web Developer & Designer"
            handle="khayyis"
            status="Available for hire"
            contactText="Contact"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => {
              // In a real app, you might open a contact form or modal
              alert('Contact button clicked!');
            }}
          />
        </Suspense>
      </div>
      
      <div className="mt-8 text-white text-center max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Performance Optimizations</h2>
        <ul className="list-disc list-inside text-left space-y-2">
          <li>Lazy loading with dynamic imports</li>
          <li>Intersection Observer for viewport detection</li>
          <li>Device capability detection</li>
          <li>Connection quality adaptation</li>
          <li>Reduced motion support</li>
          <li>Battery saving optimizations</li>
          <li>Preloading of avatar images</li>
          <li>Optimized animations with requestAnimationFrame</li>
          <li>Error handling with fallbacks</li>
        </ul>
      </div>
      
      <PerformanceMetrics />
      
      <DeviceInfo />
    </main>
  );
}