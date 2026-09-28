'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { Send, MessageCircle, Menu, X, Smartphone, Monitor } from 'lucide-react';
import { profileData } from '../lib/portfolioData';

export default function Navbar() {
  const { activeSurface, setActiveSurface, isTma, tgUser } = useTelegramWebApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand identity */}
        <Link
          href="#beranda"
          className="group flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 font-mono text-sm font-bold text-white shadow-sm">
            KB
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-zinc-100 group-hover:text-blue-400">
              {profileData.name}
            </span>
            <span className="text-xs text-zinc-400">
              {profileData.department}
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#pilar"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Pilar Rekayasa
          </Link>
          <Link
            href="#proyek"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Proyek Pilihan
          </Link>
          <Link
            href="#keahlian"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Keahlian Teknis
          </Link>
          <Link
            href="#pengalaman"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Pengalaman & PKL
          </Link>
          <Link
            href="#kontak"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Kontak
          </Link>
        </nav>

        {/* Surface mode toggle & quick actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Surface Toggle: Web vs Telegram Mini App Mode */}
          {!isTma && (
            <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900 p-0.5">
              <button
                type="button"
                onClick={() => setActiveSurface('web')}
                className={`flex min-h-[44px] items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-all ${
                  activeSurface === 'web'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Tampilan Desktop / Web Standar"
              >
                <Monitor className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Web View</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSurface('tma')}
                className={`flex min-h-[44px] items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-all ${
                  activeSurface === 'tma'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Mode Simulasi Telegram Mini App (TMA)"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">TMA View</span>
              </button>
            </div>
          )}

          {/* Telegram fast link */}
          <a
            href={profileData.contacts.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 px-3 text-xs font-medium text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white sm:flex"
            aria-label="Buka Telegram"
          >
            <Send className="mr-1.5 h-3.5 w-3.5 text-blue-400" />
            <span>Telegram</span>
          </a>

          {/* WhatsApp fast link */}
          <a
            href={profileData.contacts.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md bg-emerald-600 px-3 text-xs font-medium text-white hover:bg-emerald-500"
            aria-label="Hubungi via WhatsApp"
          >
            <MessageCircle className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-3">
            <Link
              href="#pilar"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-md px-3 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              Pilar Rekayasa
            </Link>
            <Link
              href="#proyek"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-md px-3 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              Proyek Pilihan
            </Link>
            <Link
              href="#keahlian"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-md px-3 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              Keahlian Teknis
            </Link>
            <Link
              href="#pengalaman"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-md px-3 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              Pengalaman & PKL
            </Link>
            <Link
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-md px-3 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              Kontak
            </Link>
            <div className="pt-2">
              <a
                href={profileData.contacts.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-4 text-sm font-medium text-white"
              >
                <Send className="h-4 w-4 text-blue-400" />
                Chat Telegram @KhayyisBillawal
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
