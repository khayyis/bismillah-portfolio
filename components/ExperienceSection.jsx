'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { useProjectModal } from './ProjectModalProvider';
import { Briefcase, GraduationCap, MapPin, Calendar, ArrowUpRight } from 'lucide-react';

export default function ExperienceSection() {
  const { openProjectById } = useProjectModal();

  return (
    <section id="pengalaman" className="border-b border-white/[0.08] bg-[#07080b] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-6 mb-12">
          <div>
            <span className="cap-small text-[#896fff]">
              [ 04 / TRAJECTORY ]
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white lowercase">
              pengalaman & riwayat.
            </h2>
          </div>
          <p className="mt-2 text-xs font-mono text-zinc-500 md:mt-0 tracking-wider">
            DRAFTER PKL PT BAS / SISWA MEKATRONIKA SMKN 4
          </p>
        </div>

        {/* Timeline cards */}
        <div className="space-y-6">
          {profileData.experience.map((exp, idx) => {
            const isEducation = exp.role.includes('Siswa');
            const Icon = isEducation ? GraduationCap : Briefcase;
            const targetProjectId = isEducation ? 'lks-robotics' : 'conveyor-bas';

            return (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 sm:p-7 transition-all duration-300 hover:border-[#896fff]/50 hover:bg-zinc-900/60"
              >
                <div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-zinc-900 text-[#896fff]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white leading-snug">
                          {exp.role}
                        </h3>
                        <p className="font-mono text-xs text-[#896fff]">
                          {exp.organization}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono text-[11px]">
                      <span>{exp.period}</span>
                      <span className="text-zinc-600">/</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-white/[0.06] pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => openProjectById(targetProjectId, profileData.projects)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>{isEducation ? 'Buka Portofolio LKS' : 'Buka Gambar Kerja PT BAS'}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#896fff]" />
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
