'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { VscHome, VscPerson, VscTools, VscCode, VscMail, VscAccount } from 'react-icons/vsc';
import Dock from './Dock';
import GlareHover from "./GlareHover";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import "./GlareHover.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Mendeteksi section yang aktif
      const sections = ['beranda', 'about', 'keahlian', 'projects', 'kontak'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { theme } = useTheme();

  const getIconColor = (isActive) => {
    if (isActive) return 'text-blue-400 dark:text-blue-300';
    return 'text-gray-800 dark:text-gray-200';
  };

  const items = [
    {
      icon: <VscHome size={24} className={getIconColor(activeSection === 'beranda')} />,
      label: 'Beranda',
      onClick: () => pathname === '/' ? scrollToSection('beranda') : window.location.href = '/',
      active: pathname === '/' && activeSection === 'beranda'
    },
    {
      icon: <VscPerson size={24} className={getIconColor(activeSection === 'about')} />,
      label: 'Tentang',
      onClick: () => scrollToSection('about'),
      active: activeSection === 'about'
    },
    {
      icon: <VscTools size={24} className={getIconColor(activeSection === 'keahlian')} />,
      label: 'Keahlian',
      onClick: () => scrollToSection('keahlian'),
      active: activeSection === 'keahlian'
    },
    {
      icon: <VscCode size={24} className={getIconColor(activeSection === 'projects')} />,
      label: 'Proyek',
      onClick: () => scrollToSection('projects'),
      active: activeSection === 'projects'
    },
    {
      icon: <VscMail size={24} className={getIconColor(activeSection === 'kontak')} />,
      label: 'Kontak',
      onClick: () => scrollToSection('kontak'),
      active: activeSection === 'kontak'
    },
  ];

  return (
    <header
      className={`fixed bottom-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled
          ? 'backdrop-blur-md bg-white/10 dark:bg-gray-900/10'
          : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white hidden md:block">
              Khayyis<span className="text-blue-500 dark:text-blue-400">.dev</span>
            </Link>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block mx-auto">
            <Dock
              items={items}
              panelHeight={68}
              baseItemSize={48}
              magnification={60}
              className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-lg"
            />
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-around items-center w-full md:hidden relative">
            {/* Theme Toggle untuk Mobile */}
            <div className="absolute right-4 top-[-40px] z-10">
              <ThemeToggle />
            </div>
            {items.map((item, index) => (
              <GlareHover
                key={index}
                width="60px"
                height="56px"
                background={item.active ? 'rgb(var(--button-primary-bg))' : 'rgb(var(--bg-secondary))'}
                borderRadius="12px"
                borderColor={item.active ? 'rgb(var(--button-primary-bg))' : 'rgb(var(--border-color))'}
                glareColor={theme === 'dark' ? '#fff' : '#000'}
                glareOpacity={theme === 'dark' ? 0.3 : 0.1}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                className="mx-1"
              >
                <button
                  className={`w-full h-full flex flex-col items-center justify-center ${item.active ? 'text-white' : 'text-gray-700 dark:text-gray-300'} relative group`}
                  onClick={item.onClick}
                  style={{ height: '100%', width: '100%', background: 'transparent', border: 'none', outline: 'none', borderRadius: '12px', cursor: 'pointer' }}
                  aria-label={`Navigasi ke ${item.label}`}
                  title={`Navigasi ke ${item.label}`}
                >
                  <div className="flex flex-col items-center justify-center">
                    {item.icon}
                    <span className="text-xs mt-1 font-medium">{item.label}</span>
                  </div>

                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                    Navigasi ke {item.label}
                  </span>
                </button>
              </GlareHover>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;