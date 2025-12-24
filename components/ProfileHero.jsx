'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SplitText from "./SplitText";
import ShinyText from './ShinyText';
import GlareHover from './GlareHover';
import './GlareHover.css';
import './ProfileHero.css';
import { useProfile } from '../hooks/useProfile';

export default function ProfileHero() {
  const { profile } = useProfile();

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('kontak');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split name into parts
  const nameParts = (profile.name || 'Khayyis Billawal Rozikin').split(' ');
  const firstName = nameParts[0] || 'Khayyis';
  const middleName = nameParts[1] || 'Billawal';
  const lastName = nameParts.slice(2).join(' ') || 'Rozikin';

  return (
    <section
      className="relative min-h-screen flex items-center pt-[60px] profile-hero-container"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-secondary-lightGray to-white dark:from-gray-900 dark:to-gray-800 theme-dark:from-gray-900 theme-dark:to-gray-800 z-[-1]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
      ></div>

      <div className="container mx-auto px-4 py-12">
        {/* Grid layout dengan foto di kanan dan teks di kiri */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 profile-content-wrapper">
          {/* Kolom kiri - Informasi profil */}
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 lg:w-3/5 text-center md:text-left profile-text-container"
          >
            <h1 className="text-3xl md:text-4xl lg:text-hero font-hero leading-tight md:leading-hero tracking-tight mb-4 text-gray-900 dark:text-gray-50 theme-dark:text-gray-50">
              <SplitText
                text={`${firstName} `}
                className="inline"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
              <span className="text-primary-blue">
                <SplitText
                  text={`${middleName} `}
                  className="inline"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                />
              </span>
              <SplitText
                text={lastName}
                className="inline"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </h1>

            <p className="text-xl md:text-h2 text-secondary-darkGray dark:text-gray-300 theme-dark:text-gray-300 mb-6">
              Siswa {profile.school} <br />
              <span className="text-primary-blue font-heading">{profile.title}</span>
            </p>

            <p className="text-sm md:text-body text-secondary-darkGray dark:text-gray-300 theme-dark:text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
              {profile.about?.substring(0, 150)}...
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
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
                <button
                  onClick={scrollToContact}
                  className="px-6 h-full flex items-center justify-center text-blue-600 font-semibold text-sm md:text-base no-underline select-none bg-transparent border-none relative group"
                  title="Hubungi saya"
                >
                  <div className="button-text flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {profile.contactButtonText || 'Hubungi Saya'}
                  </div>
                </button>
              </GlareHover>
            </div>
          </motion.div>

          {/* Kolom kanan - Foto profil */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2 lg:w-2/5 flex justify-center md:justify-end profile-image-container"
          >
            {/* Foto profil */}
            <div className="relative w-[280px] md:w-[320px] lg:w-[380px] profile-image-wrapper">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-primary-blue to-accent-brightBlue p-1">
                <div className="bg-secondary-white dark:bg-gray-800 theme-dark:bg-gray-800 h-full w-full rounded-2xl overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={profile.avatarUrl || '/images/khayyis-profile.jpg'}
                      alt={profile.name || 'Profile'}
                      fill
                      sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 380px"
                      style={{ objectFit: 'cover', display: 'block', minHeight: '100%', minWidth: '100%' }}
                      priority
                      className="visible opacity-100 profile-image"
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