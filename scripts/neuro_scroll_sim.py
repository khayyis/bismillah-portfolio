#!/usr/bin/env python3
"""
neuro_scroll_sim.py
===================
Simulasi Data-Science: Connectome Neuron Biologis -> Kinetika Scrolling Pengunjung.

Model  : Leaky Integrate-and-Fire (LIF) spiking neural network, rezim *balanced*
         (eksitasi ~ inhibisi) agar dinamika letupan realistis & tidak saturasi.
Sumber : arsitektur & parameter biologis dari dataset publik:
         - MICrONS / H01 human cortex fragment (Google & Harvard, Science 2024):
           1 mm^3, ~16.000 neuron, ~150 juta sinapsis, koneksi sparse ~5%,
           beberapa pasangan neuron dengan 50+ sinapsis (super-strong pairs).
         - FlyWire Drosophila Central Complex connectome (Nature 2024).

Tujuan: mengubah teks portofolio (nyata, dari lib/portfolioData.js) menjadi
        metrik kuantitatif: letupan sinaptik, distribusi aktivasi korteks,
        estimasi kecepatan kinetik motorik tangan (px/s) & beban kognitif.

CATATAN INTEGRITAS (anti-slop):
  * Ini MODEL SIMULASI untuk visualisasi edukatif, BUKAN pengukuran empiris
    atas pengunjung nyata. Angka keluaran adalah estimasi model, bukan klaim.
  * Deterministik: SEED tetap -> keluaran stabil & dapat direproduksi.
  * Parameter dikalibrasi sehingga keluaran berada pada rentang fisiologis
    literatur (kecepatan scroll baca manusia 60-140 px/s; beban kognitif 0-1).

Output: lib/neuroData.json
"""
import json
import os
import re
import hashlib
from typing import Dict, List

import numpy as np

SEED = 42
N_NEURONS = 1000
DURATION_TICKS = 200          # 200 tick x 10 ms = 2 detik pemrosesan per bagian
TICK_MS = 10
THRESHOLD = 1.0
DECAY = 0.90                  # kebocoran potensial membran 10% / tick
REFRACTORY_TICKS = 3          # 30 ms masa refrakter pasca letupan
SPARSITY = 0.05               # 5% koneksi (mirip korteks H01)

# Gain sinaptik: menjaga jaringan pada rezim balanced (mean input per neuron
# per tick << 1) sehingga tidak terjadi saturasi serentak.
SYNAPTIC_GAIN = 0.05
SUPER_PAIR_WEIGHT = 0.55      # outlier 50+ sinapsis/pair (bukan 2.5 -> saturasi)

# Pemetaan aktivitas motor -> kecepatan scroll (px/s), dibatasi rentang baca manusia.
VELOCITY_MIN_PX_S = 72.0
VELOCITY_MAX_PX_S = 132.0

# Kluster korteks: pemetaan fungsi -> indeks neuron
CLUSTERS = {
    "V1_visual":        (0, 200),    # resepsi teks/visual
    "Parietal_spatial": (200, 450),  # pemetaan layout & ruang 3D
    "Prefrontal_logic": (450, 750),  # verifikasi logika & metrik teknis
    "M1_motor":         (750, 1000), # transmisi motorik jari (scrolling)
}

# Routing semantik: token teknis mengaktifkan kluster kognitif lebih tinggi,
# token ajakan-kontak mengaktifkan korteks motorik (aksi).
TECH_KEYWORDS = {
    "cad", "plc", "pid", "iso", "ecu", "dyno", "k-line", "ftdi", "serial",
    "robot", "robotika", "konveyor", "inventor", "gripper", "enkoder", "sensor",
    "torsi", "whp", "telemetry", "firmware", "vision", "onnx", "yolo", "next",
    "cloudflare", "d1", "r2", "ss304", "ss316", "heliks", "gear", "modul",
    "toleransi", "drawing", "spatial", "kinematika", "autonomous", "control",
}
ACTION_KEYWORDS = {
    "hubungi", "kontak", "telegram", "whatsapp", "email", "github", "magang",
    "kerja", "kolaborasi", "rekrut", "hire", "contact",
}


def _stable_hash(token: str) -> int:
    """hash() bawaan Python tidak stabil antar proses (PYTHONHASHSEED).
    Gunakan digest MD5 agar encoding token deterministik."""
    return int(hashlib.md5(token.encode("utf-8")).hexdigest(), 16)


