'use client';
import { motion } from 'framer-motion';
import BlurGradientText from './BlurGradientText';
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
          initial={{ opacity: 0 }}
          animate={isAnimationReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center w-full mx-auto"
        >
          {/* Main Heading with Blur + Gradient Animation */}
          <BlurGradientText
            text={profile.name}
            delay={120}
            animateBy="words"
            direction="top"
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={8}
            className="hero-name-gradient"
          />
        </motion.div>
      </div>
    </section>
  );
}
