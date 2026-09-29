'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { profileData } from '../lib/portfolioData';
import {
  Home,
  Bot,
  FolderGit2,
  Wrench,
  GraduationCap,
  MessageSquare,
  Send,
  MessageCircle,
  ArrowUp
} from 'lucide-react';

export default function FloatingDock() {
  const { triggerHaptic } = useTelegramWebApp();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Filter dock items for compact phone view: 6 items on mobile, full on desktop
  const items = [
    { label: 'Beranda', href: '#beranda', icon: Home },
    { label: 'Pilar', href: '#pilar', icon: Bot, hideOnMobile: true },
    { label: 'Proyek', href: '#proyek', icon: FolderGit2 },
    { label: 'Keahlian', href: '#keahlian', icon: Wrench, hideOnMobile: true },
    { label: 'Pengalaman', href: '#pengalaman', icon: GraduationCap, hideOnMobile: true },
    { label: 'Kontak', href: '#kontak', icon: MessageSquare },
    { label: 'WhatsApp', href: profileData.contacts.whatsappUrl, icon: MessageCircle, external: true, highlight: 'emerald' },
    { label: 'Telegram', href: profileData.contacts.telegramUrl, icon: Send, external: true, highlight: 'blue' }
  ];

  const scrollToTop = () => {
    triggerHaptic('light');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 z-40 -translate-x-1/2 max-w-[95vw]">
      <div className="flex items-center gap-1 sm:gap-2 rounded-2xl border border-zinc-700/80 bg-zinc-950/90 p-1.5 sm:p-2 shadow-2xl backdrop-blur-xl">
        
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIdx === idx;
          const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

          const scaleClass = isHovered
            ? 'scale-120 -translate-y-1.5'
            : isNeighbor
            ? 'scale-105'
            : 'scale-100';

          const visibilityClass = item.hideOnMobile ? 'hidden sm:flex' : 'flex';

          const content = (
            <div
              className={`relative h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl transition-all duration-200 ${scaleClass} ${visibilityClass} ${
                item.highlight === 'emerald'
                  ? 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white'
                  : item.highlight === 'blue'
                  ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white'
                  : 'bg-zinc-900/90 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white'
              } border border-zinc-800`}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              
              {isHovered && (
                <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-white shadow-lg hidden sm:block">
                  {item.label}
                </div>
              )}
            </div>
          );

          if (item.external) {
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => triggerHaptic('medium')}
                className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl ${visibilityClass}`}
                aria-label={item.label}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => triggerHaptic('light')}
              className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl ${visibilityClass}`}
              aria-label={item.label}
            >
              {content}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="mx-0.5 sm:mx-1 h-5 sm:h-6 w-px bg-zinc-800" />

        {/* Scroll to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          onMouseEnter={() => setHoveredIdx(99)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={`relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/90 text-zinc-400 transition-all duration-200 hover:bg-zinc-800 hover:text-white ${
            hoveredIdx === 99 ? 'scale-115 text-white' : ''
          }`}
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
        >
          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
          {hoveredIdx === 99 && (
            <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-white shadow-lg hidden sm:block">
              Ke Atas
            </div>
          )}
        </button>

      </div>
    </div>
  );
}
