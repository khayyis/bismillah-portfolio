'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { Menu, X, Smartphone, Monitor } from 'lucide-react';
import { profileData } from '../lib/portfolioData';

export default function Navbar() {
  const { activeSurface, setActiveSurface, isTma } = useTelegramWebApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand identity */}
        <Link
          href="#beranda"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-mono text-sm font-bold text-white shadow-sm">
            KB
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-blue-400">
              {profileData.name}
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              {profileData.department}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            href="#pilar"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Pilar Rekayasa
          </Link>
          <Link
            href="#proyek"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Proyek Pilihan
          </Link>
          <Link
            href="#keahlian"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Keahlian Teknis
          </Link>
          <Link
            href="#pengalaman"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Pengalaman & PKL
          </Link>
          <Link
            href="#kontak"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Kontak
          </Link>
        </nav>

        {/* Right side: Surface View Switcher & Mobile Menu */}
        <div className="flex items-center gap-3">
          
          {/* Surface Toggle: Web View vs TMA View */}
          {!isTma && (
            <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900 p-1">
              <button
                type="button"
                onClick={() => setActiveSurface('web')}
                className={`flex min-h-[36px] items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-all ${
                  activeSurface === 'web'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Tampilan Web Desktop Standar"
              >
                <Monitor className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Web</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSurface('tma')}
                className={`flex min-h-[36px] items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-all ${
                  activeSurface === 'tma'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Mode Simulasi Telegram Mini App (TMA)"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">TMA</span>
              </button>
            </div>
          )}

          {/* Mobile hamburger toggle (shows below lg breakpoint) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white lg:hidden"
            aria-label="Toggle Navigasi Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-4 lg:hidden">
          <nav className="flex flex-col space-y-2">
            <Link
              href="#pilar"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-zinc-200 hover:bg-zinc-900"
            >
              Pilar Rekayasa
            </Link>
            <Link
              href="#proyek"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-zinc-200 hover:bg-zinc-900"
            >
              Proyek Pilihan
            </Link>
            <Link
              href="#keahlian"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-zinc-200 hover:bg-zinc-900"
            >
              Keahlian Teknis
            </Link>
            <Link
              href="#pengalaman"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-zinc-200 hover:bg-zinc-900"
            >
              Pengalaman & PKL
            </Link>
            <Link
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-zinc-200 hover:bg-zinc-900"
            >
              Kontak
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
