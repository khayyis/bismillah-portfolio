'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { useProjectModal } from './ProjectModalProvider';
import { Wrench, ArrowUpRight } from 'lucide-react';

export default function SkillsSection() {
  const { openProjectById } = useProjectModal();

  const categoryProjectMap = {
    0: 'lks-robotics',
    1: 'conveyor-bas',
    2: 'we-sut',
    3: 'ecu-remap'
  };

  return (
    <section id="keahlian" className="border-b border-white/[0.08] bg-[#07080b] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-6 mb-12">
          <div>
            <span className="cap-small text-[#896fff]">
              [ 03 / CAPABILITY MATRIX ]
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white lowercase">
              matriks keahlian & standar.
            </h2>
          </div>
          <p className="mt-2 text-xs font-mono text-zinc-500 md:mt-0 tracking-wider">
            ISO 2768-1 / MITSUBISHI GX WORKS2 / NEXT.JS 16
          </p>
        </div>

        {/* Matrix grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {profileData.skills.map((cat, idx) => {
            const relatedProjectId = categoryProjectMap[idx] || 'conveyor-bas';

            return (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 sm:p-7 transition-all duration-300 hover:border-[#896fff]/50 hover:bg-zinc-900/60"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <Wrench className="h-4 w-4 text-[#896fff]" />
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                        {cat.category}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => openProjectById(relatedProjectId, profileData.projects)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-[#896fff] transition-colors"
                      title="Lihat implementasi pada proyek nyata"
                    >
                      <span>BUKTI PROYEK</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cat.items.map((skill, sIdx) => (
                      <div key={sIdx} className="flex flex-col">
                        <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                          {skill.desc}
                        </span>
                      </div>
                    ))}
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
