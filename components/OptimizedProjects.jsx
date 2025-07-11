'use client';

import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import OptimizedAuroraCard from './OptimizedAuroraCard';
import { ConnectionContext } from './ConnectionProvider';

/**
 * OptimizedProjects - Versi yang dioptimalkan dari komponen Projects
 * Menampilkan daftar proyek dengan animasi yang dioptimalkan
 * @param {Object} props - Properties komponen
 * @param {Array} props.projects - Array proyek yang akan ditampilkan
 * @param {Function} props.onProjectClick - Handler untuk klik proyek
 * @param {Object} props.itemVariants - Variasi animasi untuk item proyek
 */
export default function OptimizedProjects({ projects = [], onProjectClick, itemVariants }) {
  // Gunakan context koneksi
  const { connection, device } = useContext(ConnectionContext);
  
  // Tentukan apakah harus menggunakan animasi ringan
  const useLightAnimations = connection.isSlowConnection || device.isLowEndDevice;
  
  // Gunakan itemVariants yang diberikan atau buat default
  const defaultItemVariants = useLightAnimations
    ? {
        // Animasi ringan
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }
    : {
        // Animasi penuh
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { 
            type: 'spring',
            stiffness: 100,
            damping: 15
          }
        }
      };
      
  // Gunakan itemVariants yang diberikan atau default
  const effectiveItemVariants = itemVariants || defaultItemVariants;
  
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div 
          key={project.id || index}
          variants={effectiveItemVariants}
          className="h-[350px]"
        >
          <OptimizedAuroraCard
            title={project.title}
            description={project.description}
            image={project.image}
            colorStops={project.colorStops}
            status={project.status}
            onClick={() => onProjectClick && onProjectClick(project)}
          />
        </motion.div>
      ))}
    </div>
  );
}