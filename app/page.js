'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar'
import Link from 'next/link'
import ShinyText from '../components/ShinyText'

// Dynamic imports untuk komponen yang fetch data dari API
// Ini mencegah hydration mismatch karena komponen hanya render di client
const Hero = dynamic(() => import('../components/Hero'), { ssr: false });
const About = dynamic(() => import('../components/About'), { ssr: false });
const Skills = dynamic(() => import('../components/Skills'), { ssr: false });
const ProjectsChromaGrid = dynamic(() => import('../components/ProjectsChromaGrid'), { ssr: false });
const Contact = dynamic(() => import('../components/Contact'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });

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