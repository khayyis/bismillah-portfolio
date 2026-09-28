'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { profileData } from '../lib/portfolioData';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { FileText, X, CheckCircle2, MessageCircle } from 'lucide-react';

export default function ProjectsSection() {
  const { triggerHaptic, activeModalProject, setActiveModalProject } = useTelegramWebApp();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Semua Proyek' },
    { id: 'cad', label: 'CAD & Kinematika' },
    { id: 'robotics', label: 'Robotika & PLC' },
    { id: 'ai-vision', label: 'AI & Software' },
    { id: 'embedded', label: 'Firmware & Quant' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? profileData.projects
    : profileData.projects.filter(p => p.category === selectedCategory);

  const openProjectModal = (project) => {
    triggerHaptic('light');
    setActiveModalProject(project);
  };

  const closeProjectModal = () => {
    triggerHaptic('light');
    setActiveModalProject(null);
  };

  return (
    <section id="proyek" className="border-b border-zinc-800 bg-zinc-950 py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                Portofolio Terverifikasi
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Dokumentasi Proyek Rekayasa
            </h2>
            <p className="mt-1.5 text-xs text-zinc-400">
              Hasil perancangan praktis industri, kompetisi robotika LKS, dan sistem kecerdasan buatan.
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="mt-6 flex flex-wrap gap-2 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  setSelectedCategory(cat.id);
                }}
                className={`min-h-[44px] rounded-lg px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 font-semibold text-white shadow-sm'
                    : 'border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="border-caliper flex flex-col justify-between overflow-hidden rounded-xl bg-zinc-900/40 transition-all hover:bg-zinc-900/80"
            >
              <div>
                {/* Project blueprint/photo view */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* Category label */}
                  <div className="absolute left-3 top-3 rounded border border-zinc-700 bg-zinc-950/90 px-2.5 py-1 text-[11px] font-mono font-medium text-blue-300">
                    {project.categoryLabel}
                  </div>
                  {/* Year tag */}
                  <div className="absolute right-3 top-3 rounded border border-zinc-700 bg-zinc-950/90 px-2 py-1 font-mono text-[11px] text-zinc-300">
                    {project.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="font-mono text-[11px] font-medium text-zinc-400">
                    INSTANSI: {project.organization}
                  </div>
                  <h3 className="mt-1.5 text-base font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                    {project.summary}
                  </p>

                  {/* Technical metrics preview */}
                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-zinc-800/80 pt-3">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="rounded border border-zinc-800/80 bg-zinc-950 p-2">
                        <span className="block font-mono text-[10px] text-zinc-500">{m.label}</span>
                        <span className="block truncate font-mono text-xs font-bold text-zinc-200">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technical tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="border-t border-zinc-800/80 p-5 pt-3">
                <button
                  type="button"
                  onClick={() => openProjectModal(project)}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-4 text-xs font-semibold text-zinc-200 transition-colors hover:border-blue-500 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <FileText className="h-3.5 w-3.5 text-blue-400" />
                  <span>Buka Lembar Spesifikasi Teknis</span>
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Engineering Specification Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="border-caliper relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-zinc-950 p-6 shadow-2xl">
            
            {/* Modal header */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded border border-blue-800 bg-blue-950/60 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-blue-300">
                    {activeModalProject.categoryLabel}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    TAHUN: {activeModalProject.year}
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-extrabold text-white">
                  {activeModalProject.title}
                </h3>
                <p className="font-mono text-xs text-zinc-400">
                  INSTANSI: {activeModalProject.organization}
                </p>
              </div>
              <button
                type="button"
                onClick={closeProjectModal}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                aria-label="Tutup Dialog Spesifikasi"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="mt-5 space-y-5">
              <p className="text-sm leading-relaxed text-zinc-300">
                {activeModalProject.summary}
              </p>

              {/* Technical parameter table */}
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Parameter & Toleransi Desain
                </h4>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {activeModalProject.metrics.map((m, idx) => (
                    <div key={idx} className="rounded border border-zinc-800 bg-zinc-900/90 p-3">
                      <span className="block font-mono text-[10px] text-zinc-500">{m.label}</span>
                      <span className="block font-mono text-xs font-bold text-zinc-200">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uraian Kinematika / Rekayasa */}
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Uraian Analisis & Implementasi
                </h4>
                <ul className="mt-2.5 space-y-2">
                  {activeModalProject.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Software & Standar */}
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Software, Perangkat & Standar ISO
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeModalProject.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="rounded border border-zinc-700 bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Inquire on WhatsApp */}
              <div className="border-t border-zinc-800 pt-4">
                <a
                  href={`https://wa.me/${profileData.contacts.whatsapp}?text=Halo%20Khayyis%2C%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(activeModalProject.title)}%20di%20portofolio%20Anda.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Diskusikan Detail Rekayasa via WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