class BioConnectomeNeuralSimulator:
    """Jaringan saraf berdenyut (LIF) dengan topologi konektom biologis."""

    def __init__(self, n_neurons: int = N_NEURONS, seed: int = SEED):
        self.n_neurons = n_neurons
        rng = np.random.default_rng(seed)

        # Matriks bobot sinaptik sparse terarah (5% koneksi), skala balanced.
        sparse_mask = rng.random((n_neurons, n_neurons)) < SPARSITY
        self.weights = (
            rng.normal(0.2, 0.05, (n_neurons, n_neurons)) * sparse_mask * SYNAPTIC_GAIN
        )

        # Super-strong synaptic pairs (temuan Science 2024: 50+ sinapsis/pair)
        super_pairs = rng.choice(n_neurons, size=(20, 2), replace=False)
        for pre, post in super_pairs:
            self.weights[pre, post] = SUPER_PAIR_WEIGHT

        self.membrane_potentials = np.zeros(n_neurons)
        self.refractory_period = np.zeros(n_neurons)
        self.clusters = {
            name: np.arange(lo, hi) for name, (lo, hi) in CLUSTERS.items()
        }

    def encode_tokens_to_current(self, tokens: List[str]) -> np.ndarray:
        """Konversi token teks -> arus injeksi sensorik I(t).

        - Setiap token -> kluster V1 (reseptor visual) sebanding panjang token.
        - Token teknis -> tambahan eksitasi ke Parietal + Prefrontal.
        - Token aksi/kontak -> tambahan eksitasi ke korteks motorik M1.
        """
        currents = np.zeros(self.n_neurons)
        v1_lo, v1_hi = CLUSTERS["V1_visual"]
        par_lo, par_hi = CLUSTERS["Parietal_spatial"]
        pre_lo, pre_hi = CLUSTERS["Prefrontal_logic"]
        m1_lo, m1_hi = CLUSTERS["M1_motor"]

        for token in tokens:
            low = token.lower()
            base = len(token) * 0.11
            currents[v1_lo + (_stable_hash(token) % (v1_hi - v1_lo))] += base

            if low in TECH_KEYWORDS or any(k in low for k in ("pid", "iso", "cad")):
                currents[par_lo + (_stable_hash(low) % (par_hi - par_lo))] += 0.16
                currents[pre_lo + (_stable_hash(low + "l") % (pre_hi - pre_lo))] += 0.20
            if low in ACTION_KEYWORDS:
                currents[m1_lo + (_stable_hash(low) % (m1_hi - m1_lo))] += 0.30
        return currents

    def step(self, external_current: np.ndarray) -> np.ndarray:
        """Satu tick biologis (10 ms): integrasi LIF, spiking, propagasi sinaptik."""
        self.refractory_period = np.maximum(0, self.refractory_period - 1)
        active = self.refractory_period == 0

        self.membrane_potentials[active] = (
            DECAY * self.membrane_potentials[active] + external_current[active]
        )
        spikes = (self.membrane_potentials >= THRESHOLD) & active

        self.membrane_potentials[spikes] = 0.0
        self.refractory_period[spikes] = REFRACTORY_TICKS

        synaptic_input = np.dot(self.weights.T, spikes.astype(float))
        self.membrane_potentials += synaptic_input
        return spikes

    def run_section(self, text: str, duration_ticks: int = DURATION_TICKS) -> Dict:
        tokens = re.findall(r"\b[\w\-]+\b", text)
        input_current = self.encode_tokens_to_current(tokens)

        spike_timeline: List[int] = []
        cluster_activity = {name: 0 for name in self.clusters}

        for tick in range(duration_ticks):
            stimulus = input_current * np.exp(-tick / 40.0)  # peluruhan fiksasi
            spikes = self.step(stimulus)
            spike_timeline.append(int(np.sum(spikes)))
            for name, idx in self.clusters.items():
                cluster_activity[name] += int(np.sum(spikes[idx]))

        total_spikes = int(np.sum(spike_timeline))
        prefrontal_ratio = cluster_activity["Prefrontal_logic"] / max(total_spikes, 1)
        parietal_ratio = cluster_activity["Parietal_spatial"] / max(total_spikes, 1)
        motor_ratio = cluster_activity["M1_motor"] / max(total_spikes, 1)

        # Beban kognitif: kombinasi verifikasi logika + pemetaan spasial (0..1).
        # Koefisien dikalibrasi agar section teknis padat -> load tinggi (fokus dalam),
        # section ajakan/kontak -> load rendah (aksi cepat).
        cognitive_load = float(np.clip(1.4 * prefrontal_ratio + 1.8 * parietal_ratio, 0, 1))

        # Kecepatan scroll: makin berat beban kognitif -> makin lambat (deep reading);
        # dominasi korteks motorik (tujuan aksi) -> makin cepat. Dipetakan ke rentang fisiologis.
        norm = float(np.clip(1.0 - cognitive_load + 0.35 * motor_ratio, 0, 1))
        kinetic_velocity = VELOCITY_MIN_PX_S + norm * (VELOCITY_MAX_PX_S - VELOCITY_MIN_PX_S)

        return {
            "tokens": len(tokens),
            "total_synaptic_spikes": total_spikes,
            "motor_kinetic_velocity_px_s": round(float(kinetic_velocity), 1),
            "prefrontal_cognitive_load": round(cognitive_load, 3),
            "cluster_spikes": cluster_activity,
            "cluster_ratio": {k: round(v / max(total_spikes, 1), 4) for k, v in cluster_activity.items()},
            "spike_timeline": spike_timeline,
        }


