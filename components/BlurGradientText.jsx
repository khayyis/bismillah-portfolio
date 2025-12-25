'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import './GradientText.css';

const buildKeyframes = (from, steps) => {
    const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
    const keyframes = {};
    keys.forEach(k => {
        keyframes[k] = [from[k], ...steps.map(s => s[k])];
    });
    return keyframes;
};

/**
 * BlurGradientText - Combines BlurText animation with GradientText styling
 * Each word/character animates in with blur effect while displaying gradient colors
 */
const BlurGradientText = ({
    text = '',
    delay = 150,
    className = '',
    animateBy = 'words',
    direction = 'top',
    threshold = 0.1,
    rootMargin = '0px',
    animationFrom,
    animationTo,
    easing = t => t,
    onAnimationComplete,
    stepDuration = 0.35,
    // Gradient props
    colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
    animationSpeed = 8,
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const defaultFrom = useMemo(
        () =>
            direction === 'top'
                ? { filter: 'blur(10px)', opacity: 0, y: -50 }
                : { filter: 'blur(10px)', opacity: 0, y: 50 },
        [direction]
    );

    const defaultTo = useMemo(
        () => [
            { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
            { filter: 'blur(0px)', opacity: 1, y: 0 }
        ],
        [direction]
    );

    const fromSnapshot = animationFrom ?? defaultFrom;
    const toSnapshots = animationTo ?? defaultTo;

    const stepCount = toSnapshots.length + 1;
    const totalDuration = stepDuration * (stepCount - 1);
    const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

    // Auto-fit font size based on container width
    useEffect(() => {
        const calculateFontSize = () => {
            if (!ref.current) return;
            const container = ref.current.parentElement;
            if (!container) return;

            const containerWidth = container.offsetWidth - 16; // Account for padding
            const textLength = text.length;
            const wordCount = text.split(' ').length;

            // Calculate optimal font size accounting for:
            // - Character width (LEMONMILK is wider, ratio ~0.7)
            // - Gap between words (0.25em per gap)
            const charWidthRatio = 0.7;
            const gapRatio = (wordCount - 1) * 0.25; // gaps between words
            const effectiveLength = textLength * charWidthRatio + gapRatio;
            const optimalSize = containerWidth / effectiveLength;

            // Clamp between 10px and 72px
            const clampedSize = Math.max(10, Math.min(72, optimalSize));

            // Apply with !important to override any CSS
            ref.current.style.setProperty('font-size', `${clampedSize}px`, 'important');
        };

        // Initial calculation after mount
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
                fontFamily: "'lemonmilkbold', sans-serif",
                whiteSpace: 'nowrap',
                width: '100%',
                padding: '0 8px',
                boxSizing: 'border-box'
            }}
        >
            {elements.map((segment, index) => {
                const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

                const spanTransition = {
                    duration: totalDuration,
                    times,
                    delay: (index * delay) / 1000,
                    ease: easing
                };

                return (
                    <motion.span
                        className="inline-block will-change-[transform,filter,opacity] text-inherit"
                        key={index}
                        initial={fromSnapshot}
                        animate={inView ? animateKeyframes : fromSnapshot}
                        transition={spanTransition}
                        style={{ ...gradientStyle, fontSize: 'inherit' }}
                        onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
                    >
                        {segment === ' ' ? '\u00A0' : segment}
                    </motion.span>
                );
            })}
        </h1>
    );
};

export default BlurGradientText;
