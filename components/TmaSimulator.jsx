'use client';

import React from 'react';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { profileData } from '../lib/portfolioData';
import { Smartphone, Send, MessageCircle, ArrowLeft, MoreVertical, X, Check, Shield } from 'lucide-react';

export default function TmaSimulator({ children }) {
  const { isTma, isSimulatorMode, setActiveSurface, tgUser, triggerHaptic } = useTelegramWebApp();

  // Jika sedang berjalan di dalam aplikasi Telegram asli (bukan simulator web), langsung render children
  if (isTma && !isSimulatorMode) {
    return <>{children}</>;
  }

  // Jika mode web standar dipilih, render langsung
  if (!isSimulatorMode) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-4 sm:py-8">
      {/* Simulator top control bar */}
      <div className="mx-auto mb-4 flex max-w-md items-center justify-between px-4 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-blue-400" />
          <span className="font-semibold text-zinc-200">Mode Simulasi Telegram Mini App (TMA)</span>
        </div>
        <button
          type="button"
          onClick={() => setActiveSurface('web')}
          className="flex min-h-[44px] items-center gap-1 rounded border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-200 hover:bg-zinc-800"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Kembali ke Web View</span>
        </button>
      </div>

      {/* Telegram Mobile Phone Frame */}
      <div className="mx-auto max-w-md overflow-hidden rounded-3xl border-4 border-zinc-800 bg-zinc-950 shadow-2xl">
        
        {/* Telegram App Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSurface('web')}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center text-zinc-400 hover:text-white"
              aria-label="Tutup Mini App"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Khayyis Portfolio TMA</span>
              <span className="text-[10px] text-zinc-400">bot @KhayyisBillawalBot</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-950 px-2 py-0.5 text-[10px] font-mono text-blue-300">
              TMA v2.0
            </span>
            <div className="flex min-h-[44px] min-w-[44px] items-center justify-center text-zinc-400">
              <MoreVertical className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Telegram Simulated Content Area */}
        <div className="max-h-[75vh] overflow-y-auto">
          {children}
        </div>

        {/* Telegram Fixed MainButton at Bottom */}
        <div className="border-t border-zinc-800 bg-zinc-900 p-3">
          <a
            href={profileData.contacts.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => triggerHaptic('success')}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white shadow-md transition-colors hover:bg-blue-500"
          >
            <Send className="h-4 w-4" />
            <span>Kirim Pesan ke Khayyis di Telegram</span>
          </a>
        </div>

      </div>
    </div>
  );
}
