'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        const sectionIds = ['beranda', 'about', 'keahlian', 'projects', 'kontak'];

        // Initialize Lenis with natural, silky smooth momentum
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.8,
            infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        let snapTimeout = null;
        let isAutoSnapping = false;

        // Gentle debounced auto-snap to section top when scroll settles
        const handleScroll = () => {
            if (isAutoSnapping) return;

            if (snapTimeout) clearTimeout(snapTimeout);

            snapTimeout = setTimeout(() => {
                const scrollPos = window.scrollY;
                const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
                if (!els.length) return;

                // Find section closest to current scroll position
                let closestSection = els[0];
                let minDistance = Math.abs(scrollPos - els[0].offsetTop);

                for (let i = 1; i < els.length; i++) {
                    const dist = Math.abs(scrollPos - els[i].offsetTop);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestSection = els[i];
                    }
                }

                // If resting slightly off-center (distance > 10px), gently glide auto-top
                if (minDistance > 10 && minDistance < window.innerHeight * 0.85) {
                    isAutoSnapping = true;
                    lenis.scrollTo(closestSection, {
                        duration: 0.9,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        onComplete: () => {
                            isAutoSnapping = false;
                        }
                    });
                    setTimeout(() => {
                        isAutoSnapping = false;
                    }, 1000);
                }
            }, 180);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (snapTimeout) clearTimeout(snapTimeout);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}



