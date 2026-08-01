'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProfileCard from './ProfileCard';
import GlareHover from './GlareHover';
import ScrollReveal from './ScrollReveal';
import './GlareHover.css';
import { useProfile } from '../hooks/useProfile';
import { useAnimationReady } from '../hooks/useAnimationReady';

const About = () => {
  const containerRef = useRef(null);
  const isAnimationReady = useAnimationReady(100);
  const { profile } = useProfile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Stage 1: HI Greeting (0.00 - 0.25)
  const hiOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.26], [0, 1, 1, 0]);
  const hiScale = useTransform(scrollYProgress, [0, 0.15, 0.26], [0.8, 1.1, 1.4]);
  const hiY = useTransform(scrollYProgress, [0.18, 0.26], [0, -50]);

  // Stage 2: Header & Profile Card (0.25 - 0.50)
  const stage2Opacity = useTransform(scrollYProgress, [0.22, 0.35], [0, 1]);
  const stage2Y = useTransform(scrollYProgress, [0.22, 0.35], [60, 0]);

  // Stage 3: School Title & Partial Bio (0.50 - 0.75)
  const stage3Opacity = useTransform(scrollYProgress, [0.45, 0.58], [0, 1]);
  const stage3Y = useTransform(scrollYProgress, [0.45, 0.58], [40, 0]);

  // Stage 4: Full Bio & Contact Button (0.75 - 1.00)
  const stage4Opacity = useTransform(scrollYProgress, [0.70, 0.82], [0, 1]);
  const stage4Y = useTransform(scrollYProgress, [0.70, 0.82], [30, 0]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('kontak');
    if (contactSection) {
      const targetPosition = contactSection.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = Math.min(Math.abs(distance) / 2, 1200);

      let start = null;
      const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <section id="about" ref={containerRef} className="relative h-[350vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-12 md:py-16 text-white">
        
        {/* Stage 1: HI Greeting Overlay */}
        <motion.div
          style={{ opacity: hiOpacity, scale: hiScale, y: hiY }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4 text-center"
        >
          <div className="inline-block px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm md:text-base font-medium mb-4 backdrop-blur-sm shadow-lg shadow-blue-500/10">
            Halo! 👋
          </div>
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter bg-gradient-to-r from-white via-blue-100 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(59,130,246,0.3)]">
            HI
          </h1>
          <p className="mt-4 text-gray-400 text-sm md:text-lg max-w-md font-medium">
            Scroll ke bawah untuk mengenal saya lebih dekat
          </p>
        </motion.div>

        {/* Stage 2, 3, 4: Main Content Container */}
        <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 relative z-10 w-full">
          
          {/* Header "TENTANG SAYA" (Enters at Stage 2) */}
          <motion.div
            style={{ opacity: stage2Opacity, y: stage2Y }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide">
              TENTANG SAYA
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-14">
            
            {/* Profile Card (Enters at Stage 2) */}
            <motion.div
              style={{ opacity: stage2Opacity, y: stage2Y }}
              className="w-full md:w-2/5 lg:w-5/12 flex justify-center md:justify-start"
            >
              <ProfileCard
                name={profile.name}
                title={profile.title}
                handle={profile.handle}
                status={profile.status}
                contactText={profile.contactText}
                avatarUrl={profile.avatarUrl}
                miniAvatarUrl={profile.miniAvatarUrl}
                showUserInfo={true}
                enableTilt={true}
                onContactClick={scrollToContact}
              />
            </motion.div>

            {/* Right Column: School & Bio & Button */}
            <div className="w-full md:w-3/5 lg:w-7/12 md:pl-6 lg:pl-10 flex flex-col justify-center">
              
              {/* Stage 3: School Title */}
              <motion.h3
                style={{ opacity: stage3Opacity, y: stage3Y }}
                className="text-2xl md:text-3xl font-bold mb-4 text-blue-400"
              >
                {profile.school}
              </motion.h3>

              {/* Stage 3 & 4: Bio Text */}
              <motion.div
                style={{ opacity: stage3Opacity, y: stage3Y }}
                className="mb-6"
              >
                <ScrollReveal
                  baseOpacity={1}
                  enableBlur={true}
                  baseRotation={2}
                  blurStrength={15}
                  wordAnimationEnd="center center"
                  textClassName="text-gray-300 text-base md:text-lg leading-relaxed md:text-justify"
                >
                  {profile.about}
                </ScrollReveal>
              </motion.div>

              {/* Stage 4: Contact Button */}
              <motion.div
                style={{ opacity: stage4Opacity, y: stage4Y }}
                className="w-[220px]"
              >
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
                      {profile.contactButtonText}
                    </div>
                    <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                      Hubungi saya
                    </span>
                  </button>
                </GlareHover>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;