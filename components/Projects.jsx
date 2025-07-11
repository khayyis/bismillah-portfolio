'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AuroraCard from './AuroraCard';
import GlassButton from "./GlassButton";
import "./GlassButton.css";
import { useRef, useEffect } from 'react';
import "./ProjectsBlurEffect.css";
import { useRouter } from 'next/navigation';
import { FiFilter, FiCheck } from 'react-icons/fi';

// Data proyek
const projectsData = [
  // Semua proyek telah dihapus sesuai permintaan
];

const categories = ['Semua', 'Robotik', 'Desain 3D', 'AI', 'Fotografi'];

export default function Projects() {
  const [filter, setFilter] = useState('Semua');
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const projectsContainerRef = useRef(null);
  const router = useRouter();
  
  const filteredProjects = filter === 'Semua' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

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
  
  const handleCardHover = (id) => {
    setHoveredCardId(id);
    // Tambahkan class ke container untuk efek global
    if (projectsContainerRef.current) {
      projectsContainerRef.current.classList.add('has-hovered-card');
    }
    
    // Blur effect disabled
    // if (typeof window.handleGlobalBlur === 'function') {
    //   window.handleGlobalBlur(true);
    // }
    
    // Tambahkan class 'hovered' ke card yang dihover tanpa efek blur
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      if (parseInt(card.getAttribute('data-id')) !== id) {
        // card.classList.add('blurred'); // Disabled blur effect
      } else {
        card.classList.add('hovered');
        // card.classList.remove('blurred'); // Not needed anymore
      }
    });
  };
  
  const handleCardLeave = () => {
    setHoveredCardId(null);
    // Hapus class dari container
    if (projectsContainerRef.current) {
      projectsContainerRef.current.classList.remove('has-hovered-card');
    }
    
    // Blur effect disabled
    // if (typeof window.handleGlobalBlur === 'function') {
    //   window.handleGlobalBlur(false);
    // }
    
    // Hapus class 'hovered' dari semua card
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      // card.classList.remove('blurred'); // Disabled blur effect
      card.classList.remove('hovered');
    });
  };
  
  // Efek untuk membersihkan state saat komponen unmount
  useEffect(() => {
    return () => {
      // Cleanup function
      setHoveredCardId(null);
    };
  }, []);

  return (
    <section id="projects" className="section-alt py-12 md:py-20 dark:bg-gray-900 theme-dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-h1 font-heading text-gray-900 dark:text-gray-50 theme-dark:text-gray-50 mb-4">Proyek Saya</h2>
          <div className="w-16 md:w-20 h-1 bg-primary-blue mx-auto mb-4 md:mb-6"></div>
          <p className="max-w-2xl mx-auto text-sm md:text-body text-secondary-darkGray dark:text-gray-300 theme-dark:text-gray-300 px-2">
            Berbagai proyek yang telah dan sedang saya kerjakan dalam bidang robotik, desain 3D, dan teknologi AI.
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

        <div 
          ref={projectsContainerRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 relative projects-grid ${hoveredCardId !== null ? 'has-hovered-card' : ''}`}
          style={{ 
            transition: 'all 0.5s ease-in-out',
            position: 'relative',
          }}
        >
          {/* Overlay for darkening effect */}
          <div 
            className={`projects-overlay ${hoveredCardId !== null ? 'active' : ''}`}
            style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              right: '-20px',
              bottom: '-20px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)', // Reduced darkness
              opacity: hoveredCardId !== null ? 0.7 : 0, // Reduced opacity
              transition: 'opacity 0.5s ease-in-out',
              pointerEvents: 'none',
              zIndex: 5,
              borderRadius: '16px',
              clipPath: hoveredCardId !== null ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'none',
              // backdrop-filter removed to disable blur effect
            }}
          />
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: project.id * 0.1 }}
              className={`relative project-card ${hoveredCardId === project.id ? 'hovered no-blur' : hoveredCardId !== null ? 'blurred' : ''}`}
              style={{
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCardId === project.id ? 'scale(1.05)' : 'scale(1)',
                position: 'relative',
                zIndex: hoveredCardId === project.id ? 100 : 'auto',
                // filter: hoveredCardId === project.id ? 'blur(0) brightness(1)' : hoveredCardId !== null ? 'blur(4px) brightness(0.5)' : 'none', // Disabled blur effect
                opacity: hoveredCardId === project.id ? 1 : hoveredCardId !== null ? 0.85 : 1, // Adjusted opacity for better visibility
              }}
              data-id={project.id}
              onMouseEnter={() => handleCardHover(project.id)}
              onMouseLeave={handleCardLeave}
            >
              <AuroraCard
                title={project.title}
                category={project.category}
                description={project.description}
                imageSrc={project.image}
                status={project.status}
                onClick={() => handleProjectClick(project.id)}
                priority={project.id === 1}
                colorStops={project.colorStops}
                id={project.id}
              />
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <p className="text-sm md:text-body text-secondary-darkGray">
              Belum ada proyek dalam kategori ini.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}