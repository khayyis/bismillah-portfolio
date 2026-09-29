'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { profileData } from '../lib/portfolioData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-3 sm:px-6">
        
        {/* Brand identity */}
        <Link
          href="#beranda"
          className="group flex items-center gap-2 sm:gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-blue-600 font-mono text-xs sm:text-sm font-bold text-white shadow-sm">
            KB
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-blue-400">
              {profileData.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
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

        {/* Right side: Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
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
          <nav className="flex flex-col space-y-1.5">
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
              Kontak Langsung
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
