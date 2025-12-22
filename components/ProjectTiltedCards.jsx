'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassButton from "./GlassButton";
import "./GlassButton.css";
import "./ProjectTiltedCards.css";
import { useRouter } from 'next/navigation';
import projectsData from '../config/projectsData';
import AuroraProjectCard from './AuroraProjectCard';

// Menggunakan data proyek dari file konfigurasi
const { projects, categories } = projectsData;

export default function ProjectTiltedCards() {
  const [filter, setFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const router = useRouter();

  // Efek untuk simulasi loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = filter === 'Semua'
    ? projects
    : projects.filter(project => project.category === filter);

  const handleProjectClick = (id) => {
    console.log(`Navigating to project with ID: ${id}`);

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

    // Navigasi ke halaman proyek
    router.push(`/projects/${id}`);
  };

  const handleProjectHover = (id) => {
    setHoveredId(id);
  };

  const handleProjectLeave = () => {
    setHoveredId(null);
  };

  return (
    <section id="projects" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-h1 font-heading text-gray-900 dark:text-gray-50 theme-dark:text-gray-50 mb-4">
            {projectsData.projectPageText.title}
          </h2>
          <div className="w-16 md:w-20 h-1 bg-primary-blue mx-auto mb-4 md:mb-6"></div>
          <p className="max-w-2xl mx-auto text-sm md:text-body text-secondary-darkGray dark:text-gray-300 theme-dark:text-gray-300 px-2">
            {projectsData.projectPageText.description}
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

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="text-sm md:text-body text-secondary-darkGray dark:text-gray-300 theme-dark:text-gray-300">
              Memuat proyek...
            </p>
          </div>
        ) : (
          <motion.div
            className="projects-grid"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="project-tilted-card-container"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                onMouseEnter={() => handleProjectHover(project.id)}
                onMouseLeave={handleProjectLeave}
                style={{
                  zIndex: hoveredId === project.id ? 10 : 1,
                  transition: 'z-index 0.1s'
                }}
              >
                <AuroraProjectCard
                  project={project}
                  onClick={handleProjectClick}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-8 md:py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm md:text-body text-secondary-darkGray dark:text-gray-300 theme-dark:text-gray-300">
              Belum ada proyek dalam kategori ini.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}