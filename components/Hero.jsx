'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProjectModal } from './ProjectModalProvider';
import { profileData } from '../lib/portfolioData';
import { ArrowRight, MessageCircle, Compass, Terminal, FileCode, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const { triggerHaptic, openProjectById } = useProjectModal();

  return (
    <section id="beranda" className="relative border-b border-white/[0.08] bg-makeme-dark py-12 sm:py-16 md:py-24 overflow-hidden">
      
      {/* Editorial Makemepulse Metadata coordinates */}
      <div className="pointer-events-none absolute left-6 sm:left-10 top-6 hidden font-mono text-[11px] tracking-widest text-zinc-500 sm:block uppercase">
        LOC: -6.1751° S, 106.8650° E / JAKARTA
      </div>
      <div className="pointer-events-none absolute right-6 sm:right-10 top-6 hidden font-mono text-[11px] tracking-widest text-zinc-500 sm:block uppercase">
        SPEC-REF: ISO 2768-1 / MEKATRONIKA
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Main Editorial Text Column */}
          <div className="flex flex-col lg:col-span-8">
            
            {/* Makemepulse Pulse Dot & Status */}
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1 font-mono text-[11px] sm:text-xs text-emerald-300 w-fit">
              <span className="dot--bounce h-2 w-2 text-emerald-400">
                <span className="pulse-ring"></span>
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              </span>
              <span className="font-semibold">{profileData.status}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">SMKN 4 Jakarta</span>
            </div>

            {/* Makemepulse Editorial Display Headline */}
            <div className="space-y-1">
              <p className="cap-small text-[#896fff]">
                Autonomous Systems & Mechanical Engineering Studio
              </p>
              <h1 className="headline-big text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight lowercase">
                crafting autonomous engineering & intelligent mechanics.
              </h1>
            </div>

            {/* Profile Subtitle & Persona */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5 text-sm sm:text-base text-zinc-300 font-medium">
              <span className="text-white font-semibold">{profileData.name}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-[#896fff] font-mono text-xs sm:text-sm uppercase tracking-wider">
                {profileData.tagline}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400 text-xs sm:text-sm">
                Spesialis CAD Inventor & Otomasi PLC
              </span>
            </div>

            {/* Bio statement */}
            <p className="mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-zinc-400">
              {profileData.bio} Menerapkan standar shop drawing pabrikasi industri, analisis mekanisme transfer rotari, dan implementasi kendali otonom presisi tinggi.
            </p>

            {/* Makemepulse Asymmetric Project Dossier Grid */}
            <div className="mt-6 sm:mt-8">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                [ PILIHAN DOKUMENTASI PROYEK ]
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                
                {/* Chip 1: Konveyor PT BAS */}
                <button
                  type="button"
                  onClick={() => openProjectById('conveyor-bas', profileData.projects)}
                  className="group relative flex min-h-[44px] items-center justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-900/60 p-3 text-left text-xs transition-all hover:border-[#896fff]/60 hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <Compass className="h-4 w-4 shrink-0 text-[#896fff] group-hover:scale-110 transition-transform" />
                    <div className="truncate">
                      <span className="font-semibold text-white block truncate">Konveyor 90° PT BAS</span>
                      <span className="font-mono text-[10px] text-zinc-400 truncate block">ACC MENTOR INDUSTRI WINGS</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded bg-[#896fff]/20 text-[#896fff] border border-[#896fff]/40 px-2 py-0.5 font-mono text-[10px] font-bold">
                    CAD
                  </span>
                </button>

                {/* Chip 2: Autonomous Mobile Robot LKS */}
                <button
                  type="button"
                  onClick={() => openProjectById('lks-robotics', profileData.projects)}
                  className="group relative flex min-h-[44px] items-center justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-900/60 p-3 text-left text-xs transition-all hover:border-blue-500/60 hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <Terminal className="h-4 w-4 shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                    <div className="truncate">
                      <span className="font-semibold text-white block truncate">Autonomous Mobile Robot</span>
                      <span className="font-mono text-[10px] text-zinc-400 truncate block">PID CLOSED-LOOP KINEMATIKA</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded border border-blue-500/40 bg-blue-950/40 text-blue-300 px-2 py-0.5 font-mono text-[10px] font-bold">
                    LKS
                  </span>
                </button>

                {/* Chip 3: ECU Web Serial & Dyno */}
                <button
                  type="button"
                  onClick={() => openProjectById('ecu-remap', profileData.projects)}
                  className="group relative flex min-h-[44px] items-center justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-900/60 p-3 text-left text-xs transition-all hover:border-cyan-500/60 hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <FileCode className="h-4 w-4 shrink-0 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <div className="truncate">
                      <span className="font-semibold text-white block truncate">ECU Web Serial & Dyno</span>
                      <span className="font-mono text-[10px] text-zinc-400 truncate block">UART 16HZ SAMPLING RATE</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 px-2 py-0.5 font-mono text-[10px] font-bold">
                    UART
                  </span>
                </button>

                {/* Chip 4: We.Sut Biometrik AI */}
                <button
                  type="button"
                  onClick={() => openProjectById('we-sut', profileData.projects)}
                  className="group relative flex min-h-[44px] items-center justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-900/60 p-3 text-left text-xs transition-all hover:border-purple-500/60 hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div className="truncate">
                      <span className="font-semibold text-white block truncate">We.Sut Biometrik Wajah</span>
                      <span className="font-mono text-[10px] text-zinc-400 truncate block">INSIGHTFACE 512-D EDGE</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded border border-purple-500/40 bg-purple-950/40 text-purple-300 px-2 py-0.5 font-mono text-[10px] font-bold">
                    EDGE
                  </span>
                </button>

              </div>
            </div>

            {/* Makemepulse Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="#proyek"
                onClick={() => triggerHaptic('light')}
                className="group flex min-h-[48px] items-center justify-between sm:justify-start gap-4 rounded-full bg-white px-6 py-2.5 text-xs sm:text-sm font-bold text-black transition-all hover:bg-[#896fff] hover:text-white shadow-lg"
              >
                <span>Lihat Portofolio Lengkap</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 group-hover:bg-white/20 transition-colors">
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>

              <a
                href={profileData.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic('medium')}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/20 px-6 text-xs sm:text-sm font-semibold text-emerald-300 transition-all hover:border-emerald-400 hover:bg-emerald-900/40 hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Bisnis</span>
              </a>
            </div>

          </div>

          {/* Caliper Framed Engineering Portrait */}
          <div className="flex justify-center lg:col-span-4 lg:justify-end">
            <div className="relative">
              <div className="border-caliper overflow-hidden rounded-2xl bg-zinc-950 p-2 shadow-2xl">
                <div className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 overflow-hidden rounded-xl bg-zinc-900">
                  <Image
                    src={profileData.avatar}
                    alt={profileData.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 224px, 288px"
                    className="object-cover object-top filter brightness-95 contrast-105 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                    <span>CAD / PLC / ROBOTICS</span>
                    <span className="text-[#896fff]">REV. 2026</span>
                  </div>
                </div>
              </div>

              {/* Technical Badge below portrait */}
              <div className="mt-3 flex items-center justify-between rounded-lg border border-white/[0.08] bg-zinc-900/90 px-3 py-1.5 text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#896fff]"></span>
                  <span className="font-bold">MEKATRONIKA</span>
                </span>
                <span className="text-[#896fff] font-bold">SMKN 4 JAKARTA</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
