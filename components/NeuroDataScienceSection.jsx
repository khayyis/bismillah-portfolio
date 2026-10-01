'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Brain, Activity, Eye, Zap, Cpu, Gauge, Info, MousePointer2 } from 'lucide-react';
import TiltCard from './TiltCard';
import neuroData from '../lib/neuroData.json';

const CLUSTER_LABELS = {
  V1_visual: { label: 'V1 Visual', color: '#3b82f6' },
  Parietal_spatial: { label: 'Parietal Spasial', color: '#06b6d4' },
  Prefrontal_logic: { label: 'Prefrontal Logika', color: '#a855f7' },
  M1_motor: { label: 'M1 Motorik', color: '#10b981' }
};

// Urutan tampil section (buang korpus agregat dari bar chart per-bagian)
const SECTION_ORDER = [
  'Hero_Perkenalan',
  'Pilar_Rekayasa',
  'Proyek_Konveyor_BAS',
  'Proyek_LKS_Robotika',
  'Proyek_ECU_WebSerial',
  'Kontak_Konversi'
];

const SECTION_LABELS = {
  Hero_Perkenalan: 'Perkenalan',
  Pilar_Rekayasa: 'Pilar Rekayasa',
  Proyek_Konveyor_BAS: 'Konveyor 90°',
  Proyek_LKS_Robotika: 'Robot LKS',
  Proyek_ECU_WebSerial: 'ECU Web Serial',
  Kontak_Konversi: 'Kontak'
};

const CORTEX_ZONES = [
  { max: 20, zone: 'V1/V2 Visual Cortex', role: 'Deteksi fitur teks & visual', load: 'Ringan' },
  { max: 55, zone: 'Parietal Spasial', role: 'Pemetaan layout & koordinat 3D', load: 'Fokus Dalam' },
  { max: 80, zone: 'Prefrontal Logika', role: 'Verifikasi metrik & standar teknis', load: 'Analitis' },
  { max: 101, zone: 'Motor Cortex M1', role: 'Aksi konversi (kontak / navigasi)', load: 'Aksi Cepat' }
];

