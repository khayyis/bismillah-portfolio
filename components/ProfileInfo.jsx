'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GlareHover from './GlareHover';
import './GlareHover.css';
import './ProfileInfo.css';
import { useProfile } from '../hooks/useProfile';

export default function ProfileInfo() {
  const { profile } = useProfile();

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 profile-info-section">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="profile-info-container">
          {/* Kolom kiri - Informasi profil */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="profile-info-text"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              {profile.name}
            </h2>

            <div className="mb-4">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Siswa {profile.school}
              </p>
              <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                {profile.title}
              </p>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {profile.about}
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
                <a
                  href="#kontak"
                  className="px-6 h-full flex items-center justify-center text-blue-600 font-semibold text-sm md:text-base no-underline select-none bg-transparent border-none relative group"
                  title="Hubungi saya"
                >
                  <div className="button-text flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {profile.contactButtonText || 'Hubungi Saya'}
                  </div>
                </a>
              </GlareHover>
            </div>
          </motion.div>

          {/* Kolom kanan - Foto profil */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="profile-info-image"
          >
            {/* Foto profil */}
            <div className="relative w-[280px] md:w-[320px] lg:w-[380px] mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-primary-blue to-accent-brightBlue p-1 transform hover:scale-[1.02] transition-transform duration-300">
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