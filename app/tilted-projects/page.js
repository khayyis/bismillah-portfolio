'use client';
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProjectTiltedCards from '../../components/ProjectTiltedCards';
import '../../components/ProjectTiltedCards.css';
import projectsData from '../../config/projectsData';

export default function TiltedProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20 pb-16"
      >
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {projectsData.projectPageText.title}
              </h1>
              <div className="w-20 h-1 bg-primary-blue mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
                {projectsData.projectPageText.description}
              </p>
            </motion.div>
          </div>
          
                    <ProjectTiltedCards />
        </motion.div>
      
      <Footer />
    </main>
  );
}