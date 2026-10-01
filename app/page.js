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
import { useTelegramWebApp } from '../components/TelegramWebAppProvider';

function PortfolioContent() {
  const { tgUser } = useTelegramWebApp();
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

    // 4. Telegram Owner verification
    const isOwnerTg = tgUser && (
      (tgUser.username && tgUser.username.toLowerCase() === 'khayyis_billawal') ||
      (tgUser.first_name && tgUser.first_name.toLowerCase().includes('khayyis'))
    );

    if (hasSecretParam && typeof window !== 'undefined') {
      localStorage.setItem('khayyis_neuro_unlocked', 'true');
    }

    if (isDev || hasSecretParam || savedAdminState || isOwnerTg) {
      setShowNeuroTelemetry(true);
    }

    // 5. Hidden Hotkey listener: Ctrl + Shift + N to toggle
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
  }, [tgUser, showToast]);

  return (
    <ClickSpark sparkColor="#896fff" sparkCount={8} duration={400}>
      <main className="relative min-h-screen bg-[#07080b] text-zinc-100">
        <Navbar />
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
        <FloatingDock />
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
