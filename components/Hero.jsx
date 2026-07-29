'use client';
import { useState, useEffect } from 'react';
import BlurGradientText from './BlurGradientText';
import FloatingLines from './FloatingLines';
import { useProfile } from '../hooks/useProfile';
import { useAnimationReady } from '../hooks/useAnimationReady';

export default function Hero() {
  const isAnimationReady = useAnimationReady();
  const { profile } = useProfile();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* FloatingLines Background - Hanya untuk section Beranda/Hero */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {isMobile ? (
          <div
            className="w-full h-full"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, #1E40AF 0%, #0f172a 50%, #000 100%)'
            }}
          />
        ) : (
          <FloatingLines
            linesGradient={['#3B82F6', '#1E40AF', '#6366F1', '#4F46E5']}
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[10, 15, 20]}
            lineDistance={[8, 6, 4]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
            animationSpeed={0.8}
          />
        )}
      </div>

      {/* Overlay subtle blur/darken */}
      <div className="absolute inset-0 z-[1] bg-black/30 backdrop-blur-sm pointer-events-none" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Centered Content */}
        <div className="text-center w-full mx-auto">
          {/* Main Heading with Obys Agency Style GSAP Reveal Animation */}
          <BlurGradientText
            text={profile.name}
            delay={150}
            animateBy="words"
            isReady={isAnimationReady}
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={8}
            className="hero-name-gradient"
          />
        </div>
      </div>
    </section>
  );
}

