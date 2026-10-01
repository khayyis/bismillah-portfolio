'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { useProjectModal } from './ProjectModalProvider';
import { Bot, Cpu, Eye, Gauge, ArrowRight } from 'lucide-react';

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
  embedded: 'plc-automation'
};

export default function EngineeringPillars() {
  const { openProjectById } = useProjectModal();

  return (
    <section id="pilar" className="border-b border-white/[0.08] bg-[#07080b] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-6">
          <div>
            <span className="cap-small text-[#896fff]">
              [ 01 / PILAR REKAYASA ]
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white lowercase">
              kompetensi & spesialisasi.
            </h2>
          </div>
          <p className="mt-2 text-xs font-mono text-zinc-500 md:mt-0 tracking-wider">
            ISO 2768-1 / PLC MITSUBISHI / COMPUTER VISION / EMBEDDED
          </p>
        </div>

        {/* Minimalist 4-Column Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profileData.pillars.map((pillar, idx) => {
            const Icon = icons[pillar.id] || Bot;
            const targetProjectId = pillarProjectMap[pillar.id] || 'conveyor-bas';
            const indexNumber = `0${idx + 1}`;

            return (
              <div
                key={pillar.id}
                onClick={() => openProjectById(targetProjectId, profileData.projects)}
                className="group cursor-pointer flex min-h-[280px] flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 transition-all duration-300 hover:border-[#896fff]/50 hover:bg-zinc-900/60"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                    <span className="font-mono text-xl font-light text-zinc-600 group-hover:text-[#896fff] transition-colors">
                      {indexNumber}
                    </span>
                    <Icon className="h-5 w-5 text-zinc-400 group-hover:text-[#896fff] transition-colors" />
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug group-hover:text-[#896fff] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
                  <span>Lihat Detail</span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-[#896fff] transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
