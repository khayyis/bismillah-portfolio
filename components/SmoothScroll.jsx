'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }) {
    const isScrollingRef = useRef(false);
    const touchStartRef = useRef(0);
    const lastScrollTimeRef = useRef(0);
    const animFrameRef = useRef(null);

    useEffect(() => {
        const sectionIds = ['beranda', 'about', 'keahlian', 'projects', 'kontak'];

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

        // Custom Silk-Smooth RAF Scroll Engine with easeInOutQuart
        const smoothScrollTo = (targetY, duration = 1100) => {
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }

            const startY = window.pageYOffset || document.documentElement.scrollTop;
            const distance = targetY - startY;
            let startTime = null;

            // EaseInOutQuart: Silky, ultra-smooth acceleration & deceleration curve
            const easeInOutQuart = (t) => {
                return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
            };

            const step = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const eased = easeInOutQuart(progress);

                window.scrollTo(0, startY + distance * eased);

                if (progress < 1) {
                    animFrameRef.current = requestAnimationFrame(step);
                } else {
                    isScrollingRef.current = false;
                }
            };

            isScrollingRef.current = true;
            lastScrollTimeRef.current = Date.now();
            animFrameRef.current = requestAnimationFrame(step);
        };

        const scrollToSection = (index) => {
            const els = getSectionElements();
            if (index < 0 || index >= els.length) return;

            const targetEl = els[index];
            const targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset;

            smoothScrollTo(targetTop, 1100);
        };

        const handleWheel = (e) => {
            const now = Date.now();
            if (isScrollingRef.current || now - lastScrollTimeRef.current < 1100) {
                e.preventDefault();
                return;
            }

            if (Math.abs(e.deltaY) < 8) return;

            e.preventDefault();
            const currentIndex = getCurrentSectionIndex();

            if (e.deltaY > 0) {
                // Scroll Down -> Next Section
                if (currentIndex < sectionIds.length - 1) {
                    scrollToSection(currentIndex + 1);
                }
            } else {
                // Scroll Up -> Previous Section
                if (currentIndex > 0) {
                    scrollToSection(currentIndex - 1);
                }
            }
        };

        const handleTouchStart = (e) => {
            touchStartRef.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            const now = Date.now();
            if (isScrollingRef.current || now - lastScrollTimeRef.current < 1100) return;

            const touchEnd = e.changedTouches[0].clientY;
            const diff = touchStartRef.current - touchEnd;

            if (Math.abs(diff) > 30) {
                const currentIndex = getCurrentSectionIndex();
                if (diff > 0 && currentIndex < sectionIds.length - 1) {
                    scrollToSection(currentIndex + 1);
                } else if (diff < 0 && currentIndex > 0) {
                    scrollToSection(currentIndex - 1);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return <>{children}</>;
}

