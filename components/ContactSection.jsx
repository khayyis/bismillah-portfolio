'use client';

import React, { useState } from 'react';
import { profileData } from '../lib/portfolioData';
import { useTelegramWebApp } from './TelegramWebAppProvider';
import { useToast } from './Toast';
import TiltCard from './TiltCard';
import { Send, MessageCircle, Mail, Copy, Check, ExternalLink } from 'lucide-react';

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
  const { triggerHaptic } = useTelegramWebApp();
  const { showToast } = useToast();
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = (text, label, type) => {
    triggerHaptic('light');
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedType(type);
      showToast(`${label} berhasil disalin ke clipboard!`, 'success');
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  return (
    <section id="kontak" className="border-b border-zinc-800 bg-zinc-950 py-10 md:py-20 pb-28 sm:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                Saluran Komunikasi
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Hubungi Khayyis Billawal Rozikin
            </h2>
          </div>
          <p className="mt-1 text-[11px] sm:text-xs font-mono text-zinc-400 md:mt-0">
            KOLABORASI: CAD SHOP DRAWING / ROBOTIK / AI SYSTEMS
          </p>
        </div>

        {/* Contact channels grid with 3D TiltCards */}
        <div className="mt-6 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Telegram Card */}
          <TiltCard className="border-caliper flex flex-col justify-between rounded-xl bg-zinc-900/60 p-4 sm:p-6">
            <div>
              <div className="mb-3 sm:mb-4 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-blue-950 text-blue-400">
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Telegram Langsung</h3>
              <p className="mt-1 text-xs text-zinc-400">
                Respon tercepat untuk diskusi teknis, tanya jawab kode, dan review dokumen CAD.
              </p>
              <div className="mt-3 sm:mt-4 rounded border border-zinc-800 bg-zinc-950 p-2 font-mono text-xs text-zinc-200 truncate">
                @{profileData.contacts.telegram}
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex items-center gap-2">
              <a
                href={profileData.contacts.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic('medium')}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 sm:px-4 text-xs font-bold text-white transition-colors hover:bg-blue-500"
              >
                <span>Buka Chat</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(profileData.contacts.telegram, 'Username Telegram', 'telegram')}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                title="Salin Username Telegram"
                aria-label="Salin Username Telegram"
              >
                {copiedType === 'telegram' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </TiltCard>

          {/* WhatsApp Card */}
          <TiltCard className="border-caliper flex flex-col justify-between rounded-xl bg-zinc-900/60 p-4 sm:p-6">
            <div>
              <div className="mb-3 sm:mb-4 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-emerald-950 text-emerald-400">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">WhatsApp Resmi</h3>
              <p className="mt-1 text-xs text-zinc-400">
                Saluran pesan instan dengan template otomatis untuk kebutuhan kolaborasi.
              </p>
              <div className="mt-3 sm:mt-4 rounded border border-zinc-800 bg-zinc-950 p-2 font-mono text-xs text-zinc-200 truncate">
                +{profileData.contacts.whatsapp}
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex items-center gap-2">
              <a
                href={profileData.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic('medium')}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 sm:px-4 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
              >
                <span>Chat WhatsApp</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(`+${profileData.contacts.whatsapp}`, 'Nomor WhatsApp', 'wa')}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                title="Salin Nomor WhatsApp"
                aria-label="Salin Nomor WhatsApp"
              >
                {copiedType === 'wa' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </TiltCard>

          {/* Email Card */}
          <TiltCard className="border-caliper flex flex-col justify-between rounded-xl bg-zinc-900/60 p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div>
              <div className="mb-3 sm:mb-4 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-200">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Surat Elektronik (Email)</h3>
              <p className="mt-1 text-xs text-zinc-400">
                Untuk pengiriman dokumen resmi, proposal magang, dan penawaran kerja sama.
              </p>
              <div className="mt-3 sm:mt-4 truncate rounded border border-zinc-800 bg-zinc-950 p-2 font-mono text-xs text-zinc-200">
                {profileData.contacts.email}
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex items-center gap-2">
              <a
                href={`mailto:${profileData.contacts.email}?subject=Inquiry%20Portofolio%20Teknik%20Khayyis`}
                onClick={() => triggerHaptic('medium')}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 sm:px-4 text-xs font-bold text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
              >
                <span>Kirim Email</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(profileData.contacts.email, 'Alamat Email', 'email')}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                title="Salin Alamat Email"
                aria-label="Salin Alamat Email"
              >
                {copiedType === 'email' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </TiltCard>

        </div>

        {/* Public profile footer badges */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 rounded-xl border border-zinc-800 bg-zinc-900/30 p-3 sm:p-4 text-xs text-zinc-400 sm:justify-start">
          <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300">Profil Publik:</span>
          <a
            href={profileData.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center gap-2 text-zinc-300 hover:text-white transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="font-mono text-[11px] sm:text-xs">github.com/{profileData.contacts.githubUsername}</span>
          </a>
          <a
            href={profileData.contacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center gap-2 text-zinc-300 hover:text-white transition-colors"
          >
            <InstagramIcon className="h-4 w-4" />
            <span className="font-mono text-[11px] sm:text-xs">{profileData.contacts.instagramUsername}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
