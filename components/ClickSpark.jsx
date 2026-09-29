'use client';

import React, { useRef, useEffect, useCallback } from 'react';

export default function ClickSpark({
  sparkColor = '#3b82f6',
  sparkSize = 10,
  sparkRadius = 24,
  sparkCount = 8,
  duration = 400,
  children
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const draw = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = 1 - Math.pow(1 - progress, 3); // cubic out

        const distance = eased * sparkRadius;
        const currentLength = sparkSize * (1 - progress);

        const x1 = spark.x + Math.cos(spark.angle) * distance;
        const y1 = spark.y + Math.sin(spark.angle) * distance;
        const x2 = spark.x + Math.cos(spark.angle) * (distance + currentLength);
        const y2 = spark.y + Math.sin(spark.angle) * (distance + currentLength);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = spark.color || sparkColor;
        ctx.lineWidth = 2 * (1 - progress);
        ctx.lineCap = 'round';
        ctx.stroke();

        return true;
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [duration, sparkColor, sparkRadius, sparkSize]);

  const handleClick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const now = performance.now();
    const colors = ['#3b82f6', '#60a5fa', '#38bdf8', '#10b981', '#ffffff'];

    for (let i = 0; i < sparkCount; i++) {
      const angle = (2 * Math.PI * i) / sparkCount + (Math.random() * 0.4 - 0.2);
      const color = colors[Math.floor(Math.random() * colors.length)];
      sparksRef.current.push({
        x,
        y,
        angle,
        color,
        startTime: now
      });
    }
  };

  return (
    <div onClickCapture={handleClick} className="relative min-h-screen w-full">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      />
      {children}
    </div>
  );
}
