'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Radio } from 'lucide-react';
import { profileData } from '../lib/portfolioData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('id-ID', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#07080b]/90 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        
        {/* Brand identity: makemepulse lowercase editorial style */}
        <Link
          href="#beranda"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
        >
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-white text-base sm:text-lg">
            <span>khayyis</span>
            <span className="h-2 w-2 rounded-full bg-[#896fff] shadow-[0_0_8px_#896fff]"></span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest uppercase text-zinc-500 border-l border-zinc-800 pl-3">
            SMKN 4 JKT / MEKATRONIKA
          </span>
        </Link>

        {/* Studio Live Telemetry Ticker (Makemepulse characteristic) */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] text-zinc-400 border border-zinc-800/80 rounded-full px-3 py-1 bg-zinc-950/60">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>JAKARTA {timeString || '10:48:00'} (UTC+7)</span>
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-300">TERSEDIA MAGANG & KERJA</span>
        </div>

        {/* Desktop Navigation: dash hover effect */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          <Link
            href="#pilar"
            className="dash-link text-xs font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            <span>Pilar Rekayasa</span>
            <u></u>
          </Link>
          <Link
            href="#proyek"
            className="dash-link text-xs font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            <span>Proyek Pilihan</span>
            <u></u>
          </Link>
          <Link
            href="#lab"
            className="dash-link text-xs font-medium tracking-wide text-purple-300 transition-colors hover:text-purple-200"
          >
            <span className="flex items-center gap-1">
              <span>Lab Interaktif</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#896fff]"></span>
            </span>
            <u></u>
          </Link>
          <Link
            href="#neuro"
            className="dash-link text-xs font-medium tracking-wide text-cyan-300 transition-colors hover:text-cyan-200"
          >
            <span>Data Sains</span>
            <u></u>
          </Link>
          <Link
            href="#keahlian"
            className="dash-link text-xs font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            <span>Keahlian</span>
            <u></u>
          </Link>
          <Link
            href="#pengalaman"
            className="dash-link text-xs font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            <span>Pengalaman</span>
            <u></u>
          </Link>
          <Link
            href="#kontak"
            className="group flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-950/20 px-3.5 py-1.5 text-xs font-semibold text-purple-300 transition-all hover:border-purple-400 hover:bg-purple-900/40 hover:text-white"
          >
            <span>Kontak</span>
            <ArrowUpRight className="h-3 w-3 text-purple-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
            aria-label="Toggle Navigasi Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-purple-400" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Curtain Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-[#07080b] px-5 py-6 lg:hidden animate-toast">
          <div className="mb-4 pb-3 border-b border-zinc-800/80 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              STUDIO TELEMETRI: JAKARTA {timeString}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          </div>

          <nav className="flex flex-col space-y-2">
            <Link
              href="#beranda"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center text-sm font-medium text-zinc-200 hover:text-white hover:pl-2 transition-all"
            >
              Beranda
            </Link>
            <Link
              href="#pilar"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center text-sm font-medium text-zinc-200 hover:text-white hover:pl-2 transition-all"
            >
              Pilar Rekayasa
            </Link>
            <Link
              href="#proyek"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center text-sm font-medium text-zinc-200 hover:text-white hover:pl-2 transition-all"
            >
              Proyek Pilihan
            </Link>
            <Link
              href="#lab"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center text-sm font-medium text-purple-300 hover:text-purple-200 hover:pl-2 transition-all"
            >
              Lab Interaktif (Kinematika & Waveform)
            </Link>
            <Link
              href="#neuro"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center text-sm font-medium text-cyan-300 hover:text-cyan-200 hover:pl-2 transition-all"
            >
              Data Sains (Neuron Telemetri)
            </Link>
            <Link
              href="#keahlian"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center text-sm font-medium text-zinc-200 hover:text-white hover:pl-2 transition-all"
            >
              Keahlian Teknis
            </Link>
            <Link
              href="#pengalaman"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center text-sm font-medium text-zinc-200 hover:text-white hover:pl-2 transition-all"
            >
              Pengalaman Industri & PKL
            </Link>
            <Link
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center text-sm font-bold text-purple-300 hover:text-white hover:pl-2 transition-all"
            >
              Hubungi Studio
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
