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

  // Center HI Anchor: Visible at start (1), fades out as fragments assemble (0.25 -> 0.45)
  const hiOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 1, 0]);
  const hiScale = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 1.08, 1.3]);
  const hiY = useTransform(scrollYProgress, [0.25, 0.45], [0, -60]);

  // Fragment 0: Header "TENTANG SAYA" (Flies in from top)
  const headerY = useTransform(scrollYProgress, [0, 0.50], [-250, 0]);
  const headerRotate = useTransform(scrollYProgress, [0, 0.50], [-15, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.50], [0.6, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.50], [0.4, 1]);

  // Fragment 1: Profile Card (Visible at start at top-left, converges to 0,0)
  const cardX = useTransform(scrollYProgress, [0, 0.60], [-550, 0]);
  const cardY = useTransform(scrollYProgress, [0, 0.60], [-220, 0]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.60], [-28, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.60], [0.55, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.60], [0.6, 1]);

  // Fragment 2: School Title "SMKN 4 Jakarta" (Visible at start at top-right, converges to 0,0)
  const schoolX = useTransform(scrollYProgress, [0, 0.68], [520, 0]);
  const schoolY = useTransform(scrollYProgress, [0, 0.68], [-180, 0]);
  const schoolRotate = useTransform(scrollYProgress, [0, 0.68], [22, 0]);
  const schoolScale = useTransform(scrollYProgress, [0, 0.68], [0.6, 1]);
  const schoolOpacity = useTransform(scrollYProgress, [0, 0.68], [0.6, 1]);

  // Fragment 3: Bio Text (Visible at start at bottom-right, converges to 0,0)
  const bioX = useTransform(scrollYProgress, [0, 0.80], [580, 0]);
  const bioY = useTransform(scrollYProgress, [0, 0.80], [280, 0]);
  const bioRotate = useTransform(scrollYProgress, [0, 0.80], [-18, 0]);
  const bioScale = useTransform(scrollYProgress, [0, 0.80], [0.6, 1]);
  const bioOpacity = useTransform(scrollYProgress, [0, 0.80], [0.6, 1]);

  // Fragment 4: Contact Button (Visible at start at bottom, shoots up to 0,0)
  const btnY = useTransform(scrollYProgress, [0, 0.95], [380, 0]);
  const btnRotate = useTransform(scrollYProgress, [0, 0.95], [12, 0]);
  const btnScale = useTransform(scrollYProgress, [0, 0.95], [0.5, 1]);
  const btnOpacity = useTransform(scrollYProgress, [0, 0.95], [0.6, 1]);

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
    <section id="about" ref={containerRef} className="relative h-[380vh] w-full bg-[#030712] text-white overflow-hidden">
      {/* Meteor Stars Background Field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_15px_#3b82f6]"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_20px_#22d3ee]"></div>
        <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_12px_#3b82f6]"></div>
        <div className="absolute top-1/3 left-4/5 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_22px_#818cf8]"></div>
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-6 md:py-12">
        
        {/* Center HI Greeting Anchor */}
        <motion.div
          style={{ opacity: hiOpacity, scale: hiScale, y: hiY }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-4 text-center bg-[#030712]/70 backdrop-blur-sm"
        >
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-sm md:text-base font-semibold mb-6 shadow-lg shadow-blue-500/20">
            Halo! 👋
          </div>
          <h1 className="text-7xl md:text-9xl lg:text-[13rem] font-black tracking-tight text-white drop-shadow-[0_15px_45px_rgba(59,130,246,0.5)]">
            HI
          </h1>
          <p className="mt-4 text-gray-300 text-base md:text-xl max-w-md font-medium tracking-wide">
            Scroll ke bawah untuk merakit komponen portofolio
          </p>
          <div className="mt-8 flex flex-col items-center animate-bounce opacity-80">
            <span className="text-xs text-blue-400 font-mono tracking-widest uppercase mb-1">Scroll Down</span>
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>

        {/* Main Content Viewport (Assembled Meteor Fragments) */}
        <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 relative z-10 w-full">
          
          {/* Fragment 0: Header "TENTANG SAYA" */}
          <motion.div
            style={{
              y: headerY,
              rotate: headerRotate,
              scale: headerScale,
              opacity: headerOpacity,
            }}
            className="text-center mb-6 md:mb-10 will-change-transform"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-wider">
              TENTANG SAYA
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto mt-3 rounded-full"></div>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-14">
            
            {/* Meteor Fragment 1: Profile Card */}
            <motion.div
              style={{
                x: cardX,
                y: cardY,
                rotate: cardRotate,
                scale: cardScale,
                opacity: cardOpacity,
              }}
              className="w-full md:w-2/5 lg:w-5/12 flex justify-center md:justify-start will-change-transform drop-shadow-[0_0_35px_rgba(59,130,246,0.4)]"
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

            {/* Right Column: Fragments 2, 3, 4 */}
            <div className="w-full md:w-3/5 lg:w-7/12 md:pl-6 lg:pl-10 flex flex-col justify-center">
              
              {/* Meteor Fragment 2: School Title */}
              <motion.h3
                style={{
                  x: schoolX,
                  y: schoolY,
                  rotate: schoolRotate,
                  scale: schoolScale,
                  opacity: schoolOpacity,
                }}
                className="text-2xl md:text-3xl font-bold mb-4 text-blue-400 will-change-transform"
              >
                {profile.school}
              </motion.h3>

              {/* Meteor Fragment 3: Bio Text */}
              <motion.div
                style={{
                  x: bioX,
                  y: bioY,
                  rotate: bioRotate,
                  scale: bioScale,
                  opacity: bioOpacity,
                }}
                className="mb-6 will-change-transform"
              >
                <ScrollReveal
                  baseOpacity={1}
                  enableBlur={true}
                  baseRotation={2}
                  blurStrength={15}
                  wordAnimationEnd="center center"
                  textClassName="text-gray-200 text-base md:text-lg leading-relaxed md:text-justify font-normal"
                >
                  {profile.about}
                </ScrollReveal>
              </motion.div>

              {/* Meteor Fragment 4: Contact Button */}
              <motion.div
                style={{
                  y: btnY,
                  rotate: btnRotate,
                  scale: btnScale,
                  opacity: btnOpacity,
                }}
                className="w-[220px] will-change-transform"
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