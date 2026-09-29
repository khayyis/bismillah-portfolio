'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { profileData } from '../lib/portfolioData';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import TiltCard from './TiltCard';
import {
  FileText,
  X,
  CheckCircle2,
  MessageCircle,
  Search,
  Layers,
  Settings,
  ShieldCheck,
  Compass,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

export default function ProjectsSection() {
  const { triggerHaptic, activeModalProject, setActiveModalProject } = useTelegramWebApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalTab, setModalTab] = useState('specs'); // 'specs' | 'kinematics' | 'standards'

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'cad', label: 'CAD & Kinematika' },
    { id: 'robotics', label: 'Robotika & PLC' },
    { id: 'ai-vision', label: 'AI & Software' },
    { id: 'embedded', label: 'Firmware & Quant' }
  ];

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModalProject) {
        closeProjectModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProject]);

  const filteredProjects = useMemo(() => {
    return profileData.projects.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCategory;

      const matchSearch =
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.organization.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const openProjectModal = (project) => {
    triggerHaptic('light');
    setModalTab('specs');
    setActiveModalProject(project);
  };

  const closeProjectModal = () => {
    triggerHaptic('light');
    setActiveModalProject(null);
  };

  return (
    <section id="proyek" className="border-b border-zinc-800 bg-zinc-950 py-10 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Section Header with Attention Hook */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-400">
                Portofolio Terverifikasi Industri
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Dokumentasi Proyek Rekayasa
            </h2>
            <p className="mt-1.5 text-xs text-zinc-400">
              Hasil perancangan praktis industri, kompetisi robotika LKS, dan sistem kecerdasan buatan.
            </p>
          </div>

          {/* Interactive Live Search Bar: 100% width on phone */}
          <div className="mt-4 md:mt-0 w-full sm:w-72">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari proyek, CAD, atau instansi..."
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 py-2.5 pl-9 pr-8 text-xs text-white placeholder-zinc-500 transition-colors focus:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white p-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category filter tabs with horizontally scrollable pill container on phone */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <div className="flex overflow-x-auto pb-1 sm:pb-0 gap-1.5 no-scrollbar max-w-full">
            {categories.map((cat) => {
              const count =
                cat.id === 'all'
                  ? profileData.projects.length
                  : profileData.projects.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic('light');
                    setSelectedCategory(cat.id);
                  }}
                  className={`flex shrink-0 min-h-[38px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                      selectedCategory === cat.id ? 'bg-blue-800 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="font-mono text-xs text-zinc-400 shrink-0">
            Menampilkan <span className="font-bold text-white">{filteredProjects.length}</span> dari {profileData.projects.length} proyek
          </div>
        </div>

        {/* Empty state if search returns zero */}
        {filteredProjects.length === 0 && (
          <div className="my-12 flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
            <Search className="h-8 w-8 text-zinc-600" />
            <h3 className="mt-3 text-sm font-bold text-white">Tidak ada proyek yang sesuai</h3>
            <p className="mt-1 text-xs text-zinc-400">
              Tidak ditemukan hasil untuk kata kunci &quot;{searchQuery}&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* 3D Tilt Project Cards Grid: Stack to 1 column on phone, 2 on tablet, 3 on desktop */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const isFlagship = project.id === 'conveyor-bas' || project.id === 'lks-robotics';

            return (
              <TiltCard
                key={project.id}
                onClick={() => openProjectModal(project)}
                className={`border-caliper group flex cursor-pointer flex-col justify-between rounded-xl bg-zinc-900/40 p-0 transition-all hover:bg-zinc-900/80 ${
                  isFlagship ? 'border-blue-500/50 shadow-md shadow-blue-950/20' : ''
                }`}
              >
                <div>
                  {/* Project blueprint/photo view */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-zinc-950">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Category label */}
                    <div className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 rounded border border-zinc-700 bg-zinc-950/90 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-mono font-bold text-blue-300 backdrop-blur-sm shadow-sm">
                      {project.categoryLabel}
                    </div>

                    {/* Flagship Proof Badge for high retinal salience */}
                    {isFlagship && (
                      <div className="absolute left-2.5 bottom-2.5 sm:left-3 sm:bottom-3 inline-flex items-center gap-1 rounded bg-blue-600/90 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-white shadow-md backdrop-blur-sm">
                        <Award className="h-3 w-3" />
                        <span>PROYEK UNGGULAN</span>
                      </div>
                    )}

                    {/* Year tag */}
                    <div className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 rounded border border-zinc-700 bg-zinc-950/90 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-zinc-300 backdrop-blur-sm">
                      {project.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <div className="font-mono text-[10px] sm:text-[11px] font-bold text-blue-400">
                      INSTANSI: {project.organization}
                    </div>
                    <h3 className="mt-1 text-sm sm:text-base font-extrabold text-white group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-xs leading-relaxed text-zinc-300">
                      {project.summary}
                    </p>

                    {/* Technical metrics preview */}
                    <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 border-t border-zinc-800/80 pt-3">
                      {project.metrics.slice(0, 2).map((m, mIdx) => (
                        <div key={mIdx} className="rounded border border-zinc-800/80 bg-zinc-950 p-2">
                          <span className="block font-mono text-[9px] sm:text-[10px] text-zinc-500">{m.label}</span>
                          <span className="block truncate font-mono text-xs font-bold text-zinc-100">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Technical tags */}
                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action footer with high-affordance button */}
                <div className="border-t border-zinc-800/80 p-4 sm:p-5 pt-3">
                  <div className="flex min-h-[44px] w-full items-center justify-between rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 sm:px-4 text-xs font-bold text-zinc-200 transition-colors group-hover:border-blue-500 group-hover:text-blue-300">
                    <span className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-blue-400" />
                      <span>Buka Spesifikasi Teknis</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-blue-400 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>

      {/* Interactive 3-Tab Engineering Specification Modal (Responsive Fullsheet on Phone) */}
      {activeModalProject && (
        <div
          onClick={closeProjectModal}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 p-0 sm:p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="border-caliper relative max-h-[85vh] sm:max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-zinc-950 p-5 sm:p-6 shadow-2xl"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-3 sm:pb-4">
              <div className="pr-4">
                <div className="flex items-center gap-2">
                  <span className="rounded border border-blue-800 bg-blue-950/60 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-semibold text-blue-300">
                    {activeModalProject.categoryLabel}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-zinc-400">
                    TAHUN: {activeModalProject.year}
                  </span>
                </div>
                <h3 className="mt-1.5 sm:mt-2 text-lg sm:text-xl font-extrabold text-white">
                  {activeModalProject.title}
                </h3>
                <p className="font-mono text-[11px] sm:text-xs text-zinc-400">
                  INSTANSI: {activeModalProject.organization}
                </p>
              </div>

              <button
                type="button"
                onClick={closeProjectModal}
                className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                aria-label="Tutup Dialog Spesifikasi"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs: Scrollable on mobile */}
            <div className="mt-3 sm:mt-4 flex overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 border-b border-zinc-800 pb-2">
              <button
                type="button"
                onClick={() => setModalTab('specs')}
                className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  modalTab === 'specs'
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Ringkasan</span>
              </button>
              <button
                type="button"
                onClick={() => setModalTab('kinematics')}
                className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  modalTab === 'kinematics'
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Settings className="h-3.5 w-3.5" />
                <span>Analisis Rekayasa</span>
              </button>
              <button
                type="button"
                onClick={() => setModalTab('standards')}
                className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  modalTab === 'standards'
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Standar & Software</span>
              </button>
            </div>

            {/* Modal Tab Content */}
            <div className="mt-4 sm:mt-5 space-y-4 sm:space-y-5">
              
              {/* Tab 1: Specs */}
              {modalTab === 'specs' && (
                <>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">
                    {activeModalProject.summary}
                  </p>

                  <div>
                    <h4 className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-400">
                      Parameter & Metrik Desain
                    </h4>
                    <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {activeModalProject.metrics.map((m, idx) => (
                        <div key={idx} className="rounded-lg border border-zinc-800 bg-zinc-900/90 p-2.5 sm:p-3">
                          <span className="block font-mono text-[9px] sm:text-[10px] text-zinc-500">{m.label}</span>
                          <span className="block font-mono text-[11px] sm:text-xs font-bold text-zinc-100">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Tab 2: Kinematics / Engineering */}
              {modalTab === 'kinematics' && (
                <div>
                  <h4 className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-400">
                    Rincian Implementasi & Solusi Masalah
                  </h4>
                  <ul className="mt-2.5 space-y-2 sm:space-y-2.5">
                    {activeModalProject.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-zinc-300">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab 3: Standards & Software */}
              {modalTab === 'standards' && (
                <div>
                  <h4 className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-400">
                    Perangkat Lunak, Toleransi & Standar Manufaktur
                  </h4>
                  <div className="mt-2.5 flex flex-wrap gap-1.5 sm:gap-2">
                    {activeModalProject.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 font-mono text-[10px] sm:text-xs text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 sm:mt-4 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 sm:p-4">
                    <p className="font-mono text-xs font-bold text-white">Standar Mutu Rekayasa:</p>
                    <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                      Seluruh gambar kerja shop drawing disajikan dalam format standar ISO (A3/A4) dengan toleransi geometrik ISO 2768-1 kelas teliti, toleransi kekasaran permukaan N8, dan material sanitari stainless steel SS304/SS316.
                    </p>
                  </div>
                </div>
              )}

              {/* Inquire on WhatsApp Footer */}
              <div className="border-t border-zinc-800 pt-3 sm:pt-4">
                <a
                  href={`https://wa.me/${profileData.contacts.whatsapp}?text=Halo%20Khayyis%2C%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(
                    activeModalProject.title
                  )}%20di%20portofolio%20Anda.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Diskusikan Proyek Ini via WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
