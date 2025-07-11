import React, { useState, useEffect } from 'react';
import ElegantLoading from '../components/ElegantLoading';

export default function LoadingDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  // Simulasi loading selama 5 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsFirstLoad(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Fungsi untuk memulai loading kembali
  const startLoading = () => {
    setIsLoading(true);
    
    // Simulasi loading selama 3 detik
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Komponen loading elegan */}
      <ElegantLoading isNavigating={isLoading} isFirstLoad={isFirstLoad} />
      
      {/* Konten halaman */}
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Demo Halaman Loading Elegan
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Halaman loading elegan dengan animasi CSS murni tanpa GSAP.
        </p>
        <button
          onClick={startLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Tampilkan Loading
        </button>
      </div>
    </div>
  );
}