export default function NeuroDataScienceSection() {
  const [telemetry, setTelemetry] = useState({
    depth: 0,
    velocity: 0,
    fixations: 0,
    cortex: CORTEX_ZONES[0]
  });
  const [reduceMotion, setReduceMotion] = useState(false);
  const stateRef = useRef({ lastY: 0, lastT: 0, fixations: 0, rafId: 0, pending: false });

  // Hormati preferensi aksesibilitas pengguna
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = (e) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Live scroll telemetry (di-throttle via requestAnimationFrame agar tanpa jank)
  useEffect(() => {
    const s = stateRef.current;
    s.lastY = window.scrollY;
    s.lastT = performance.now();

    const compute = () => {
      s.pending = false;
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(now - s.lastT, 16);
      const dist = Math.abs(y - s.lastY);
      const vel = Math.round((dist / dt) * 1000); // px/s

      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const depth = totalH > 0 ? Math.min(Math.round((y / totalH) * 100), 100) : 0;

      // Fiksasi visual: perlambatan scroll setelah pergerakan nyata (indikator membaca)
      if (vel < 60 && dist > 4) s.fixations += 1;

      const cortex = CORTEX_ZONES.find((z) => depth < z.max) || CORTEX_ZONES[CORTEX_ZONES.length - 1];

      setTelemetry({ depth, velocity: vel, fixations: s.fixations, cortex });

      s.lastY = y;
      s.lastT = now;
    };

    const onScroll = () => {
      if (s.pending) return;
      s.pending = true;
      s.rafId = requestAnimationFrame(compute);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (s.rafId) cancelAnimationFrame(s.rafId);
    };
  }, []);

  const maxSectionSpikes = Math.max(
    ...SECTION_ORDER.map((k) => neuroData.sections[k].total_synaptic_spikes)
  );

  const summary = neuroData.summary;

  return (
    <section
      id="neuro"
      aria-labelledby="neuro-heading"
      className="relative border-b border-zinc-800 bg-zinc-950 py-12 md:py-20 overflow-hidden"
    >
      {/* Latar grid rekayasa (struktur, tanpa ornamen blur generik) */}
      <div className="engineering-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                Data Science &amp; Connectome Telemetry
              </span>
            </div>
            <h2 id="neuro-heading" className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Simulasi Scrolling Berbasis Data Neuron
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
              Teks portofolio nyata diproses melalui jaringan saraf berdenyut
              (<span className="text-zinc-200">Leaky Integrate-and-Fire</span>) yang meniru topologi
              konektom korteks manusia, memetakan tiap bagian menjadi metrik kognitif dan kinetika
              scrolling yang bisa dibaca.
            </p>
          </div>

          <div className="flex shrink-0 items-start gap-2 rounded-lg border border-cyan-900/60 bg-cyan-950/25 px-3 py-2 font-mono text-[10px] text-cyan-300">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>
              LABEL: SIMULASI MODEL
              <br />
              <span className="text-zinc-500">bukan pengukuran pengunjung nyata</span>
            </span>
          </div>
        </div>

        {/* Live Telemetry HUD */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <TelemetryCard
            icon={Gauge}
            label="Kedalaman Baca"
            value={`${telemetry.depth}%`}
            sub="Viewport ter-render"
            tone="text-white"
          />
          <TelemetryCard
            icon={Activity}
            label="Kinetika Scroll"
            value={`${telemetry.velocity}`}
            unit="px/s"
            sub="Estimasi motorik tangan"
            tone="text-emerald-400"
          />
          <TelemetryCard
            icon={Eye}
            label="Fiksasi Visual"
            value={telemetry.fixations}
            unit="titik"
            sub="Saccadic fixation"
            tone="text-blue-300"
          />
          <TelemetryCard
            icon={Brain}
            label="Korteks Dominan"
            value={telemetry.cortex.zone}
            sub={telemetry.cortex.load}
            tone="text-cyan-300"
            small
          />
          <TelemetryCard
            icon={MousePointer2}
            label="Status Motorik"
            value={telemetry.velocity < 60 ? 'Deep Read' : telemetry.velocity < 120 ? 'Flow' : 'Scan'}
            sub={reduceMotion ? 'Motion off' : 'Live tracking'}
            tone="text-violet-300"
          />
        </div>

        {/* Visualisasi Aktivasi Kluster per Section */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TiltCard className="border-caliper h-full rounded-xl bg-zinc-900/40 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                <h3 className="text-sm font-bold text-white">Distribusi Aktivasi Kluster Korteks</h3>
                <span className="ml-auto font-mono text-[10px] text-zinc-500">
                  {summary.sections_analyzed} bagian · {summary.total_synaptic_spikes.toLocaleString('id-ID')} spikes
                </span>
              </div>

              <div className="space-y-4">
                {SECTION_ORDER.map((key) => {
                  const sec = neuroData.sections[key];
                  const barPct = Math.round((sec.total_synaptic_spikes / maxSectionSpikes) * 100);
                  return (
                    <div key={key}>
                      <div className="mb-1 flex items-baseline justify-between gap-2">
                        <span className="text-xs font-semibold text-zinc-200">
                          {SECTION_LABELS[key]}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500">
                          {sec.total_synaptic_spikes} spikes · load {sec.prefrontal_cognitive_load}
                        </span>
                      </div>
                      {/* Stacked cluster ratio bar */}
                      <div
                        className="flex h-2.5 w-full overflow-hidden rounded-full bg-zinc-800"
                        style={{ width: `${barPct}%` }}
                        role="img"
                        aria-label={`${SECTION_LABELS[key]}: ${sec.total_synaptic_spikes} spikes sinaptik`}
                      >
                        {Object.entries(sec.cluster_ratio).map(([c, ratio]) =>
                          ratio > 0.005 ? (
                            <div
                              key={c}
                              style={{
                                width: `${ratio * 100}%`,
                                backgroundColor: CLUSTER_LABELS[c].color
                              }}
                              title={`${CLUSTER_LABELS[c].label}: ${(ratio * 100).toFixed(1)}%`}
                            />
                          ) : null
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-zinc-800 pt-3">
                {Object.entries(CLUSTER_LABELS).map(([k, v]) => (
                  <span key={k} className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
                    <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: v.color }} aria-hidden="true" />
                    {v.label}
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Ringkasan agregat */}
          <div className="space-y-4">
            <TiltCard className="border-caliper rounded-xl bg-zinc-900/40 p-5">
              <div className="flex items-center gap-2 text-emerald-400">
                <Activity className="h-4 w-4" aria-hidden="true" />
                <h3 className="text-sm font-bold text-white">Kinetika Motorik</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Rata-rata kecepatan scroll model saat menyerap konten teknis.
              </p>
              <div className="mt-3 font-mono text-3xl font-bold text-emerald-400">
                {summary.avg_motor_kinetic_velocity_px_s}
                <span className="ml-1 text-sm font-normal text-zinc-500">px/s</span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-zinc-500">
                Rentang baca manusia 60-140 px/s
              </p>
            </TiltCard>

            <TiltCard className="border-caliper rounded-xl bg-zinc-900/40 p-5">
              <div className="flex items-center gap-2 text-violet-400">
                <Zap className="h-4 w-4" aria-hidden="true" />
                <h3 className="text-sm font-bold text-white">Beban Kognitif</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Rasio Prefrontal + Parietal rata-rata (fokus verifikasi teknis).
              </p>
              <div className="mt-3 font-mono text-3xl font-bold text-violet-400">
                {summary.avg_prefrontal_cognitive_load}
              </div>
              <p className="mt-1 font-mono text-[10px] text-zinc-500">Skala 0.0 - 1.0</p>
            </TiltCard>
          </div>
        </div>

        {/* 3 Kartu Metodologi */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <MethodCard
            icon={Brain}
            tone="text-cyan-400"
            title="Konektom H01 (Science 2024)"
            body="Studi 1 mm³ fragmen korteks manusia (Google & Harvard) memetakan ~16.000 neuron dan ~150 juta sinapsis. Komputasi efisien terjadi lewat sparse attention network, dasar matriks bobot 5% di model ini."
            rows={[
              ['Neuron model', '1.000 (subsampling)'],
              ['Densitas sinapsis', '5% sparse'],
              ['Super-pair', '20 × 50+ sinapsis'],
              ['Sumber', 'MICrONS / H01']
            ]}
            foot="STATUS: dipakai untuk bobot jaringan"
          />
          <MethodCard
            icon={Activity}
            tone="text-emerald-400"
            title="Leaky Integrate-and-Fire"
            body="Neuron mengakumulasi potensial membran, bocor 10%/tick, dan meletup saat ambang tercapai. Rangkaian letupan inilah yang diterjemahkan menjadi kecepatan kinetik tangan (px/s) dan beban kognitif."
            rows={[
              ['Ambang (Vth)', '1.0'],
              ['Kebocoran', '10% / tick'],
              ['Refrakter', '30 ms'],
              ['Tick', '10 ms']
            ]}
            foot="MODEL: spiking neural network"
          />
          <MethodCard
            icon={Eye}
            tone="text-violet-400"
            title="Routing Semantik ke Korteks"
            body="Token teknis (CAD, PID, ECU, ISO) mengaktifkan jalur Parietal & Prefrontal, sedangkan token ajakan (kontak, rekrut) mengaktifkan korteks motorik M1, memodelkan lintasan dari membaca menuju bertindak."
            rows={[
              ['Reseptor', 'V1 visual'],
              ['Pemetaan', 'Parietal spasial'],
              ['Verifikasi', 'Prefrontal'],
              ['Aksi', 'M1 motorik']
            ]}
            foot="PRINSIP: sensorimotor feedback loop"
          />
        </div>

        {/* Disclaimer / integritas */}
        <div className="mt-6 flex items-start gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3.5 py-3">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
          <p className="text-[11px] leading-relaxed text-zinc-500">
            <span className="font-semibold text-zinc-400">Catatan integritas:</span>{' '}
            {neuroData.meta.disclaimer} Parameter bersumber dari literatur publik
            (MICrONS/H01 Science 2024; FlyWire Nature 2024) dan bersifat edukatif.
          </p>
        </div>
      </div>
    </section>
  );
}

function TelemetryCard({ icon: Icon, label, value, unit, sub, tone, small }) {
  return (
    <div className="border-caliper rounded-xl bg-zinc-900/60 p-3.5">
      <div className="flex items-center gap-1.5 text-zinc-500">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-wide">{label}</span>
      </div>
      <span className={`mt-1.5 block font-mono font-bold ${tone} ${small ? 'truncate text-xs' : 'text-lg'}`}>
        {value}
        {unit && <span className="ml-1 text-xs font-normal text-zinc-500">{unit}</span>}
      </span>
      <span className="mt-0.5 block truncate font-mono text-[10px] text-zinc-500">{sub}</span>
    </div>
  );
}

function MethodCard({ icon: Icon, tone, title, body, rows, foot }) {
  return (
    <TiltCard className="border-caliper flex flex-col justify-between rounded-xl bg-zinc-900/40 p-5 sm:p-6">
      <div>
        <div className={`mb-3 flex items-center gap-2 ${tone}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
          <h3 className="text-sm font-bold text-white">{title}</h3>
        </div>
        <p className="text-xs leading-relaxed text-zinc-300">{body}</p>
        <div className="mt-4 space-y-1.5 border-t border-zinc-800/80 pt-3 font-mono text-[11px] text-zinc-400">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2">
              <span>{k}</span>
              <span className="text-right font-bold text-white">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 rounded border border-zinc-800 bg-zinc-950 p-2.5 font-mono text-[10px] text-zinc-400">
        {foot}
      </div>
    </TiltCard>
  );
}
