'use client';
import React, { useEffect, useRef } from 'react';

const SplashCursor = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const touchActive = useRef(false);
  const animationFrameId = useRef(null);

  // Fungsi untuk menginisialisasi partikel
  const createParticle = (x, y) => {
    const size = Math.random() * 5 + 2;
    const speedX = Math.random() * 3 - 1.5;
    const speedY = Math.random() * 3 - 1.5;
    const color = getRandomColor();
    const life = Math.random() * 20 + 30; // Waktu hidup partikel
    return { x, y, size, speedX, speedY, color, life, initialLife: life };
  };

  // Fungsi untuk membuat warna acak dengan efek pelangi
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 60%)`;
  };

  // Fungsi update dan render animasi
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update dan render semua partikel
    for (let i = 0; i < particles.current.length; i++) {
      const p = particles.current[i];
      p.life--;

      if (p.life <= 0) {
        particles.current.splice(i, 1);
        i--;
        continue;
      }

      // Pengaturan opacity berdasarkan sisa waktu hidup
      const opacity = p.life / p.initialLife;
      ctx.globalAlpha = opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Update posisi
      p.x += p.speedX;
      p.y += p.speedY;
    }

    // Tambahkan partikel baru jika mouse bergerak atau touch aktif
    if (touchActive.current) {
      for (let i = 0; i < 3; i++) {
        particles.current.push(createParticle(mousePos.current.x, mousePos.current.y));
      }
    }

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const canvas = canvasRef.current;
      const updateCanvasSize = () => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      };

      const handleMouseMove = (e) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
        for (let i = 0; i < 3; i++) {
          particles.current.push(createParticle(e.clientX, e.clientY));
        }
      };

      const handleTouchStart = (e) => {
        touchActive.current = true;
        if (e.touches[0]) {
          mousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };

      const handleTouchMove = (e) => {
        if (e.touches[0]) {
          mousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };

      const handleTouchEnd = () => {
        touchActive.current = false;
      };

      updateCanvasSize();
      window.addEventListener('resize', updateCanvasSize);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      animate();

      document.body.style.cursor = 'none';

      return () => {
        window.removeEventListener('resize', updateCanvasSize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        document.body.style.cursor = 'auto';
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default SplashCursor;