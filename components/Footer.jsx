'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { ArrowUp, Cpu, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080b] py-10 sm:py-14 text-xs text-zinc-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-8 sm:flex-row">
        
        {/* Brand signature & studio credentials */}
        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-base">khayyis.</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#896fff]"></span>
            <span className="rounded-full border border-white/[0.08] bg-zinc-900 px-2.5 py-0.5 font-mono text-[10px] text-zinc-400">
              CAD & AI STUDIO 2026
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 max-w-md">
            SMKN 4 Jakarta / Departemen Teknik Mekatronika / Standar Shop Drawing ISO 2768-1 & Otomasi PLC
          </p>
        </div>

        {/* Technical standards badge */}
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-zinc-900/80 px-4 py-2 font-mono text-[11px] text-zinc-300">
          <Cpu className="h-3.5 w-3.5 text-[#896fff] shrink-0" />
          <span>Next.js 16 / Tailwind CSS / Telegram TMA</span>
        </div>

        {/* Studio coordinates & Back to top button */}
        <div className="flex items-center gap-4">
          <span className="hidden xl:inline-block font-mono text-[10px] text-zinc-500 uppercase">
            JAKARTA, ID (UTC+7)
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex min-h-[44px] items-center gap-2 rounded-full border border-white/[0.1] bg-zinc-900 px-5 text-xs font-semibold text-zinc-200 transition-all hover:border-[#896fff] hover:text-white"
            aria-label="Kembali ke atas halaman"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
