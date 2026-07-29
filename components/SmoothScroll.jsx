'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);
    const isSnappingRef = useRef(false);
    const touchStartRef = useRef(0);
    const lastSnapTimeRef = useRef(0);

    useEffect(() => {
        const sectionIds = ['beranda', 'about', 'keahlian', 'projects', 'kontak'];

        // Initialize Lenis for luxury smooth physics momentum
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.85,
            touchMultiplier: 1.5,
            infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const getSectionElements = () => {
            return sectionIds
                .map((id) => document.getElementById(id))
                .filter(Boolean);
        };

        const getCurrentSectionIndex = () => {
            const els = getSectionElements();
            const scrollPos = window.scrollY + window.innerHeight / 3;
            let currentIndex = 0;
            for (let i = 0; i < els.length; i++) {
                if (els[i].offsetTop <= scrollPos) {
                    currentIndex = i;
                }
            }
            return currentIndex;
        };

        const snapToSection = (index) => {
            const els = getSectionElements();
            if (index < 0 || index >= els.length) return;

            isSnappingRef.current = true;
            lastSnapTimeRef.current = Date.now();

            lenis.scrollTo(els[index], {
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                onComplete: () => {
                    isSnappingRef.current = false;
                }
            });

            setTimeout(() => {
                isSnappingRef.current = false;
            }, 1400);
        };

        const handleWheel = (e) => {
            const now = Date.now();
            if (isSnappingRef.current || now - lastSnapTimeRef.current < 1400) {
                e.preventDefault();
                return;
            }

            if (Math.abs(e.deltaY) < 12) return;

            e.preventDefault();
            const currentIndex = getCurrentSectionIndex();

            if (e.deltaY > 0) {
                // Scroll Down -> Next Section
                if (currentIndex < sectionIds.length - 1) {
                    snapToSection(currentIndex + 1);
                }
            } else {
                // Scroll Up -> Previous Section
                if (currentIndex > 0) {
                    snapToSection(currentIndex - 1);
                }
            }
        };

        const handleTouchStart = (e) => {
            touchStartRef.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            const now = Date.now();
            if (isSnappingRef.current || now - lastSnapTimeRef.current < 1400) return;

            const touchEnd = e.changedTouches[0].clientY;
            const diff = touchStartRef.current - touchEnd;

            if (Math.abs(diff) > 35) {
                const currentIndex = getCurrentSectionIndex();
                if (diff > 0 && currentIndex < sectionIds.length - 1) {
                    snapToSection(currentIndex + 1);
                } else if (diff < 0 && currentIndex > 0) {
                    snapToSection(currentIndex - 1);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}