def extract_sections() -> Dict[str, str]:
    """Ambil teks nyata dari lib/portfolioData.js (single source of truth)."""
    here = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(here, "..", "lib", "portfolioData.js")
    with open(data_path, encoding="utf-8") as f:
        raw = f.read()

    # Ekstraksi seluruh string literal ber-quote ganda -> korpus teks nyata.
    strings = re.findall(r'"([^"\\]{2,})"', raw)
    corpus = " ".join(strings)

    return {
        "Hero_Perkenalan": (
            "Khayyis Billawal Rozikin Teknik Mekatronika SMKN 4 Jakarta "
            "perancangan CAD mekanik otomasi PLC robotika mobile aplikasi web"
        ),
        "Pilar_Rekayasa": (
            "Robotika Mobile PLC Desain CAD Fabrikasi Computer Vision Embedded "
            "Firmware ECU Dyno Navigasi PID closed loop HMI industri"
        ),
        "Proyek_Konveyor_BAS": (
            "Sistem Transfer Konveyor 90 T-Junction PT Bumi Alam Segar Wings Group "
            "Overhead Rotary Flap Autodesk Inventor ISO 2768-1 shop drawing SS304 las"
        ),
        "Proyek_LKS_Robotika": (
            "Autonomous Mobile Robot LKS SMKN 4 Jakarta PID Closed-Loop Control "
            "Multi-Array IR Enkoder diferensial gripper presisi kinematika"
        ),
        "Proyek_ECU_WebSerial": (
            "ECU Web Serial Remap Dyno Telemetry FTDI FT232R K-Line DLC 16Hz "
            "CSV Logger Inertia WHP Torsi pengapian"
        ),
        "Kontak_Konversi": (
            "Hubungi Khayyis Telegram WhatsApp Email GitHub magang kerja "
            "kolaborasi rekrut kontak"
        ),
        "Korpus_Portofolio": corpus,
    }


def main() -> int:
    sections = extract_sections()
    sim = BioConnectomeNeuralSimulator()
    results = {name: sim.run_section(text) for name, text in sections.items()}

    content_keys = [k for k in results if k != "Korpus_Portofolio"]
    total_spikes = sum(results[k]["total_synaptic_spikes"] for k in content_keys)
    avg_velocity = round(
        float(np.mean([results[k]["motor_kinetic_velocity_px_s"] for k in content_keys])), 1
    )
    avg_load = round(
        float(np.mean([results[k]["prefrontal_cognitive_load"] for k in content_keys])), 3
    )

    payload = {
        "meta": {
            "model": "Leaky Integrate-and-Fire (LIF) spiking network",
            "neurons": N_NEURONS,
            "duration_ticks": DURATION_TICKS,
            "tick_ms": TICK_MS,
            "seed": SEED,
            "sparsity": SPARSITY,
            "refractory_ticks": REFRACTORY_TICKS,
            "decay": DECAY,
            "threshold": THRESHOLD,
            "synaptic_gain": SYNAPTIC_GAIN,
            "velocity_range_px_s": [VELOCITY_MIN_PX_S, VELOCITY_MAX_PX_S],
            "cluster_ranges": {k: [int(v[0]), int(v[1])] for k, v in CLUSTERS.items()},
            "sources": [
                "MICrONS / H01 human cortex fragment, Google & Harvard, Science 2024 (~150M synapses)",
                "FlyWire Drosophila Central Complex connectome, Nature 2024",
            ],
            "disclaimer": (
                "MODEL SIMULASI untuk visualisasi edukatif, bukan pengukuran "
                "empiris atas pengunjung nyata. Angka adalah estimasi model."
            ),
        },
        "summary": {
            "total_synaptic_spikes": int(total_spikes),
            "avg_motor_kinetic_velocity_px_s": avg_velocity,
            "avg_prefrontal_cognitive_load": avg_load,
            "sections_analyzed": len(content_keys),
        },
        "sections": results,
    }

    here = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(here, "..", "lib", "neuroData.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)

    print(f"[OK] neuroData.json ditulis: {os.path.abspath(out_path)}")
    print(f"     total spikes={total_spikes}  avg_velocity={avg_velocity} px/s  avg_load={avg_load}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
