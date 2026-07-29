'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import './ObysPreloader.css';

/**
 * ObysPreloader — Obys Agency inspired preloader animation for Khayyis Portfolio.
 * 
 * Phases:
 * 1. Fade in text & line details
 * 2. Animate counter 0 -> 100 & progress bar fill
 * 3. Fade out inner preloader content
 * 4. Split curtain reveal (top slides up, bottom slides down)
 * 5. Complete callback to show main page & enable interactions
 */
export default function ObysPreloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const percentRef = useRef(null);
  const fillRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if session storage already played preloader to prevent annoying repeated delays, if preferred.
    // Or play on every fresh page load for maximum visual impact.
    const DURATION = 2200; // 2.2 seconds counting phase
    const startTime = performance.now();
    let animFrameId = null;

    // Phase 1: Fade in preloader details
    gsap.to(
      [
        '.obys-preloader-title',
        '.obys-preloader-sub',
        '.obys-preloader-percent',
        '.obys-preloader-symbol',
        '.obys-preloader-line'
      ],
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }
    );

    // Phase 2: Animate progress bar & counter 00 -> 100
    const animateCounter = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease progress slightly for smooth count up
      const easedProgress = Math.sin((progress * Math.PI) / 2);
      const value = Math.floor(easedProgress * 100);

      if (fillRef.current) {
        fillRef.current.style.width = `${easedProgress * 100}%`;
      }
      if (percentRef.current) {
        percentRef.current.textContent = value.toString().padStart(2, '0');
      }

      if (progress < 1) {
        animFrameId = requestAnimationFrame(animateCounter);
      }
    };
    animFrameId = requestAnimationFrame(animateCounter);

    // Phase 3: Fade out preloader content
    const timerPhase3 = setTimeout(() => {
      gsap.to(
        [
          '.obys-preloader-title',
          '.obys-preloader-sub',
          '.obys-preloader-percent',
          '.obys-preloader-symbol',
          '.obys-preloader-line'
        ],
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        }
      );
    }, DURATION + 100);

    // Phase 4: Split curtain reveal
    const timerPhase4 = setTimeout(() => {
      gsap.to('.obys-curtain-top', {
        yPercent: -100,
        duration: 1.1,
        ease: 'expo.inOut'
      });

      gsap.to('.obys-curtain-bottom', {
        yPercent: 100,
        duration: 1.1,
        ease: 'expo.inOut',
        onComplete: () => {
          setIsVisible(false);
          if (typeof onComplete === 'function') {
            onComplete();
          }
        }
      });
    }, DURATION + 380);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      clearTimeout(timerPhase3);
      clearTimeout(timerPhase4);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="obys-preloader" ref={containerRef} id="obys-preloader">
      <div className="obys-curtain-top" />
      <div className="obys-curtain-bottom" />

      <div className="obys-preloader-content">
        <div className="obys-preloader-brand">
          <div className="obys-preloader-title">KHAYYIS® PORTOFOLIO</div>
          <div className="obys-preloader-sub">MECHATRONICS &amp; ARTIFICIAL INTELLIGENCE</div>
        </div>

        <div className="obys-preloader-counter">
          <span className="obys-preloader-percent" ref={percentRef}>
            00
          </span>
          <span className="obys-preloader-symbol">%</span>
        </div>
      </div>

      <div className="obys-preloader-line">
        <div className="obys-preloader-line-fill" ref={fillRef} />
      </div>
    </div>
  );
}
