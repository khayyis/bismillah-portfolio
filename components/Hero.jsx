'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SplitText from "./SplitText";
import ShinyText from './ShinyText';
import GlareHover from './GlareHover';
import './GlareHover.css';
import Image from 'next/image';
import userInfo from '../config/userInfo';
import '../styles/floating-animation.css';

export default function Hero() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <section 
      id="beranda" 
      className="relative min-h-screen flex items-center pt-[60px]"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-secondary-lightGray to-white dark:from-gray-900 dark:to-gray-800 theme-dark:from-gray-900 theme-dark:to-gray-800 z-[-1]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
      ></div>

      <div className="container mx-auto px-4 py-12 overflow-visible">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1 md:pr-6 overflow-visible w-full md:w-1/2 flex-shrink-0"
          >
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 theme-dark:text-gray-50 inline-block">
                Khayyis Billawal Rozikin
              </h1>
            </div>
            
            <div className="mb-8 max-w-md">
              <div className="flex flex-wrap items-center gap-2 text-lg md:text-xl font-medium text-secondary-darkGray dark:text-gray-300 theme-dark:text-gray-300">
                <span>Siswa SMKN 4 Jakarta</span>
                <span className="text-primary-blue">Teknik Mekatronika</span>
              </div>
              <p className="mt-2 text-sm md:text-base text-secondary-darkGray dark:text-gray-400 theme-dark:text-gray-400 leading-relaxed">
                Berfokus pada pengembangan robotik, desain 3D, dan teknologi AI. Aktif dalam kompetisi LKS Autonomous Mobile Robotic.
              </p>
            </div>
            
            <div className="flex flex-row gap-4">
              <GlareHover
                height="48px"
                width="auto"
                background="#3B82F6"
                borderRadius="8px"
                glareColor="#ffffff"
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
              >
                <a 
                  href="#projects" 
                  className="px-6 h-full flex items-center justify-center text-white font-semibold text-sm md:text-base no-underline select-none bg-transparent border-none relative group"
                  title="Lihat proyek saya"
                >
                  <div className="button-text flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Lihat Proyek
                  </div>
                  <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                    Lihat proyek saya
                  </span>
                </a>
              </GlareHover>
              
              <GlareHover
                height="48px"
                width="auto"
                background="transparent"
                borderRadius="8px"
                borderColor="#2563EB"
                glareColor="#ffffff"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
              >
                <a 
                  href="#kontak" 
                  className="px-6 h-full flex items-center justify-center text-blue-600 font-semibold text-sm md:text-base no-underline select-none bg-transparent border-none relative group"
                  title="Hubungi saya"
                >
                  <div className="button-text flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Hubungi Saya
                  </div>
                  <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                    Hubungi saya
                  </span>
                </a>
              </GlareHover>
            </div>
          </motion.div>
          
          {/* Foto profil dan elemen dekoratif */} 
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2 w-full md:w-1/2 flex justify-center md:justify-end"
          >
            <div className="relative w-[280px] md:w-[320px] lg:w-[380px]">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-primary-blue to-accent-brightBlue p-1">
                <div className="bg-secondary-white dark:bg-gray-800 theme-dark:bg-gray-800 h-full w-full rounded-2xl overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image 
                      src={userInfo.avatarUrl} 
                      alt={userInfo.name} 
                      fill
                      sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 380px"
                      style={{ objectFit: 'cover', display: 'block', minHeight: '100%', minWidth: '100%' }}
                      priority
                      className="visible opacity-100"
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 w-16 md:w-24 h-16 md:h-24 bg-accent-brightBlue/10 rounded-xl z-[-1] floating-element"></div>
              <div className="absolute -bottom-6 -left-6 w-24 md:w-32 h-24 md:h-32 bg-primary-blue/10 rounded-full z-[-1] floating-element"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}