'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { profileData } from '../lib/portfolioData';
import { useProjectModal } from './ProjectModalProvider';
import TiltCard from './TiltCard';
import { FileText, X, CheckCircle2, Search, ArrowRight, ExternalLink } from 'lucide-react';

export default function ProjectsSection() {
  const { triggerHaptic, activeModalProject, setActiveModalProject } = useProjectModal();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalTab, setModalTab] = useState('specs');

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'cad', label: 'CAD' },
    { id: 'robotics', label: 'Robotik' },
    { id: 'ai-vision', label: 'AI Web' },
    { id: 'embedded', label: 'Firmware' }
  ];

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

      return (
        matchCategory &&
        (p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.organization.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)))
      );
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
    <section id="proyek" className="border-b border-white/[0.08] bg-[#07080b] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-8">
          <div>
            <span className="cap-small text-[#896fff]">
              [ 02 / SELECTED REPERTOIRE / DOKUMENTASI PROYEK REKAYASA ]
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white lowercase">
              katalog proyek rekayasa & sistem otonom.
            </h2>
            <p className="mt-2 text-xs text-zinc-400">
              Dokumentasi Proyek Rekayasa hasil perancangan praktis industri manufaktur, kompetisi robotika LKS, dan infrastruktur edge serverless.
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-6 md:mt-0 w-full sm:w-72">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari proyek, CAD, atau instansi..."
                className="w-full rounded-full border border-white/[0.1] bg-zinc-950 py-2 pl-9 pr-8 text-xs text-white placeholder-zinc-500 transition-all focus:border-[#896fff] focus:outline-none focus:ring-1 focus:ring-[#896fff]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-5">
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
                className={`flex items-center gap-2 rounded-full px-4 py-1 text-xs transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black font-semibold'
                    : 'border border-white/[0.08] bg-zinc-950 text-zinc-400 hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span className="font-mono text-[10px] opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const isFlagship = project.id === 'conveyor-bas';

            return (
              <TiltCard
                key={project.id}
                onClick={() => openProjectModal(project)}
                className={`group cursor-pointer flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/70 p-0 transition-all duration-300 hover:border-[#896fff]/60 hover:bg-zinc-900/60 overflow-hidden ${
                  isFlagship ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className={`relative w-full overflow-hidden bg-zinc-950 ${isFlagship ? 'h-64 sm:h-80' : 'h-52'}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    <div className="absolute left-3 top-3 rounded-full border border-white/[0.1] bg-black/60 backdrop-blur-md px-3 py-0.5 text-[10px] font-mono text-[#896fff]">
                      {project.categoryLabel}
                    </div>

                    <div className="absolute right-3 top-3 rounded-full border border-white/[0.1] bg-black/60 backdrop-blur-md px-2.5 py-0.5 font-mono text-[10px] text-zinc-400">
                      {project.year}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                      {project.organization}
                    </div>
                    <h3 className="mt-1 text-base sm:text-lg font-semibold text-white group-hover:text-[#896fff] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                  <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
                    <span>Buka Spesifikasi Lengkap</span>
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-[#896fff] transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>

      {/* Modal Dossier */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-toast"
          role="dialog"
          aria-modal="true"
          onClick={closeProjectModal}
        >
          <div
            className="relative flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-zinc-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] p-5 bg-zinc-900/40">
              <div>
                <h3 className="text-base font-bold text-white">
                  {activeModalProject.title}
                </h3>
                <span className="font-mono text-xs text-[#896fff]">
                  {activeModalProject.organization} ({activeModalProject.year})
                </span>
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

            <div className="flex border-b border-white/[0.08] bg-zinc-900/20 px-5">
              <button
                type="button"
                onClick={() => setModalTab('specs')}
                className={`py-3 text-xs font-medium border-b-2 mr-6 transition-all ${
                  modalTab === 'specs'
                    ? 'border-[#896fff] text-white font-semibold'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Spesifikasi
              </button>
              <button
                type="button"
                onClick={() => setModalTab('details')}
                className={`py-3 text-xs font-medium border-b-2 transition-all ${
                  modalTab === 'details'
                    ? 'border-[#896fff] text-white font-semibold'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Rincian
              </button>
            </div>

            <div className="overflow-y-auto p-5 space-y-4">
              {modalTab === 'specs' && (
                <div className="grid grid-cols-2 gap-2.5">
                  {activeModalProject.metrics.map((m, idx) => (
                    <div key={idx} className="rounded-xl border border-white/[0.06] bg-zinc-900/50 p-3">
                      <span className="font-mono text-[10px] uppercase text-zinc-500 block">
                        {m.label}
                      </span>
                      <span className="text-xs font-semibold text-white block mt-0.5">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {modalTab === 'details' && (
                <ul className="space-y-2">
                  {activeModalProject.details.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#896fff]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-white/[0.08] p-4 bg-zinc-900/40 flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-500">TERVERIFIKASI</span>
              <a
                href={profileData.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-1.5 text-xs font-semibold hover:bg-[#896fff] hover:text-white transition-colors"
              >
                <span>Tanya Proyek</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
