'use client';

import { useState, useEffect } from 'react';
import { useLoading } from '../contexts/LoadingContext';

/**
 * Hook untuk menunda animasi sampai loading screen selesai
 * @param {number} additionalDelay - Delay tambahan setelah loading selesai (ms)
 * @returns {boolean} - true jika animasi boleh mulai
 */
export function useAnimationReady(additionalDelay = 0) {
  const { isLoadingComplete } = useLoading();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isLoadingComplete) {
      if (additionalDelay > 0) {
        const timer = setTimeout(() => {
          setIsReady(true);
        }, additionalDelay);
        return () => clearTimeout(timer);
      } else {
        setIsReady(true);
      }
    }
  }, [isLoadingComplete, additionalDelay]);

  return isReady;
}

export default useAnimationReady;
