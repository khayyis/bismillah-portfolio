'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { Bot, Cpu, Eye, Gauge, CheckCircle2, ArrowRight } from 'lucide-react';

const icons = {
  robotics: Bot,
  cad: Gauge,
  'ai-vision': Eye,
  embedded: Cpu
};

// Map each pillar to its flagship project ID
const pillarProjectMap = {
  cad: 'conveyor-bas',
  robotics: 'lks-robotics',
  'ai-vision': 'we-sut',
  embedded: 'ecu-remap'
};

export default function EngineeringPillars() {
  const { openProjectById } = useTelegramWebApp();

  return (
    <section id="pilar" className="border-b border-zinc-800 bg-zinc-900/30 py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Section title */}
        <div className="mb-6 sm:mb-10 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-400">
                Pilar Rekayasa
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Empat Pilar Keahlian Teknik
            </h2>
          </div>
          <p className="mt-1 text-[11px] sm:text-xs font-mono text-zinc-400 md:mt-0">
            KOMPETENSI: MEKANIKAL / PLC / COMPUTER VISION / EMBEDDED
          </p>
        </div>

        {/* Pillars grid with dynamic min-h and responsive stacking on mobile */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profileData.pillars.map((pillar) => {
            const Icon = icons[pillar.id] || Bot;
            const targetProjectId = pillarProjectMap[pillar.id];

            return (
              <div
                key={pillar.id}
                className="border-caliper flex min-h-[300px] sm:min-h-[360px] flex-col justify-between rounded-xl bg-zinc-950 p-4 sm:p-6 transition-all hover:bg-zinc-900/80"
              >
                <div>
                  <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold leading-snug text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                    {pillar.subtitle}
                  </p>
                </div>

                <div className="mt-4 sm:mt-5 border-t border-zinc-800/80 pt-3 sm:pt-4">
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

                  {/* Fully Interactive Button */}
                  <div className="mt-4 pt-2">
                    <button
                      type="button"
                      onClick={() => openProjectById(targetProjectId, profileData.projects)}
                      className="flex min-h-[44px] w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 text-xs font-semibold text-zinc-200 transition-colors hover:border-blue-500 hover:bg-blue-600/10 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <span>Buka Spesifikasi</span>
                      <ArrowRight className="h-3.5 w-3.5 text-blue-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
