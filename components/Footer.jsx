'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { ArrowUp, Shield, Cpu } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-10 text-xs text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        
        {/* Left */}
        <div className="flex flex-col items-center gap-1.5 text-center sm:items-start sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">{profileData.name}</span>
            <span className="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
              REVISI 2026.09
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">
            SMKN 4 Jakarta | Departemen Teknik Mekatronika | Portofolio Rekayasa Industri & AI
          </p>
        </div>

        {/* Center / Technical Badge */}
        <div className="flex items-center gap-2 rounded border border-zinc-800 bg-zinc-900/90 px-3.5 py-1.5 font-mono text-[11px] text-zinc-300">
          <Cpu className="h-3.5 w-3.5 text-blue-400" />
          <span>Next.js 16 | Tailwind CSS | Telegram TMA Verified</span>
        </div>

        {/* Right / Back to top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex min-h-[44px] items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-xs font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
          aria-label="Kembali ke atas halaman"
        >
          <span>Kembali ke Atas</span>
          <ArrowUp className="h-3.5 w-3.5" />
        </button>

      </div>
    </footer>
  );
}
