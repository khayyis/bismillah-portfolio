'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { ArrowUp, Cpu } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080b] py-10 text-xs text-zinc-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-8 sm:flex-row">
        
        {/* Brand signature */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-sm">khayyis.</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#896fff]"></span>
          <span className="text-[11px] text-zinc-500">
            SMKN 4 Jakarta / Mekatronika
          </span>
        </div>

        {/* Technical standards badge */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
          <Cpu className="h-3.5 w-3.5 text-[#896fff] shrink-0" />
          <span>Next.js 16 / ISO 2768-1</span>
        </div>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex min-h-[38px] items-center gap-2 rounded-full border border-white/[0.1] bg-zinc-900 px-4 text-xs font-medium text-zinc-300 transition-all hover:border-[#896fff] hover:text-white"
          aria-label="Kembali ke atas halaman"
        >
          <span>Ke Atas</span>
          <ArrowUp className="h-3 w-3" />
        </button>

      </div>
    </footer>
  );
}
