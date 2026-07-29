'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import './ObysPreloader.css';

export default function ObysPreloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const percentRef = useRef(null);
  const lineFillRef = useRef(null);

  useEffect(() => {
    const DURATION = 3200; // 3.2 seconds
    const startTime = performance.now();
    let animFrameId = null;

    // Helper to safely run gsap on selectors if they exist
    const safeGsapTo = (selectors, vars) => {
      const arr = Array.isArray(selectors) ? selectors : [selectors];
      const valid = arr.filter(s => typeof s === 'string' ? document.querySelector(s) : s);
      if (valid.length > 0) {
        gsap.to(valid, vars);
      }
    };

    const safeGsapSet = (selectors, vars) => {
      const arr = Array.isArray(selectors) ? selectors : [selectors];
      const valid = arr.filter(s => typeof s === 'string' ? document.querySelector(s) : s);
      if (valid.length > 0) {
        gsap.set(valid, vars);
      }
    };

    // Phase 1: Fade in preloader details (0 -> 0.8s)
    safeGsapTo(['.preloader-title', '.preloader-percent', '.preloader-line'], {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Phase 2: Animate counter 0 -> 100
    const animateFakeLoader = (now) => {
      const progress = Math.min((now - startTime) / DURATION, 1);
      const value = progress * 100;

      if (lineFillRef.current) {
        lineFillRef.current.style.width = value + '%';
      }
      if (percentRef.current) {
        percentRef.current.textContent = Math.floor(value).toString().padStart(2, '0');
      }

      if (progress < 1) {
        animFrameId = requestAnimationFrame(animateFakeLoader);
      }
    };
    animFrameId = requestAnimationFrame(animateFakeLoader);

    // Phase 3: Fade out loader details
    const timerPhase3 = setTimeout(() => {
      safeGsapTo(['.preloader-title', '.preloader-percent', '.preloader-line'], {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
        onComplete: () => {
          safeGsapSet(['.preloader-title', '.preloader-percent', '.preloader-line'], {
            display: 'none'
          });
        }
      });
    }, DURATION + 50);

    // Phase 4: Split curtain reveal
    const timerPhase4 = setTimeout(() => {
      // Trigger animation right when split curtain begins so text reveals as curtains part
      if (typeof onComplete === 'function') {
        onComplete();
      }
      safeGsapTo('.preloader-top', { yPercent: -100, duration: 1.2, ease: 'expo.inOut' });
      if (document.querySelector('.preloader-bottom')) {
        gsap.to('.preloader-bottom', {
          yPercent: 100,
          duration: 1.2,
          ease: 'expo.inOut',
          onComplete: () => {
            setIsVisible(false);
          }
        });
      } else {
        setIsVisible(false);
      }
    }, DURATION + 250);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      clearTimeout(timerPhase3);
      clearTimeout(timerPhase4);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="preloader" id="preloader">
      <div className="preloader-top" />
      <div className="preloader-bottom" />
      <div className="preloader-content">
        <div>
          <div className="preloader-title">Khayyis® Portfolio Space</div>
        </div>
        <div>
          <div className="preloader-percent" ref={percentRef}>
            00
          </div>
        </div>
      </div>
      <div className="preloader-line">
        <div className="preloader-line-fill" ref={lineFillRef} />
      </div>
    </div>
  );
}
