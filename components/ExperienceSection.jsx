'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { Briefcase, GraduationCap, MapPin, Calendar, ArrowUpRight } from 'lucide-react';

export default function ExperienceSection() {
  const { openProjectById } = useTelegramWebApp();

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

        {/* Experience timeline items with interactive project validation buttons */}
        <div className="mt-10 space-y-6">
          {profileData.experience.map((exp, idx) => {
            const isEducation = exp.role.includes('Siswa');
            const Icon = isEducation ? GraduationCap : Briefcase;
            const targetProjectId = isEducation ? 'lks-robotics' : 'conveyor-bas';

            return (
              <div
                key={idx}
                className="border-caliper flex flex-col justify-between rounded-xl bg-zinc-900/50 p-6 transition-all hover:bg-zinc-900/80"
              >
                <div>
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

                  <p className="mt-4 text-xs leading-relaxed text-zinc-300 sm:text-base">
                    {exp.description}
                  </p>
                </div>

                {/* Interactive button to open the associated industrial technical design */}
                <div className="mt-5 border-t border-zinc-800/80 pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => openProjectById(targetProjectId, profileData.projects)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 text-xs font-semibold text-zinc-200 transition-colors hover:border-blue-500 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <span>{isEducation ? 'Buka Portofolio LKS Robot' : 'Lihat Gambar Kerja PT BAS'}</span>
                    <ArrowUpRight className="h-4 w-4 text-blue-400" />
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
