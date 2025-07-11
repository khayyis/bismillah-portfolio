'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlareHover from './GlareHover';
import './GlareHover.css';

export default function SubfolderNavigation() {
  const subfolders = [
    {
      title: 'Proyek Kartu Miring',
      description: 'Lihat proyek dengan tampilan kartu miring interaktif',
      path: '/tilted-projects',
      color: '#3B82F6',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      title: 'Detail Proyek',
      description: 'Lihat detail lengkap dari setiap proyek',
      path: '/projects/1',
      color: '#10B981',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 theme-dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-h1 font-heading text-gray-900 dark:text-gray-50 theme-dark:text-gray-50 mb-4">Jelajahi Portofolio</h2>
          <div className="w-16 md:w-20 h-1 bg-primary-blue mx-auto mb-4 md:mb-6"></div>
          <p className="max-w-2xl mx-auto text-sm md:text-body text-secondary-darkGray dark:text-gray-300 theme-dark:text-gray-300 px-2">
            Temukan berbagai bagian dari portofolio saya dengan tampilan yang berbeda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {subfolders.map((folder, index) => (
            <motion.div
              key={folder.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 theme-dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 theme-dark:text-gray-50 mb-2">{folder.title}</h3>
                <p className="text-sm text-secondary-darkGray dark:text-gray-300 theme-dark:text-gray-300 mb-4">
                  {folder.description}
                </p>
                <GlareHover
                  height="48px"
                  width="auto"
                  background={folder.color}
                  borderRadius="8px"
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                >
                  <Link 
                    href={folder.path} 
                    className="px-6 h-full flex items-center justify-center text-white font-semibold text-sm md:text-base no-underline select-none bg-transparent border-none relative group"
                  >
                    <div className="button-text flex items-center">
                      {folder.icon}
                      Kunjungi
                    </div>
                  </Link>
                </GlareHover>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}