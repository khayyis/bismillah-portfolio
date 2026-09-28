'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { Wrench, ArrowUpRight } from 'lucide-react';

export default function SkillsSection() {
  const { openProjectById } = useTelegramWebApp();

  // Map categories to real related projects
  const categoryProjectMap = {
    0: 'lks-robotics',  // Mekatronika & Otomasi -> LKS Robot
    1: 'conveyor-bas',  // 3D CAD & Manufaktur -> Konveyor PT BAS
    2: 'we-sut',        // AI & Web -> We.Sut
    3: 'ecu-remap'      // Hardware & Firmware -> ECU Remap
  };

  return (
    <section id="keahlian" className="border-b border-zinc-800 bg-zinc-900/30 py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                Spesifikasi Kemampuan
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Matriks Keahlian & Standar Rekayasa
            </h2>
          </div>
          <p className="mt-2 text-xs font-mono text-zinc-400 md:mt-0">
            STANDAR: ISO 2768-1 / MITSUBISHI GX WORKS2 / NEXT.JS 16
          </p>
        </div>

        {/* Matrix grid with interactive showcase links */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {profileData.skills.map((cat, idx) => {
            const relatedProjectId = categoryProjectMap[idx];

            return (
              <div
                key={idx}
                className="border-caliper flex flex-col justify-between rounded-xl bg-zinc-950 p-6 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <Wrench className="h-4 w-4 text-blue-400" />
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                        {cat.category}
                      </h3>
                    </div>

                    {/* Interactive Button linking skill group to live project proof */}
                    <button
                      type="button"
                      onClick={() => openProjectById(relatedProjectId, profileData.projects)}
                      className="inline-flex min-h-[36px] items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-2.5 text-[11px] font-mono font-medium text-blue-400 transition-colors hover:border-blue-500 hover:text-white"
                      title="Lihat implementasi pada proyek nyata"
                    >
                      <span>BUKTI PROYEK</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    {cat.items.map((skill, sIdx) => (
                      <div key={sIdx} className="group">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-zinc-100 group-hover:text-blue-400">
                            {skill.name}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-zinc-400">
                          {skill.desc}
                        </p>
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
