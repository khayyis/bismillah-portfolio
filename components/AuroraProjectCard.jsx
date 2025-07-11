'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Aurora from './Aurora';
import './ProfileCard.css';
import './AuroraProjectCard.css';

const AuroraProjectCard = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const wrapRef = useRef(null);
  
  // Motion values untuk efek tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Nilai spring untuk animasi yang lebih halus
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), {
    stiffness: 300,
    damping: 30
  });
  
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), {
    stiffness: 300,
    damping: 30
  });
  
  const scale = useSpring(1, {
    stiffness: 300,
    damping: 30
  });
  
  // Variabel CSS untuk efek ProfileCard
  useEffect(() => {
    if (!wrapRef.current) return;
    
    // Set default gradient
    wrapRef.current.style.setProperty('--behind-gradient', 
      "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)");
    
    // Set inner gradient
    wrapRef.current.style.setProperty('--inner-gradient', 
      "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)");
    
    // Set sunpillar colors based on project colors if available
    if (project.colorStops && project.colorStops.length >= 3) {
      wrapRef.current.style.setProperty('--sunpillar-1', project.colorStops[0]);
      wrapRef.current.style.setProperty('--sunpillar-3', project.colorStops[1]);
      wrapRef.current.style.setProperty('--sunpillar-5', project.colorStops[2]);
    }
  }, [project.colorStops]);

  function handleMouseMove(e) {
    if (!cardRef.current || !wrapRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    // Set motion values untuk efek tilt
    const mouseX = e.clientX - (rect.left + width / 2);
    const mouseY = e.clientY - (rect.top + height / 2);
    x.set(mouseX);
    y.set(mouseY);
    
    // Hitung persentase untuk variabel CSS ProfileCard
    const percentX = Math.min(Math.max((100 / width) * offsetX, 0), 100);
    const percentY = Math.min(Math.max((100 / height) * offsetY, 0), 100);
    
    const centerX = percentX - 50;
    const centerY = percentY - 50;
    
    // Update variabel CSS untuk efek ProfileCard
    const properties = {
      "--pointer-x": `${percentX}%`,
      "--pointer-y": `${percentY}%`,
      "--background-x": `${35 + (percentX * 0.3)}%`,
      "--background-y": `${35 + (percentY * 0.3)}%`,
      "--pointer-from-center": `${Math.min(Math.hypot(percentY - 50, percentX - 50) / 50, 1)}`,
      "--pointer-from-top": `${percentY / 100}`,
      "--pointer-from-left": `${percentX / 100}`,
      "--card-opacity": isHovered ? "1" : "0"
    };
    
    Object.entries(properties).forEach(([property, value]) => {
      wrapRef.current.style.setProperty(property, value);
    });
  }

  function handleMouseEnter() {
    setIsHovered(true);
    scale.set(1.05);
    
    if (wrapRef.current) {
      wrapRef.current.style.setProperty('--card-opacity', '1');
      wrapRef.current.classList.add('active');
    }
  }

  function handleMouseLeave() {
    setIsHovered(false);
    scale.set(1);
    x.set(0);
    y.set(0);
    
    if (wrapRef.current) {
      wrapRef.current.style.setProperty('--card-opacity', '0');
      wrapRef.current.classList.remove('active');
      
      // Reset posisi pointer
      const properties = {
        "--pointer-x": "50%",
        "--pointer-y": "50%",
        "--background-x": "50%",
        "--background-y": "50%",
        "--pointer-from-center": "0",
        "--pointer-from-top": "0.5",
        "--pointer-from-left": "0.5"
      };
      
      Object.entries(properties).forEach(([property, value]) => {
        wrapRef.current.style.setProperty(property, value);
      });
    }
  }

  return (
    <div ref={wrapRef} className="pc-card-wrapper">
      <motion.div
        ref={cardRef}
        className="project-card pc-card"
        style={{ 
          rotateX, 
          rotateY, 
          scale,
          transformStyle: "preserve-3d"
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(project.id)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Menghapus judul di bagian atas kartu untuk mengurangi jumlah judul yang ditampilkan */}
        
        {/* ProfileCard shine effect */}
        <div className="pc-shine"></div>
        
        {/* ProfileCard glare effect */}
        <div className="pc-glare"></div>
        
        {/* Inside content with glass effect */}
        <div className="pc-inside relative z-10 flex flex-col h-full backdrop-blur-sm rounded-xl overflow-hidden">
          <div className="project-image-container">
            <Image 
              src={project.image} 
              alt={`${project.title} - ${project.category}`} 
              className="project-image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={project.id === 1}
            />
          </div>
          <div 
            className="project-info"
            style={{ transform: "translateZ(40px)" }}
          >
            <h3 className="project-title">{project.title}</h3>
            <p className="project-status">{project.status}</p>
            <div className="project-category">{project.category}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuroraProjectCard;