'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { Wrench, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function SkillsSection() {
  const { openProjectById } = useTelegramWebApp();

  // Map categories to real related projects
  const categoryProjectMap = {
    0: 'lks-robotics',  // Otomasi & Robotika -> LKS Robot
    1: 'conveyor-bas',  // CAD & Manufaktur -> Konveyor PT BAS
    2: 'we-sut',        // Software & Rekayasa -> We.Sut
    3: 'ecu-remap'      // Sistem & Otomasi -> ECU Remap
  };

  return (
    <section id="keahlian" className="border-b border-white/[0.08] bg-[#07080b] py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Makemepulse Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-6 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#896fff]"></span>
              <span className="cap-small text-[#896fff]">
                [ 03 / CAPABILITY MATRIX / SPESIFIKASI KEMAMPUAN ]
              </span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white lowercase">
              matriks keahlian & standar rekayasa.
            </h2>
          </div>
          <p className="mt-2 text-xs font-mono text-zinc-400 md:mt-0 tracking-wider">
            STANDAR: ISO 2768-1 / MITSUBISHI GX WORKS2 / NEXT.JS 16
          </p>
        </div>

        {/* Matrix grid with interactive showcase links */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {profileData.skills.map((cat, idx) => {
            const relatedProjectId = categoryProjectMap[idx] || 'conveyor-bas';

            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 transition-all duration-300 hover:border-[#896fff]/50 hover:bg-zinc-900/60"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-[#896fff] border border-white/[0.08]">
                        <Wrench className="h-4 w-4" />
                      </div>
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                        {cat.category}
                      </h3>
                    </div>

                    {/* Interactive Button linking skill group to live project proof */}
                    <button
                      type="button"
                      onClick={() => openProjectById(relatedProjectId, profileData.projects)}
                      className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-white/[0.1] bg-zinc-900 px-3 text-[10px] sm:text-[11px] font-mono font-semibold text-[#896fff] transition-all hover:border-[#896fff] hover:bg-[#896fff] hover:text-white"
                      title="Lihat implementasi pada proyek nyata"
                    >
                      <span>BUKTI PROYEK</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="mt-5 space-y-3.5">
                    {cat.items.map((skill, sIdx) => (
                      <div key={sIdx} className="group/item">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-bold text-zinc-100 group-hover/item:text-[#896fff] transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                          {skill.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-zinc-500">
                  <span>DISIPLIN {idx + 1}</span>
                  <span className="text-emerald-400">TERVERIFIKASI PRAKTIK</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
