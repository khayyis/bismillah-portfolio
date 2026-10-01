'use client';

import React, { useState } from 'react';
import { profileData } from '../lib/portfolioData';
import { useProjectModal } from './ProjectModalProvider';
import { useToast } from './Toast';
import TiltCard from './TiltCard';
import { MessageCircle, Mail, Copy, Check, ExternalLink } from 'lucide-react';

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function ContactSection() {
  const { triggerHaptic } = useProjectModal();
  const { showToast } = useToast();
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = (text, label, type) => {
    triggerHaptic('light');
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedType(type);
      showToast(`${label} disalin`, 'success');
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  return (
    <section id="kontak" className="border-b border-white/[0.08] bg-[#07080b] py-16 md:py-24 pb-28 sm:pb-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Header */}
        <div className="border-b border-white/[0.08] pb-8 mb-12">
          <span className="cap-small text-[#896fff]">
            [ 05 / INITIATE CONVERSATION ]
          </span>
          <h2 className="headline-big text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white lowercase mt-2">
            let's collaborate.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            Tersedia untuk magang, perancangan CAD industri, otomasi PLC, dan rekayasa web.
          </p>
        </div>

        {/* 2 Focused Channel Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl">
          
          {/* WhatsApp Card */}
          <TiltCard className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/70 p-6 sm:p-7 transition-all hover:border-emerald-500/50 hover:bg-zinc-900/60">
            <div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-500/20">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">WhatsApp</h3>
              <p className="mt-1 text-xs text-zinc-400">
                Pesan langsung untuk diskusi cepat atau wawancara kerja.
              </p>
              <div className="mt-4 rounded-xl border border-white/[0.08] bg-zinc-900/70 p-2.5 font-mono text-xs text-zinc-200">
                +62 895-3256-37890
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={profileData.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic('medium')}
                className="flex min-h-[42px] flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 text-xs font-semibold text-white transition-all hover:bg-emerald-500"
              >
                <span>Kirim Pesan</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(profileData.contacts.whatsapp, 'WhatsApp', 'whatsapp')}
                className="flex min-h-[42px] min-w-[42px] items-center justify-center rounded-full border border-white/[0.1] bg-zinc-900 text-zinc-300 hover:text-white"
                title="Salin Nomor WhatsApp"
                aria-label="Salin Nomor WhatsApp"
              >
                {copiedType === 'whatsapp' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </TiltCard>

          {/* Email Card */}
          <TiltCard className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/70 p-6 sm:p-7 transition-all hover:border-[#896fff]/50 hover:bg-zinc-900/60">
            <div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#896fff]/20 text-[#896fff] border border-[#896fff]/20">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Email Resmi</h3>
              <p className="mt-1 text-xs text-zinc-400">
                Pengiriman berkas formal atau proposal proyek.
              </p>
              <div className="mt-4 rounded-xl border border-white/[0.08] bg-zinc-900/70 p-2.5 font-mono text-xs text-zinc-200 truncate">
                {profileData.contacts.email}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={`mailto:${profileData.contacts.email}?subject=Inquiry%20Portofolio%20Khayyis`}
                onClick={() => triggerHaptic('medium')}
                className="flex min-h-[42px] flex-1 items-center justify-center gap-2 rounded-full bg-white text-black px-4 text-xs font-semibold transition-all hover:bg-[#896fff] hover:text-white"
              >
                <span>Tulis Email</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(profileData.contacts.email, 'Email', 'email')}
                className="flex min-h-[42px] min-w-[42px] items-center justify-center rounded-full border border-white/[0.1] bg-zinc-900 text-zinc-300 hover:text-white"
                title="Salin Alamat Email"
                aria-label="Salin Alamat Email"
              >
                {copiedType === 'email' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </TiltCard>

        </div>

        {/* Social channels */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 max-w-3xl">
          <div className="flex items-center gap-3">
            <a
              href={profileData.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-zinc-950 px-3.5 py-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-all"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>github/{profileData.contacts.githubUsername}</span>
            </a>
            <a
              href={profileData.contacts.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-zinc-950 px-3.5 py-1.5 text-xs font-mono text-zinc-300 hover:text-pink-400 transition-all"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              <span>{profileData.contacts.instagramUsername}</span>
            </a>
          </div>

          <span className="font-mono text-[10px] text-zinc-500">
            RESPON CEPAT (08:00 - 20:00 WIB)
          </span>
        </div>

      </div>
    </section>
  );
}
