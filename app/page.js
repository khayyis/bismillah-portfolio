'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import EngineeringPillars from '../components/EngineeringPillars';
import ProjectsSection from '../components/ProjectsSection';
import InteractiveLab from '../components/InteractiveLab';
import NeuroDataScienceSection from '../components/NeuroDataScienceSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import FloatingDock from '../components/FloatingDock';
import ClickSpark from '../components/ClickSpark';
import { ToastProvider, useToast } from '../components/Toast';

function PortfolioContent() {
  const { showToast } = useToast();
  const [showNeuroTelemetry, setShowNeuroTelemetry] = useState(false);

  useEffect(() => {
    // 1. Always enable in development / localhost
    const isDev = process.env.NODE_ENV !== 'production';

    // 2. Secret URL Query param check (?neuro=show or ?admin=1)
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const hasSecretParam = urlParams ? (urlParams.get('neuro') === 'show' || urlParams.get('admin') === '1') : false;

    // 3. LocalStorage persistence check
    const savedAdminState = typeof window !== 'undefined' ? localStorage.getItem('khayyis_neuro_unlocked') === 'true' : false;

    if (hasSecretParam && typeof window !== 'undefined') {
      localStorage.setItem('khayyis_neuro_unlocked', 'true');
    }

    if (isDev || hasSecretParam || savedAdminState) {
      setShowNeuroTelemetry(true);
    }

    // 4. Hidden Hotkey listener: Ctrl + Shift + N to toggle
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'N' || e.key === 'n')) {
        e.preventDefault();
        setShowNeuroTelemetry((prev) => {
          const next = !prev;
          if (typeof window !== 'undefined') {
            localStorage.setItem('khayyis_neuro_unlocked', next ? 'true' : 'false');
          }
          showToast(next ? 'Mode Owner: Telemetri Saraf Aktif' : 'Mode Publik: Telemetri Disembunyikan', next ? 'success' : 'info');
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showToast]);

  // Non-blocking visitor telemetry beacon
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const startTime = Date.now();
    let maxScroll = 0;

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        const pct = Math.min(100, Math.round((window.scrollY / total) * 100));
        if (pct > maxScroll) maxScroll = pct;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const sendTelemetry = () => {
      const dwellSeconds = Math.round((Date.now() - startTime) / 1000);
      const payload = JSON.stringify({
        scrollDepth: maxScroll,
        dwellSeconds,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        referrer: document.referrer || 'Direct',
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/telemetry', new Blob([payload], { type: 'application/json' }));
      } else {
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    };

    // Initial ping
    fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scrollDepth: 0,
        dwellSeconds: 0,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        referrer: document.referrer || 'Direct',
      }),
    }).catch(() => {});

    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') sendTelemetry();
    });
    window.addEventListener('beforeunload', sendTelemetry);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('beforeunload', sendTelemetry);
    };
  }, []);

  return (
    <ClickSpark sparkColor="#896fff" sparkCount={8} duration={400}>
      <main className="relative min-h-screen bg-[#07080b] text-zinc-100">
        <Navbar showNeuro={showNeuroTelemetry} />
        <Hero />
        <EngineeringPillars />
        <ProjectsSection />
        <InteractiveLab />
        
        {/* Protected Owner-Only Telemetry Section */}
        {showNeuroTelemetry && <NeuroDataScienceSection />}

        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
        <FloatingDock showNeuro={showNeuroTelemetry} />
      </main>
    </ClickSpark>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <PortfolioContent />
    </ToastProvider>
  );
}
