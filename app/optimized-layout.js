'use client';

import ThemeProvider from '../components/ThemeProvider';
import OptimizedTransitionLayout from '../components/OptimizedTransitionLayout';
import ClickSpark from '../components/ClickSpark';
import SmoothScroll from '../components/SmoothScroll';

/**
 * OptimizedLayout - Layout yang dioptimalkan untuk performa
 */
export default function OptimizedLayout({ children }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
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
      </SmoothScroll>
    </ThemeProvider>
  );
}


