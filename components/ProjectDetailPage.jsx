'use client';

import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ConnectionContext } from './ConnectionProvider';
import optimizedProjectsData from '../config/optimizedProjectsData';
import OptimizedImage from './OptimizedImage';
import Link from 'next/link';
import Aurora from './Aurora';

/**
 * Komponen untuk menampilkan halaman detail proyek
 * @param {Object} props - Properties komponen
 * @param {string} props.projectId - ID proyek yang akan ditampilkan
 */
const ProjectDetailPage = ({ projectId }) => {
  const { connection, device } = useContext(ConnectionContext);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efek untuk memuat data proyek berdasarkan ID
  useEffect(() => {
    // Reset loading state saat projectId berubah
    setLoading(true);
    
    // Cari proyek dari data yang sudah ada
    const foundProject = optimizedProjectsData.projects.find(
      (p) => p.id === parseInt(projectId)
    );
    
    // Menghapus elemen loading yang ditambahkan saat navigasi
    const loadingElement = document.getElementById('project-loading');
    if (loadingElement) {
      // Animasi fade out sebelum menghapus elemen
      loadingElement.style.opacity = '0';
      setTimeout(() => {
        loadingElement.remove();
      }, 500);
    }
    
    // Simulasi loading untuk UX yang lebih baik
    const timer = setTimeout(() => {
      setProject(foundProject || null);
      setLoading(false);
    }, (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g' || connection?.saveData) ? 500 : 200);

    return () => clearTimeout(timer);
  }, [projectId, connection?.effectiveType, connection?.saveData]);

  // Jika loading, tampilkan skeleton loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl p-6 rounded-lg bg-opacity-10 backdrop-blur-sm">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Jika proyek tidak ditemukan
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl font-bold mb-4">Proyek Tidak Ditemukan</h1>
        <p className="mb-6">Maaf, proyek yang Anda cari tidak tersedia.</p>
        <Link href="/optimized-projects">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Kembali ke Daftar Proyek
          </button>
        </Link>
      </div>
    );
  }

  // Tentukan apakah harus menggunakan animasi ringan
  const useLightAnimations = connection?.effectiveType === 'slow-2g' || 
                           connection?.effectiveType === '2g' || 
                           connection?.saveData || 
                           device?.isLowEndDevice || 
                           device?.isReducedMotion;
  
  // Konfigurasi animasi berdasarkan koneksi dan perangkat
  const animations = {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: useLightAnimations ? 0.1 : 0.2,
          duration: useLightAnimations ? 0.3 : 0.5,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: useLightAnimations ? 0.3 : 0.5,
        },
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Aurora effect */}
      <div className="fixed inset-0 z-0">
        <Aurora 
          colorStops={project.colorStops} 
          amplitude={0.3} 
          speed={useLightAnimations ? 0.1 : 0.2} 
          blend={0.8} 
        />
      </div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto py-12 px-4 sm:px-6"
        variants={animations.container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={animations.item} className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="px-3 py-1 bg-opacity-20 backdrop-blur-sm bg-white dark:bg-gray-800 rounded-full text-sm">
              {project.category}
            </span>
            <span className="px-3 py-1 bg-opacity-20 backdrop-blur-sm bg-white dark:bg-gray-800 rounded-full text-sm">
              {project.status}
            </span>
          </div>
          <p className="text-lg max-w-2xl mx-auto">{project.description}</p>
        </motion.div>

        {/* Project Image */}
        <motion.div variants={animations.item} className="mb-12">
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-xl">
            <OptimizedImage
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority={true}
            />
          </div>
        </motion.div>

        {/* Detailed Content */}
        <motion.div 
          variants={animations.item}
          className="bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Tentang Proyek</h2>
          <p className="mb-6">{project.detailedDescription?.overview}</p>

          {/* Technology */}
          {project.detailedDescription?.technology && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Teknologi</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.technology.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Features */}
          {project.detailedDescription?.features && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Fitur</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {project.detailedDescription?.challenges && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Tantangan</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {project.detailedDescription?.achievements && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Pencapaian</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {project.detailedDescription?.skills && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Keterampilan</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Software */}
          {project.detailedDescription?.software && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Software</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.software.map((sw, index) => (
                  <li key={index}>{sw}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Project Types */}
          {project.detailedDescription?.projectTypes && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Jenis Proyek</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.projectTypes.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Workflow */}
          {project.detailedDescription?.workflow && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Alur Kerja</h3>
              <ol className="list-decimal pl-5 space-y-1">
                {project.detailedDescription.workflow.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Applications */}
          {project.detailedDescription?.applications && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Aplikasi</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.applications.map((app, index) => (
                  <li key={index}>{app}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specialization */}
          {project.detailedDescription?.specialization && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Spesialisasi</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.specialization.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Equipment */}
          {project.detailedDescription?.equipment && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Peralatan</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.equipment.map((equip, index) => (
                  <li key={index}>{equip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Editing */}
          {project.detailedDescription?.editing && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Editing</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.editing.map((edit, index) => (
                  <li key={index}>{edit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Portfolio */}
          {project.detailedDescription?.portfolio && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Portfolio</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.portfolio.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* AI Types */}
          {project.detailedDescription?.aiTypes && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Jenis AI</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.aiTypes.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {project.detailedDescription?.technologies && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Teknologi</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.technologies.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Integration */}
          {project.detailedDescription?.integration && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Integrasi</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.integration.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Results */}
          {project.detailedDescription?.results && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Hasil</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.results.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Use Cases */}
          {project.detailedDescription?.useCases && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Kasus Penggunaan</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.detailedDescription.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Metrics */}
          {project.detailedDescription?.metrics && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Metrik</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(project.detailedDescription.metrics).map(([key, value], index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Back Button */}
        <motion.div variants={animations.item} className="mt-8 text-center">
          <Link href="/optimized-projects">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Kembali ke Daftar Proyek
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectDetailPage;