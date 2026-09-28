'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import EngineeringPillars from '../components/EngineeringPillars';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import TmaSimulator from '../components/TmaSimulator';

export default function Home() {
  return (
    <TmaSimulator>
      <main className="min-h-screen bg-zinc-950 text-zinc-100">
        <Navbar />
        <Hero />
        <EngineeringPillars />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </main>
    </TmaSimulator>
  );
}
