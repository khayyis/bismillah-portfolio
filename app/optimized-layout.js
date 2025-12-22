'use client';

import ThemeProvider from '../components/ThemeProvider';
import OptimizedTransitionLayout from '../components/OptimizedTransitionLayout';
import ClickSpark from '../components/ClickSpark';
import FloatingLines from '../components/FloatingLines';

/**
 * OptimizedLayout - Layout yang dioptimalkan untuk performa
 * 
 * FloatingLines sebagai background full-page.
 * Glass overlay unified untuk semua konten tanpa batas antar section.
 */
export default function OptimizedLayout({ children }) {
  return (
    <ThemeProvider>
      {/* FloatingLines Full Page Background */}
      <div className="fixed inset-0 z-[-10]">
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
      </div>

      {/* Unified Glass Overlay - satu layer untuk semua konten */}
      <div className="fixed inset-0 z-[-5] bg-black/30 backdrop-blur-sm pointer-events-none" />

      <ClickSpark
        sparkColor="#6366f1"
        sparkSize={12}
        sparkRadius={20}
        sparkCount={10}
        duration={500}
      >
        <OptimizedTransitionLayout>
          {children}
        </OptimizedTransitionLayout>
      </ClickSpark>
    </ThemeProvider>
  );
}
