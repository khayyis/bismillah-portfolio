'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { profileData } from '../lib/portfolioData';
import { ArrowRight, Send, MessageCircle, ShieldCheck, Compass, Terminal, FileCode, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const { isTma, tgUser, triggerHaptic, openProjectById } = useTelegramWebApp();

  return (
    <section id="beranda" className="relative border-b border-zinc-800 bg-zinc-950 py-12 md:py-20 overflow-hidden">
      
      {/* High-contrast WCAG compliant engineering metadata */}
      <div className="pointer-events-none absolute left-6 top-4 hidden font-mono text-xs text-zinc-400 sm:block">
        POS: 106.8456° E, -6.2088° S | CAD-REV: 2026.09
      </div>
      <div className="pointer-events-none absolute right-6 top-4 hidden font-mono text-xs text-zinc-400 sm:block">
        STANDAR: ISO 2768-1 CL. TELITI
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          
          {/* Main profile text */}
          <div className="flex flex-col md:col-span-8">
            
            {/* Telegram Mini App Banner (if inside TMA) */}
            {tgUser && (
              <div className="mb-4 inline-flex items-center gap-2 rounded border border-blue-800/60 bg-blue-950/40 px-3 py-1.5 text-xs text-blue-300">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                <span>Terautentikasi Telegram TMA: @{tgUser.username || tgUser.first_name} (ID: {tgUser.id})</span>
              </div>
            )}

            {/* Availability Badge */}
            <div className="mb-4 inline-flex items-center gap-2.5 rounded border border-zinc-800 bg-zinc-900/90 px-3.5 py-1 text-xs font-mono text-zinc-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-zinc-400">STATUS:</span>
              <span className="font-semibold text-emerald-400">{profileData.status}</span>
            </div>

            {/* H1 Main Heading */}
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {profileData.name}
            </h1>

            {/* Sub-heading */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-base font-semibold sm:text-xl">
              <span className="text-blue-400">{profileData.tagline}</span>
              <span className="text-zinc-600">/</span>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 sm:text-sm">
                SMKN 4 Jakarta
              </span>
            </div>

            {/* Bio */}
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              {profileData.bio}
            </p>

            {/* Interactive Project Navigation Buttons that immediately open full technical specification sheet */}
            <div className="mt-6">
              <p className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Dokumentasi Proyek Pilihan (Klik untuk buka spesifikasi):
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => openProjectById('conveyor-bas', profileData.projects)}
                  className="flex min-h-[44px] items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/70 p-3 text-left text-xs text-zinc-200 transition-all hover:border-blue-500 hover:bg-zinc-900 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="h-4 w-4 shrink-0 text-blue-400" />
                    <span className="font-semibold">Kinematika Konveyor 90° PT BAS</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">LIHAT</span>
                </button>

                <button
                  type="button"
                  onClick={() => openProjectById('lks-robotics', profileData.projects)}
                  className="flex min-h-[44px] items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/70 p-3 text-left text-xs text-zinc-200 transition-all hover:border-blue-500 hover:bg-zinc-900 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex items-center gap-2.5">
                    <Terminal className="h-4 w-4 shrink-0 text-blue-400" />
                    <span className="font-semibold">Robotika LKS Autonomous Mobile</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">LIHAT</span>
                </button>

                <button
                  type="button"
                  onClick={() => openProjectById('ecu-remap', profileData.projects)}
                  className="flex min-h-[44px] items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/70 p-3 text-left text-xs text-zinc-200 transition-all hover:border-blue-500 hover:bg-zinc-900 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex items-center gap-2.5">
                    <FileCode className="h-4 w-4 shrink-0 text-blue-400" />
                    <span className="font-semibold">Firmware ECU Web Serial & Dyno</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">LIHAT</span>
                </button>

                <button
                  type="button"
                  onClick={() => openProjectById('we-sut', profileData.projects)}
                  className="flex min-h-[44px] items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/70 p-3 text-left text-xs text-zinc-200 transition-all hover:border-blue-500 hover:bg-zinc-900 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400" />
                    <span className="font-semibold">Biometrik Wajah We.Sut Serverless</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">LIHAT</span>
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#proyek"
                onClick={() => triggerHaptic('light')}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span>Lihat Semua Proyek</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={profileData.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic('medium')}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-emerald-800/80 bg-emerald-950/40 px-4 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>Hubungi via WhatsApp</span>
              </a>

              <a
                href={profileData.contacts.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic('medium')}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 text-sm font-semibold text-zinc-200 transition-colors hover:border-blue-500 hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Send className="h-4 w-4 text-blue-400" />
                <span>Chat Telegram</span>
              </a>
            </div>
          </div>

          {/* Caliper Framed Photo Column with Vignette Masking */}
          <div className="flex justify-center md:col-span-4 md:justify-end">
            <div className="relative">
              {/* Technical caliper frame container */}
              <div className="border-caliper overflow-hidden rounded-xl bg-zinc-900 p-2 shadow-2xl">
                <div className="relative h-64 w-64 overflow-hidden rounded-lg bg-zinc-950 sm:h-72 sm:w-72">
                  <Image
                    src={profileData.avatar}
                    alt={profileData.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 256px, 288px"
                    className="object-cover object-top filter brightness-95 contrast-105"
                  />
                  {/* Subtle technical gradient overlay to blend casual lighting */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Technical badge below portrait */}
              <div className="mt-3 flex items-center justify-between rounded border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs font-mono text-zinc-300">
                <span>DIVISI: MEKATRONIKA</span>
                <span className="font-semibold text-blue-400">SMKN 4 JKT</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
