'use client';

import { useState, useEffect } from 'react';
import ThemeProvider from '../components/ThemeProvider';
import OptimizedTransitionLayout from '../components/OptimizedTransitionLayout';
import ClickSpark from '../components/ClickSpark';
import FloatingLines from '../components/FloatingLines';
import SmoothScroll from '../components/SmoothScroll';

/**
 * OptimizedLayout - Layout yang dioptimalkan untuk performa
 * 
 * FloatingLines sebagai background full-page (disabled on mobile for performance).
 * Glass overlay unified untuk semua konten tanpa batas antar section.
 */
export default function OptimizedLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <ThemeProvider>
      {/* FloatingLines Full Page Background - DISABLED on mobile for performance */}
      <div className="fixed inset-0 z-[-10]">
        {isMobile ? (
          // Static gradient background for mobile (much lighter on CPU/GPU)
          <div
            className="w-full h-full"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, #1E40AF 0%, #0f172a 50%, #000 100%)'
            }}
          />
        ) : (
          // Full FloatingLines only on desktop
          <FloatingLines
            linesGradient={['#3B82F6', '#1E40AF', '#6366F1', '#4F46E5']}
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[10, 15, 20]}
            lineDistance={[8, 6, 4]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
            animationSpeed={0.8}
          />
        )}
      </div>

      {/* Unified Glass Overlay - satu layer untuk semua konten */}
      <div className="fixed inset-0 z-[-5] bg-black/30 backdrop-blur-sm pointer-events-none" />

      <SmoothScroll>
        <ClickSpark
          sparkColor="#6366f1"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={isMobile ? 5 : 10}
          duration={500}
        >
          <OptimizedTransitionLayout>
            {children}
          </OptimizedTransitionLayout>
        </ClickSpark>
      </SmoothScroll>
    </ThemeProvider>
  );
}

