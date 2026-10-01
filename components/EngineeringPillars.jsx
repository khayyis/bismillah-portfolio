'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { useProjectModal } from './ProjectModalProvider';
import { Bot, Cpu, Eye, Gauge, CheckCircle2, ArrowRight } from 'lucide-react';

const icons = {
  robotics: Bot,
  cad: Gauge,
  'ai-vision': Eye,
  embedded: Cpu
};

const pillarProjectMap = {
  cad: 'conveyor-bas',
  robotics: 'lks-robotics',
  'ai-vision': 'we-sut',
  embedded: 'ecu-remap'
};

export default function EngineeringPillars() {
  const { openProjectById } = useProjectModal();

  return (
    <section id="pilar" className="border-b border-white/[0.08] bg-[#07080b] py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Makemepulse Editorial Section Header */}
        <div className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#896fff]"></span>
              <span className="cap-small text-[#896fff]">
                [ 01 / PILAR REKAYASA & KOMPETENSI ]
              </span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white lowercase">
              disiplin rekayasa & standar presisi.
            </h2>
          </div>
          <p className="mt-2 text-xs font-mono text-zinc-400 md:mt-0 tracking-wider">
            KOMPETENSI: ISO 2768-1 / PLC MITSUBISHI / COMPUTER VISION / EMBEDDED
          </p>
        </div>

        {/* Makemepulse Numbered Disciplines Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profileData.pillars.map((pillar, idx) => {
            const Icon = icons[pillar.id] || Bot;
            const targetProjectId = pillarProjectMap[pillar.id] || 'conveyor-bas';
            const indexNumber = `0${idx + 1}`;

            return (
              <div
                key={pillar.id}
                className="group relative flex min-h-[360px] flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 transition-all duration-300 hover:border-[#896fff]/50 hover:bg-zinc-900/60"
              >
                <div>
                  {/* Makemepulse index number & icon */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                    <span className="font-mono text-2xl font-light text-zinc-600 group-hover:text-[#896fff] transition-colors">
                      {indexNumber}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-zinc-900 text-[#896fff] group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#896fff] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {pillar.subtitle}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-4">
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    SPESIFIKASI PROYEK:
                  </div>
                  <ul className="space-y-1.5 mb-5">
                    {pillar.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#896fff]" />
                        <span className="leading-tight">{hl}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Open Specification Button */}
                  <button
                    type="button"
                    onClick={() => openProjectById(targetProjectId, profileData.projects)}
                    className="flex min-h-[44px] w-full items-center justify-between rounded-xl border border-white/[0.08] bg-zinc-900/80 px-4 text-xs font-semibold text-zinc-200 transition-all hover:border-[#896fff] hover:bg-[#896fff]/10 hover:text-white"
                  >
                    <span>Buka Spesifikasi</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#896fff]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
