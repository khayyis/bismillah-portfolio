'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const timeoutRef = useRef(null);

  // Efek untuk menangani transisi saat pathname berubah
  useEffect(() => {
    // Jika pathname berubah, mulai transisi
    setIsTransitioning(true);
    
    // Simpan children saat ini untuk ditampilkan selama transisi
    setDisplayChildren(children);
    
    // Setelah animasi masuk selesai, tampilkan children baru
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Durasi animasi
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname, children]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Logo atau ikon brand */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Lingkaran animasi */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-500"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.2, 1],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                  
                  {/* Logo atau teks */}
                  <motion.div
                    className="relative z-10 text-3xl font-bold text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    K
                  </motion.div>
                </div>
              </div>
              
              {/* Animasi loading bar */}
              <motion.div
                className="h-1 bg-blue-500 mt-4"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ width: '200px', marginLeft: '-100px', left: '50%', position: 'absolute' }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {displayChildren}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;