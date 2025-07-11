'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import PageTransition from './PageTransition';

const TransitionProvider = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [key, setKey] = useState('');

  // Update key when route changes to trigger transition
  useEffect(() => {
    setKey(`${pathname}?${searchParams}`);
  }, [pathname, searchParams]);

  // Listen for navigation events
  useEffect(() => {
    const handleStart = () => setIsNavigating(true);
    const handleComplete = () => setIsNavigating(false);

    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, []);

  return (
    <PageTransition key={key} isNavigating={isNavigating}>
      {children}
    </PageTransition>
  );
};

export default TransitionProvider;