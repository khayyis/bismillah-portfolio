'use client';

import React from 'react';
import { profileData } from '../lib/portfolioData';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { Briefcase, GraduationCap, MapPin, Calendar, ArrowUpRight } from 'lucide-react';

export default function ExperienceSection() {
  const { openProjectById } = useTelegramWebApp();

  return (
    <section id="pengalaman" className="border-b border-white/[0.08] bg-[#07080b] py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Makemepulse Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-6 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#896fff]"></span>
              <span className="cap-small text-[#896fff]">
                [ 04 / TRAJECTORY / RIWAYAT PROFESIONAL ]
              </span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white lowercase">
              pengalaman industri & rekayasa.
            </h2>
          </div>
          <p className="mt-2 text-xs font-mono text-zinc-400 md:mt-0 tracking-wider">
            DRAFTER PKL PT BAS (WINGS GROUP) / SISWA MEKATRONIKA
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {profileData.experience.map((exp, idx) => {
            const isEducation = exp.role.includes('Siswa');
            const Icon = isEducation ? GraduationCap : Briefcase;
            const targetProjectId = isEducation ? 'lks-robotics' : 'conveyor-bas';

            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 sm:p-8 transition-all duration-300 hover:border-[#896fff]/50 hover:bg-zinc-900/60"
              >
                <div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-zinc-900 text-[#896fff] group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {exp.role}
                        </h3>
                        <p className="font-mono text-xs font-semibold text-[#896fff]">
                          {exp.organization}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-zinc-900 px-3 py-1 font-mono text-[11px] text-zinc-200">
                        <Calendar className="h-3 w-3 text-zinc-400" />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400">
                        <MapPin className="h-3 w-3 text-zinc-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300 max-w-4xl">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    HASIL TERVERIFIKASI INDUSTRI
                  </span>
                  <button
                    type="button"
                    onClick={() => openProjectById(targetProjectId, profileData.projects)}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/[0.1] bg-zinc-900 px-4 text-xs font-semibold text-zinc-200 transition-all hover:border-[#896fff] hover:bg-[#896fff] hover:text-white"
                  >
                    <span>{isEducation ? 'Buka Portofolio LKS Robot' : 'Lihat Gambar Kerja PT BAS'}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
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
