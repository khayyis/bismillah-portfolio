'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';

export default function ExperienceSection() {
  return (
    <section id="pengalaman" className="border-b border-zinc-800 bg-zinc-950 py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                Riwayat Profesional
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Pengalaman Industri & Pendidikan
            </h2>
          </div>
          <p className="mt-2 text-xs font-mono text-zinc-400 md:mt-0">
            DRAFTER PKL PT BAS (WINGS GROUP) / SISWA MEKATRONIKA
          </p>
        </div>

        {/* Experience timeline items */}
        <div className="mt-10 space-y-6">
          {profileData.experience.map((exp, idx) => {
            const isEducation = exp.role.includes('Siswa');
            const Icon = isEducation ? GraduationCap : Briefcase;
            return (
              <div
                key={idx}
                className="border-caliper rounded-xl bg-zinc-900/50 p-6 transition-all hover:bg-zinc-900/80"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950 text-blue-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-xs font-semibold text-blue-400">
                        {exp.organization}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                    <span className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-800 px-2.5 py-1 font-mono text-[11px] text-zinc-200">
                      <Calendar className="h-3 w-3 text-zinc-400" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
                      <MapPin className="h-3 w-3 text-zinc-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                  {exp.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
