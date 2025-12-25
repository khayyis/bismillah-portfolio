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
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.15em',
                fontSize: 'clamp(1.4rem, 6vw, 4.5rem)',
                fontFamily: "'LEMON MILK', sans-serif",
                textAlign: 'center',
                width: '100%'
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
