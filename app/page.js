'use client';

import { useEffect } from 'react';
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '@/components/About'
import Skills from '../components/Skills'
import ProjectTiltedCards from '../components/ProjectTiltedCards'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Link from 'next/link'
import ShinyText from '../components/ShinyText'
// GlobalBlurInitializer dinonaktifkan - efek blur dihapus

export default function Home() {
  useEffect(() => {
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
      <ProjectTiltedCards />
      <Contact />
      <Footer />
      <Navbar />
    </main>
  )
}