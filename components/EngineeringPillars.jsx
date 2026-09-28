'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { Bot, Cpu, Eye, Gauge, CheckCircle2 } from 'lucide-react';

const icons = {
  robotics: Bot,
  cad: Gauge,
  'ai-vision': Eye,
  embedded: Cpu
};

export default function EngineeringPillars() {
  return (
    <section id="pilar" className="border-b border-zinc-800 bg-zinc-900/30 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Section title */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                Pilar Rekayasa
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Empat Pilar Keahlian Teknik
            </h2>
          </div>
          <p className="mt-2 text-xs font-mono text-zinc-400 md:mt-0">
            KOMPETENSI: MEKANIKAL / PLC / COMPUTER VISION / EMBEDDED
          </p>
        </div>

        {/* Pillars grid with dynamic min-h and responsive text */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profileData.pillars.map((pillar) => {
            const Icon = icons[pillar.id] || Bot;
            return (
              <div
                key={pillar.id}
                className="border-caliper flex min-h-[340px] flex-col justify-between rounded-xl bg-zinc-950 p-5 transition-all hover:bg-zinc-900/80 sm:p-6"
              >
                <div>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold leading-snug text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {pillar.subtitle}
                  </p>
                </div>

                <div className="mt-5 border-t border-zinc-800/80 pt-4">
                  <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    SPESIFIKASI PROYEK:
                  </p>
                  <ul className="space-y-1.5">
                    {pillar.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-zinc-300">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
                        <span className="leading-tight">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
