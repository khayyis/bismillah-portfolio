'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }) {
    const isScrollingRef = useRef(false);
    const touchStartRef = useRef(0);
    const lastScrollTimeRef = useRef(0);

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

        const scrollToSection = (index) => {
            const els = getSectionElements();
            if (index < 0 || index >= els.length) return;

            isScrollingRef.current = true;
            lastScrollTimeRef.current = Date.now();
            
            const targetEl = els[index];
            const targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });

            setTimeout(() => {
                isScrollingRef.current = false;
            }, 900);
        };

        const handleWheel = (e) => {
            // Rate limit scroll triggers
            const now = Date.now();
            if (isScrollingRef.current || now - lastScrollTimeRef.current < 900) {
                e.preventDefault();
                return;
            }

            if (Math.abs(e.deltaY) < 10) return;

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
            if (isScrollingRef.current || now - lastScrollTimeRef.current < 900) return;

            const touchEnd = e.changedTouches[0].clientY;
            const diff = touchStartRef.current - touchEnd;

            if (Math.abs(diff) > 35) {
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
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return <>{children}</>;
}

