'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { profileData } from '../lib/portfolioData';
import { ArrowRight, Send, MessageCircle, ShieldCheck, Compass, Terminal, FileCode, CheckCircle2, Award } from 'lucide-react';

export default function Hero() {
  const { isTma, tgUser, triggerHaptic, openProjectById } = useTelegramWebApp();

  return (
    <section id="beranda" className="relative border-b border-zinc-800 bg-zinc-950 py-8 sm:py-12 md:py-16 overflow-hidden">
      
      {/* High-contrast WCAG compliant engineering metadata */}
      <div className="pointer-events-none absolute left-6 top-4 hidden font-mono text-xs text-zinc-400 sm:block">
        CAD-REV: 2026.09 | JAKARTA
      </div>
      <div className="pointer-events-none absolute right-6 top-4 hidden font-mono text-xs text-zinc-400 sm:block">
        STANDAR: ISO 2768-1
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
          
          {/* Main profile text */}
          <div className="flex flex-col md:col-span-8">
            
            {/* Telegram Mini App Banner (if inside TMA) */}
            {tgUser && (
              <div className="mb-3 inline-flex items-center gap-2 rounded border border-blue-800/60 bg-blue-950/40 px-3 py-1 text-xs text-blue-300">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                <span>Terautentikasi Telegram: @{tgUser.username || tgUser.first_name}</span>
              </div>
            )}

            {/* Availability Badge */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/40 px-3 py-1 text-[11px] sm:text-xs font-mono text-emerald-300 shadow-sm w-fit">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-400">{profileData.status}</span>
            </div>

            {/* H1 Main Heading: Fluid scaling on mobile */}
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {profileData.name}
            </h1>

            {/* Sub-heading */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm sm:text-base font-semibold sm:text-lg">
              <span className="text-blue-400 font-bold">{profileData.tagline}</span>
              <span className="text-zinc-600">/</span>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-300 sm:text-sm">
                SMKN 4 Jakarta
              </span>
            </div>

            {/* Bio (Concise, zero dead text) */}
            <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-zinc-300">
              {profileData.bio}
            </p>

            {/* Mobile Project Cards: Single reflowing column on mobile */}
            <div className="mt-4 sm:mt-5">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                
                {/* Chip 1: Flagship Conveyor with Verified Badge */}
                <button
                  type="button"
                  onClick={() => openProjectById('conveyor-bas', profileData.projects)}
                  className="group relative flex min-h-[44px] items-center justify-between overflow-hidden rounded-lg border border-blue-500/40 bg-blue-950/20 px-3 py-2 text-left text-xs text-zinc-200 transition-all hover:border-blue-400 hover:bg-blue-950/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <Compass className="h-4 w-4 shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                    <div className="truncate">
                      <span className="font-bold text-white block truncate">Konveyor 90° PT BAS</span>
                      <span className="font-mono text-[10px] text-blue-300 truncate block">ACC MENTOR INDUSTRI WINGS</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded bg-blue-600 px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm">
                    CAD
                  </span>
                </button>

                {/* Chip 2: LKS Mobile Robotics with Competition Badge */}
                <button
                  type="button"
                  onClick={() => openProjectById('lks-robotics', profileData.projects)}
                  className="group relative flex min-h-[44px] items-center justify-between overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-left text-xs text-zinc-200 transition-all hover:border-blue-500 hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <Terminal className="h-4 w-4 shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                    <div className="truncate">
                      <span className="font-bold text-white block truncate">Robotika LKS Mobile</span>
                      <span className="font-mono text-[10px] text-zinc-400 truncate block">PID KINEMATIKA OTONOM</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                    LKS
                  </span>
                </button>

                {/* Chip 3: ECU Web Serial & Dyno */}
                <button
                  type="button"
                  onClick={() => openProjectById('ecu-remap', profileData.projects)}
                  className="group relative flex min-h-[44px] items-center justify-between overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-left text-xs text-zinc-200 transition-all hover:border-blue-500 hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <FileCode className="h-4 w-4 shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                    <div className="truncate">
                      <span className="font-bold text-white block truncate">ECU Web Serial & Dyno</span>
                      <span className="font-mono text-[10px] text-zinc-400 truncate block">UART K-LINE 16HZ SAMPLING</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                    UART
                  </span>
                </button>

                {/* Chip 4: We.Sut Biometrik AI */}
                <button
                  type="button"
                  onClick={() => openProjectById('we-sut', profileData.projects)}
                  className="group relative flex min-h-[44px] items-center justify-between overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-left text-xs text-zinc-200 transition-all hover:border-blue-500 hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                    <div className="truncate">
                      <span className="font-bold text-white block truncate">We.Sut Biometrik AI</span>
                      <span className="font-mono text-[10px] text-zinc-400 truncate block">100% SERVERLESS EDGE</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                    EDGE
                  </span>
                </button>

              </div>
            </div>

            {/* Action Buttons: Stack nicely on phone */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <Link
                href="#proyek"
                onClick={() => triggerHaptic('light')}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span>Lihat Portofolio Lengkap</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3">
                <a
                  href={profileData.contacts.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerHaptic('medium')}
                  className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-emerald-600/50 bg-emerald-950/40 px-3.5 text-xs sm:text-sm font-bold text-emerald-300 transition-all hover:border-emerald-500 hover:bg-emerald-900/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={profileData.contacts.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerHaptic('medium')}
                  className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 text-xs sm:text-sm font-semibold text-zinc-200 transition-colors hover:border-blue-500 hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Send className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Photo Column: Centered and scaled on mobile */}
          <div className="flex justify-center md:col-span-4 md:justify-end">
            <div className="relative">
              {/* Technical caliper frame container */}
              <div className="border-caliper overflow-hidden rounded-2xl bg-zinc-900 p-2 shadow-2xl">
                <div className="relative h-48 w-48 overflow-hidden rounded-xl bg-zinc-950 sm:h-64 sm:w-64">
                  <Image
                    src={profileData.avatar}
                    alt={profileData.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 192px, 256px"
                    className="object-cover object-top filter brightness-95 contrast-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Technical badge below portrait */}
              <div className="mt-2 flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-1 text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  <span>MEKATRONIKA</span>
                </span>
                <span className="font-bold text-blue-400">SMKN 4 JKT</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
