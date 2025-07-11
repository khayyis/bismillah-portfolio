'use client';

import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedProjects from './OptimizedProjects';
import GlassButton from './GlassButton';
import { useRouter } from 'next/navigation';
import { ConnectionContext } from './ConnectionProvider';
import optimizedProjectsData from '../config/optimizedProjectsData';
import Link from 'next/link';

/**
 * OptimizedProjectsPage - Versi yang dioptimalkan dari halaman Projects
 * dengan fitur loading bertahap dan adaptasi berdasarkan koneksi dan perangkat
 */
export default function OptimizedProjectsPage() {
  // State untuk filter kategori
  const [filter, setFilter] = useState('Semua');
  
  // Router untuk navigasi
  const router = useRouter();
  
  // Gunakan context koneksi
  const { connection, device } = useContext(ConnectionContext);
  
  // State untuk loading dan proyek yang terlihat
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  
  // Tentukan apakah harus menggunakan animasi ringan
  const useLightAnimations = connection?.isSlowConnection || 
                           connection?.effectiveType === 'slow-2g' || 
                           connection?.effectiveType === '2g' || 
                           connection?.saveData || 
                           device?.isLowEndDevice || 
                           device?.isReducedMotion;
  
  // Data proyek dari konfigurasi yang dioptimalkan
  const { projects, categories, projectPageText } = optimizedProjectsData;
  
  // Filter proyek berdasarkan kategori
  const filteredProjects = filter === 'Semua' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  // Menentukan jumlah proyek yang akan dimuat awalnya berdasarkan koneksi dan perangkat
  const getInitialProjectCount = () => {
    if (!connection || !device) return projects.length;
    
    const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                            connection.effectiveType === '2g' || 
                            connection.saveData;
    
    if (isSlowConnection && device.isLowEndDevice) {
      return 1; // Sangat terbatas untuk koneksi lambat dan perangkat rendah
    } else if (isSlowConnection || device.isLowEndDevice) {
      return 2; // Terbatas untuk koneksi lambat atau perangkat rendah
    } else {
      return projects.length; // Semua proyek untuk koneksi cepat dan perangkat tinggi
    }
  };
  
  // Efek untuk memuat proyek secara bertahap
  useEffect(() => {
    setIsLoading(true);
    setLoadedCount(0);
    
    const initialCount = getInitialProjectCount();
    const initialProjects = filteredProjects.slice(0, initialCount);
    
    // Simulasi loading untuk UX yang lebih baik
    const timer = setTimeout(() => {
      setVisibleProjects(initialProjects);
      setLoadedCount(initialCount);
      
      // Jika semua proyek sudah dimuat secara awal
      if (initialCount >= filteredProjects.length) {
        setIsLoading(false);
        return;
      }
      
      // Jika masih ada proyek yang belum dimuat, muat secara bertahap
      const interval = setInterval(() => {
        setLoadedCount(prev => {
          const newCount = prev + 1;
          if (newCount <= filteredProjects.length) {
            setVisibleProjects(filteredProjects.slice(0, newCount));
          }
          if (newCount >= filteredProjects.length) {
            clearInterval(interval);
            setIsLoading(false); // Set loading ke false setelah semua dimuat
          }
          return newCount;
        });
      }, (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g' || connection?.saveData) ? 1000 : 500);
      
      return () => clearInterval(interval);
    }, (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g' || connection?.saveData) ? 800 : 400);
    
    return () => clearTimeout(timer);
  }, [filter, filteredProjects, connection.isSlowConnection]);
  
  // Handler untuk klik proyek
  const handleProjectClick = (project) => {
    console.log(`Navigating to project with ID: ${project.id}`);
    
    // Tambahkan elemen loading sebelum navigasi
    const loadingElement = document.createElement('div');
    loadingElement.id = 'project-loading';
    loadingElement.style.position = 'fixed';
    loadingElement.style.top = '0';
    loadingElement.style.left = '0';
    loadingElement.style.width = '100%';
    loadingElement.style.height = '100%';
    loadingElement.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    loadingElement.style.zIndex = '9999';
    loadingElement.style.display = 'flex';
    loadingElement.style.justifyContent = 'center';
    loadingElement.style.alignItems = 'center';
    loadingElement.style.transition = 'opacity 0.5s ease';
    
    // Tambahkan konten loading
    loadingElement.innerHTML = `
      <div class="hello-transition hello-fade-in">
        <div class="hello-overlay">
          <div class="hello-content">
            <div class="hello-loading-text">Memuat...</div>
            <div class="hello-progress-container">
              <div class="hello-progress-track">
                <div class="hello-progress-bar" style="width: 95%; transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"></div>
                <div class="hello-progress-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(loadingElement);
    
    // Navigasi ke halaman proyek yang dioptimalkan
    router.push(`/optimized-projects/${project.id}`);
  };
  
  // Variasi animasi berdasarkan preferensi pengguna
  const titleVariants = useLightAnimations
    ? {
        // Animasi ringan
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } }
      }
    : {
        // Animasi penuh
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.6 
          }
        }
      };
      
  // Konfigurasi animasi untuk container proyek
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: useLightAnimations ? 0.1 : 0.2,
      },
    },
  };

  // Konfigurasi animasi untuk item proyek
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: useLightAnimations ? 0.3 : 0.5,
      },
    },
  };
  
  return (
    <section id="projects" className="section-alt py-12 md:py-20 dark:bg-gray-900 theme-dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-h1 font-heading text-gray-900 dark:text-gray-50 theme-dark:text-gray-50 mb-4">
            {projectPageText.title}
          </h2>
          <div className="w-16 md:w-20 h-1 bg-primary-blue mx-auto mb-4 md:mb-6"></div>
          <p className="max-w-2xl mx-auto text-sm md:text-body text-secondary-darkGray dark:text-gray-300 theme-dark:text-gray-300 px-2">
            {projectPageText.description}
          </p>
        </motion.div>

        <div className="filter-btns-container mb-8 md:mb-12">
          <GlassButton
            items={categories.map(category => ({
              icon: null,
              color: filter === category ? 'blue' : 'transparent',
              label: category,
              onClick: () => setFilter(category),
              customClass: filter === category ? 'active' : ''
            }))}
            className="filter-btns"
          />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="loader">
              <div className="spinner"></div>
              <p className="mt-4 text-secondary-darkGray dark:text-gray-300">Memuat proyek...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Komponen OptimizedProjects dengan AnimatePresence */}
            <AnimatePresence>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <OptimizedProjects 
                  projects={visibleProjects} 
                  onProjectClick={handleProjectClick}
                  itemVariants={itemVariants}
                />
              </motion.div>
            </AnimatePresence>

            {/* Loading indicator for remaining projects */}
            {loadedCount < filteredProjects.length && (
              <div className="flex justify-center mt-8">
                <div className="loader">
                  <div className="spinner"></div>
                  <p className="mt-2 text-sm text-secondary-darkGray dark:text-gray-300">
                    Memuat {loadedCount} dari {filteredProjects.length} proyek
                  </p>
                </div>
              </div>
            )}

            {/* No projects message */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-8 md:py-12">
                <p className="text-sm md:text-body text-secondary-darkGray dark:text-gray-300">
                  Belum ada proyek dalam kategori ini.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}