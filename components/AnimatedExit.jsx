'use client';

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

/**
 * AnimatedExit - Komponen untuk animasi keluar
 * 
 * Komponen ini menyediakan animasi keluar yang halus untuk elemen UI
 * dengan berbagai opsi kustomisasi.
 */
const AnimatedExit = ({
  children,
  isActive,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  finalOpacity = 0,
  animateOpacity = true,
  scale = 0.95,
  delay = 0,
  onComplete,
}) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    // Jika tidak aktif, jalankan animasi keluar
    if (!isActive) {
      const axis = direction === "horizontal" ? "x" : "y";
      const offset = reverse ? -distance : distance;
      
      gsap.to(el, {
        [axis]: offset,
        scale,
        opacity: animateOpacity ? finalOpacity : 1,
        duration,
        ease,
        delay,
        onComplete,
      });
    } else {
      // Jika aktif, reset posisi dan opasitas
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: duration / 2,
        ease,
      });
    }
    
    return () => {
      gsap.killTweensOf(el);
    };
  }, [
    isActive,
    distance,
    direction,
    reverse,
    duration,
    ease,
    finalOpacity,
    animateOpacity,
    scale,
    delay,
    onComplete,
  ]);
  
  return <div ref={ref}>{children}</div>;
};

export default AnimatedExit;