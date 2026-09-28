'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { Wrench, CheckCircle } from 'lucide-react';

export default function SkillsSection() {
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

        {/* Matrix grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {profileData.skills.map((cat, idx) => (
            <div
              key={idx}
              className="border-caliper rounded-xl bg-zinc-950 p-6 shadow-sm"
            >
              <div className="flex items-center gap-2.5 border-b border-zinc-800/80 pb-3">
                <Wrench className="h-4 w-4 text-blue-400" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  {cat.category}
                </h3>
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
          ))}
        </div>

      </div>
    </section>
  );
}
