'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GradientText.css';

/**
 * BlurGradientText - Obys Agency Style GSAP Hero Text Reveal
 * Uses exact GSAP `expo.out` curve and `yPercent: 120` reveal mask matching experiment.obys.agency
 */
const BlurGradientText = ({
    text = '',
    delay = 120,
    className = '',
    animateBy = 'words',
    threshold = 0.1,
    rootMargin = '0px',
    colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
    animationSpeed = 8,
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const ref = useRef(null);
    const wordsRef = useRef([]);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (wordsRef.current.length > 0) {
                        gsap.fromTo(
                            wordsRef.current,
                            { yPercent: 120, opacity: 0 },
                            {
                                yPercent: 0,
                                opacity: 1,
                                duration: 1.2,
                                stagger: delay / 1000,
                                ease: 'expo.out'
                            }
                        );
                    }
                    observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin, delay]);

    // Auto-fit font size based on container width
    useEffect(() => {
        const calculateFontSize = () => {
            if (!ref.current) return;
            const container = ref.current.parentElement;
            if (!container) return;

            const containerWidth = container.offsetWidth - 16; // Account for padding
            const textLength = text.length;
            const wordCount = text.split(' ').length;

            const charWidthRatio = 0.7;
            const gapRatio = (wordCount - 1) * 0.25; // gaps between words
            const effectiveLength = textLength * charWidthRatio + gapRatio;
            const optimalSize = containerWidth / effectiveLength;

            const clampedSize = Math.max(10, Math.min(72, optimalSize));

            ref.current.style.setProperty('font-size', `${clampedSize}px`, 'important');
        };

        const timer = setTimeout(calculateFontSize, 50);

        window.addEventListener('resize', calculateFontSize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculateFontSize);
        };
    }, [text]);

    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
        animationDuration: `${animationSpeed}s`,
        backgroundSize: '300% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        animation: `gradient ${animationSpeed}s linear infinite`
    };

    return (
        <h1
            ref={ref}
            className={`font-bold leading-tight ${className}`}
            style={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                gap: '0.25em',
                fontFamily: "var(--font-lemonmilk), 'lemonmilkbold', sans-serif",
                whiteSpace: 'nowrap',
                width: '100%',
                padding: '0 8px',
                boxSizing: 'border-box'
            }}
        >
            {elements.map((segment, index) => (
                <span key={index} className="inline-block overflow-hidden py-1" style={{ fontSize: 'inherit' }}>
                    <span
                        ref={(el) => (wordsRef.current[index] = el)}
                        className="inline-block will-change-transform text-inherit"
                        style={{
                            ...gradientStyle,
                            fontSize: 'inherit',
                            transform: 'translateY(120%)',
                            opacity: 0
                        }}
                    >
                        {segment === ' ' ? '\u00A0' : segment}
                    </span>
                </span>
            ))}
        </h1>
    );
};

export default BlurGradientText;
