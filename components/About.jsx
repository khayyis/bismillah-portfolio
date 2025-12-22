'use client';
import React from 'react';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard';
import ShinyText from './ShinyText';
import GlareHover from './GlareHover';
import ScrollReveal from './ScrollReveal';
import './GlareHover.css';
import userInfo from '../config/userInfo';

const About = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('kontak');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    scrollToContact();
  };

  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            TENTANG SAYA
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:w-2/5 lg:w-5/12 flex justify-center md:justify-start"
          >
            <ProfileCard
              name={userInfo.name}
              title={userInfo.title}
              handle={userInfo.handle}
              status={userInfo.status}
              contactText={userInfo.contactText}
              avatarUrl={userInfo.avatarUrl}
              miniAvatarUrl={userInfo.miniAvatarUrl}
              showUserInfo={true}
              enableTilt={true}
              onContactClick={handleContactClick}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full md:w-3/5 lg:w-7/12 md:pl-6 lg:pl-10"
          >
            <h3 className="text-2xl font-bold mb-4">{userInfo.school}</h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              {userInfo.about}
            </p>

            <div className="w-[220px]">
              <GlareHover
                height="48px"
                width="100%"
                background="#3B82F6"
                borderRadius="8px"
                glareColor="#ffffff"
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
              >
                <button
                  onClick={scrollToContact}
                  className="w-full h-full flex items-center justify-center text-white font-semibold text-sm md:text-base no-underline select-none bg-transparent border-none relative group"
                  title="Hubungi saya"
                  aria-label="Hubungi saya"
                >
                  <div className="button-text flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {userInfo.contactButtonText}
                  </div>
                  <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                    Hubungi saya
                  </span>
                </button>
              </GlareHover>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;