'use client';

import { useEffect } from 'react';
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '@/components/About'
import Skills from '../components/Skills'
import ProjectsChromaGrid from '../components/ProjectsChromaGrid'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Link from 'next/link'
import ShinyText from '../components/ShinyText'
// GlobalBlurInitializer dinonaktifkan - efek blur dihapus

export default function Home() {
  useEffect(() => {
    // Scroll ke atas saat halaman di-refresh
    window.scrollTo(0, 0);

    const htmlElement = document.documentElement;
    if (htmlElement.hasAttribute('webcrx')) {
      htmlElement.removeAttribute('webcrx');
    }
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <ProjectsChromaGrid />
      <Contact />
      <Footer />
      <Navbar />
    </main>
  )
}