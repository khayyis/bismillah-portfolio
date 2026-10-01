'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProjectModal } from './ProjectModalProvider';
import { profileData } from '../lib/portfolioData';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function Hero() {
  const { triggerHaptic } = useProjectModal();

  return (
    <section id="beranda" className="relative border-b border-white/[0.08] bg-makeme-dark py-16 sm:py-20 md:py-28 overflow-hidden">
      
      {/* Precision coordinates */}
      <div className="pointer-events-none absolute left-6 sm:left-10 top-6 hidden font-mono text-[10px] tracking-widest text-zinc-500 sm:block uppercase">
        LOC: JAKARTA / -6.1751° S, 106.8650° E
      </div>
      <div className="pointer-events-none absolute right-6 sm:right-10 top-6 hidden font-mono text-[10px] tracking-widest text-zinc-500 sm:block uppercase">
        STD: ISO 2768-1 / MEKATRONIKA
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          
          {/* Main Statement */}
          <div className="flex flex-col lg:col-span-8">
            
            {/* Status dot */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3 py-1 font-mono text-[11px] text-emerald-300 w-fit">
              <span className="dot--bounce h-1.5 w-1.5 text-emerald-400">
                <span className="pulse-ring"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              </span>
              <span>{profileData.status}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">SMKN 4 Jakarta</span>
            </div>

            {/* Editorial Title */}
            <h1 className="headline-big text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white tracking-tight lowercase">
              autonomous engineering & mechanics.
            </h1>

            {/* Profile identity */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm sm:text-base text-zinc-300">
              <span className="font-semibold text-white">{profileData.name}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-[#896fff] font-mono text-xs uppercase tracking-wider">{profileData.tagline}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400 text-xs sm:text-sm">CAD Inventor & Otomasi PLC</span>
            </div>

            <p className="mt-4 max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {profileData.bio}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="#proyek"
                onClick={() => triggerHaptic('light')}
                className="group flex min-h-[44px] items-center justify-between sm:justify-start gap-3 rounded-full bg-white px-5 py-2 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-[#896fff] hover:text-white"
              >
                <span>Lihat Portofolio</span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10 group-hover:bg-white/20 transition-colors">
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>

              <a
                href={profileData.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic('medium')}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-zinc-900/60 px-5 text-xs sm:text-sm font-medium text-zinc-300 transition-all hover:border-emerald-500/50 hover:text-emerald-400"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Minimalist Portrait Frame */}
          <div className="flex justify-center lg:col-span-4 lg:justify-end">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950 p-2 shadow-2xl">
                <div className="relative h-60 w-60 sm:h-72 sm:w-72 overflow-hidden rounded-xl bg-zinc-900">
                  <Image
                    src={profileData.avatar}
                    alt={profileData.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 240px, 288px"
                    className="object-cover object-top filter brightness-95 contrast-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                    <span>CAD / PLC / ROBOTIK</span>
                    <span className="text-[#896fff]">SMKN 4 JKT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
