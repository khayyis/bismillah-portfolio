'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import EngineeringPillars from '../components/EngineeringPillars';
import ProjectsSection from '../components/ProjectsSection';
import NeuroAnalyticsSection from '../components/NeuroAnalyticsSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import TmaSimulator from '../components/TmaSimulator';
import FloatingDock from '../components/FloatingDock';
import ClickSpark from '../components/ClickSpark';
import { ToastProvider } from '../components/Toast';

export default function Home() {
  return (
    <ToastProvider>
      <ClickSpark sparkColor="#3b82f6" sparkCount={8} duration={400}>
        <TmaSimulator>
          <main className="relative min-h-screen bg-zinc-950 text-zinc-100">
            <Navbar />
            <Hero />
            <EngineeringPillars />
            <ProjectsSection />
            <NeuroAnalyticsSection />
            <SkillsSection />
            <ExperienceSection />
            <ContactSection />
            <Footer />
            <FloatingDock />
          </main>
        </TmaSimulator>
      </ClickSpark>
    </ToastProvider>
  );
}
