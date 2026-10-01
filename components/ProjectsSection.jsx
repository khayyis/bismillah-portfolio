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
  Award,
  ExternalLink
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
    { id: 'ai-vision', label: 'AI & Rekayasa Web' },
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
    <section id="proyek" className="border-b border-white/[0.08] bg-[#07080b] py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Makemepulse Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#896fff]"></span>
              <span className="cap-small text-[#896fff]">
                [ 02 / SELECTED REPERTOIRE / DOKUMENTASI PROYEK REKAYASA ]
              </span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white lowercase">
              katalog proyek rekayasa & sistem otonom.
            </h2>
            <p className="mt-1.5 text-xs text-zinc-400">
              Dokumentasi praktis industri manufaktur, kompetisi robotika LKS, dan infrastruktur edge serverless.
            </p>
          </div>

          {/* Interactive Live Search Bar */}
          <div className="mt-5 md:mt-0 w-full sm:w-80">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari proyek, CAD, atau instansi..."
                className="w-full rounded-full border border-white/[0.1] bg-zinc-950/80 py-2.5 pl-10 pr-9 text-xs text-white placeholder-zinc-500 transition-all focus:border-[#896fff] focus:outline-none focus:ring-1 focus:ring-[#896fff]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white p-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Horizontally scrollable on mobile) */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div className="flex overflow-x-auto pb-1 sm:pb-0 gap-2 no-scrollbar max-w-full">
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
                  className={`flex shrink-0 min-h-[38px] items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-white text-black shadow-lg font-bold'
                      : 'border border-white/[0.08] bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                      selectedCategory === cat.id ? 'bg-black text-white' : 'bg-zinc-800 text-zinc-400'
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
          <div className="my-14 flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-zinc-950 p-10 text-center">
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
              className="mt-4 rounded-full bg-white text-black px-5 py-2 text-xs font-bold hover:bg-[#896fff] hover:text-white transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Makemepulse Asymmetric Project Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => {
            const isFlagship = project.id === 'conveyor-bas';

            return (
              <TiltCard
                key={project.id}
                onClick={() => openProjectModal(project)}
                className={`group flex cursor-pointer flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/70 p-0 transition-all duration-300 hover:border-[#896fff]/60 hover:bg-zinc-900/60 overflow-hidden ${
                  isFlagship ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  {/* Card Visual / Thumbnail */}
                  <div className={`relative w-full overflow-hidden bg-zinc-950 ${isFlagship ? 'h-64 sm:h-80' : 'h-52 sm:h-56'}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Category label badge */}
                    <div className="absolute left-3 top-3 rounded-full border border-white/[0.1] bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-mono font-bold text-[#896fff]">
                      {project.categoryLabel}
                    </div>

                    {/* Flagship Award Stamp */}
                    {isFlagship && (
                      <div className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-[#896fff] text-white px-3 py-1 font-mono text-[10px] font-bold shadow-lg backdrop-blur-sm">
                        <Award className="h-3.5 w-3.5" />
                        <span>KARYA UTAMA DRAFTER INDUSTRI</span>
                      </div>
                    )}

                    {/* Year tag */}
                    <div className="absolute right-3 top-3 rounded-full border border-white/[0.1] bg-black/60 backdrop-blur-md px-2.5 py-1 font-mono text-[10px] text-zinc-300">
                      {project.year}
                    </div>
                  </div>

                  {/* Card Content & Meta */}
                  <div className="p-5 sm:p-6">
                    <div className="font-mono text-[10px] font-bold text-[#896fff] uppercase tracking-wider">
                      INSTANSI: {project.organization}
                    </div>
                    <h3 className="mt-1 text-base sm:text-lg font-bold text-white group-hover:text-[#896fff] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                      {project.summary}
                    </p>

                    {/* Technical metrics preview */}
                    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.08] pt-3.5">
                      {project.metrics.slice(0, 2).map((m, mIdx) => (
                        <div key={mIdx} className="rounded-xl border border-white/[0.06] bg-zinc-900/60 p-2.5">
                          <span className="block font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                            {m.label}
                          </span>
                          <span className="mt-0.5 block text-xs font-semibold text-zinc-200 truncate">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Trigger Button */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                  <div className="flex items-center justify-between border-t border-white/[0.08] pt-3">
                    <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
                      Buka Spesifikasi Lengkap
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 group-hover:bg-[#896fff] group-hover:text-white transition-all">
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>

      {/* Deep-Dive Project Modal Dossier */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-toast"
          role="dialog"
          aria-modal="true"
          onClick={closeProjectModal}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-zinc-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] p-5 sm:p-6 bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#896fff]/20 text-[#896fff] border border-[#896fff]/30">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {activeModalProject.title}
                  </h3>
                  <span className="font-mono text-xs text-[#896fff]">
                    {activeModalProject.organization} ({activeModalProject.year})
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeProjectModal}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] bg-zinc-900 text-zinc-400 hover:text-white"
                aria-label="Tutup Dialog Modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-white/[0.08] bg-zinc-900/30 px-6">
              <button
                type="button"
                onClick={() => setModalTab('specs')}
                className={`py-3 text-xs font-semibold border-b-2 mr-6 transition-all ${
                  modalTab === 'specs'
                    ? 'border-[#896fff] text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Spesifikasi Teknis
              </button>
              <button
                type="button"
                onClick={() => setModalTab('kinematics')}
                className={`py-3 text-xs font-semibold border-b-2 mr-6 transition-all ${
                  modalTab === 'kinematics'
                    ? 'border-[#896fff] text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Analisis Kinematika
              </button>
              <button
                type="button"
                onClick={() => setModalTab('standards')}
                className={`py-3 text-xs font-semibold border-b-2 transition-all ${
                  modalTab === 'standards'
                    ? 'border-[#896fff] text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Standar Manufaktur
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
              
              {modalTab === 'specs' && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#896fff] mb-3">
                    Parameter Kuantitatif & Matriks:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalProject.metrics.map((m, idx) => (
                      <div key={idx} className="rounded-xl border border-white/[0.08] bg-zinc-900/50 p-3.5">
                        <span className="font-mono text-[10px] uppercase text-zinc-500 block">
                          {m.label}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#896fff] mt-6 mb-3">
                    Uraian Implementasi Rekayasa:
                  </h4>
                  <ul className="space-y-2">
                    {activeModalProject.details.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#896fff]" />
                        <span className="leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {modalTab === 'kinematics' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-white/[0.08] bg-zinc-900/40">
                    <span className="font-mono text-xs text-[#896fff] font-bold block mb-1">
                      Mekanisme & Simulasi Dinamika:
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Sistem dirancang untuk menjamin kontinuitas aliran kerja tanpa hambatan. Analisis kinematika rotasi dan kendali loop tertutup diuji untuk meminimalkan inersia dan getaran mekanik.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.tags.map((tag, idx) => (
                      <span key={idx} className="rounded-full border border-white/[0.1] bg-zinc-900 px-3 py-1 font-mono text-[11px] text-zinc-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {modalTab === 'standards' && (
                <div className="p-4 rounded-xl border border-white/[0.08] bg-zinc-900/40 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <ShieldCheck className="h-4 w-4" />
                    <span>VERIFIKASI INTEGRITAS REKAYASA</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Setiap gambar kerja mematuhi standar ISO 2768-1 untuk toleransi geometri, simbol proyeksi Eropa, serta etiket standar fabrikasi bengkel PT Bumi Alam Segar (Wings Group).
                  </p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/[0.08] p-4 sm:p-5 bg-zinc-900/50 flex items-center justify-between">
              <span className="font-mono text-[11px] text-zinc-400">
                STATUS: TERVERIFIKASI
              </span>
              <a
                href={profileData.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#896fff] px-5 py-2 text-xs font-bold text-white hover:bg-purple-600 transition-colors"
              >
                <span>Tanya Detail Proyek</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
