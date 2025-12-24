'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext({
  isLoadingComplete: false,
  setLoadingComplete: () => {},
});

export function LoadingProvider({ children, value }) {
  // Jika value di-pass dari parent, gunakan itu
  // Jika tidak, gunakan internal state
  const [internalComplete, setInternalComplete] = useState(false);
  
  const isLoadingComplete = value?.isLoadingComplete ?? internalComplete;
  const setLoadingComplete = value?.setLoadingComplete ?? setInternalComplete;

  return (
    <LoadingContext.Provider value={{ isLoadingComplete, setLoadingComplete }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    // Return default value jika tidak ada provider (untuk SSR safety)
    return { isLoadingComplete: true, setLoadingComplete: () => {} };
  }
  return context;
}

export default LoadingContext;
