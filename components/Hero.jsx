'use client';
import { motion } from 'framer-motion';
import GlareHover from './GlareHover';
import GradientText from './GradientText';
import './GlareHover.css';
import { useProfile } from '../hooks/useProfile';
import { useAnimationReady } from '../hooks/useAnimationReady';

export default function Hero() {
  const isAnimationReady = useAnimationReady();
  const { profile } = useProfile();

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >


          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={8}
              showBorder={false}
              className="hero-name-gradient"
            >
              {profile.name}
            </GradientText>
          </h1>


        </motion.div>
      </div>
    </section>
  );
}