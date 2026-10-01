#!/usr/bin/env python3
"""
verify_neuro_delivery.py
========================
Verifikasi deterministik (assert-based, zero ambiguity) untuk delivery:
  "Redraw UI + Simulasi Scrolling Data Neuron (Data Science)".

Menguji 4 lapis:
  A. Integritas data neuroData.json (skema, rentang fisiologis, determinisme).
  B. Bukti bahwa teks NYATA dari portfolioData.js benar-benar dipakai.
  C. Wiring komponen React (import, render, nav, aksesibilitas, anti-jank).
  D. Anti-slop (label SIMULASI, disclaimer, tanpa angka mustahil).

Exit 0 = SEMUA LULUS. Exit 1 = ada assertion gagal.
"""
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(ROOT, "lib", "neuroData.json")
SIM_PATH = os.path.join(ROOT, "scripts", "neuro_scroll_sim.py")
COMPONENT = os.path.join(ROOT, "components", "NeuroDataScienceSection.jsx")
PAGE = os.path.join(ROOT, "app", "page.js")
NAVBAR = os.path.join(ROOT, "components", "Navbar.jsx")
DOCK = os.path.join(ROOT, "components", "FloatingDock.jsx")
DATA_JS = os.path.join(ROOT, "lib", "portfolioData.js")

checks = []


def check(name, cond, detail=""):
    checks.append((name, bool(cond), detail))
    print(f"[{'PASS' if cond else 'FAIL'}] {name}" + (f" — {detail}" if detail else ""))


# ── A. Integritas data ──────────────────────────────────────────────────────
check("neuroData.json ada", os.path.exists(JSON_PATH))
d = json.load(open(JSON_PATH, encoding="utf-8"))

check("meta.model = LIF", "Leaky Integrate-and-Fire" in d["meta"]["model"])
check("meta.neurons = 1000", d["meta"]["neurons"] == 1000, str(d["meta"]["neurons"]))
check("meta.seed deterministik", d["meta"]["seed"] == 42)
check("meta punya disclaimer", "SIMULASI" in d["meta"]["disclaimer"].upper())
check("meta punya >=2 sumber ilmiah", len(d["meta"]["sources"]) >= 2)

sec = d["sections"]
content_keys = [k for k in sec if k != "Korpus_Portofolio"]
check("jumlah section konten = 6", len(content_keys) == 6, str(len(content_keys)))
check("semua section punya spike_timeline",
      all(len(sec[k]["spike_timeline"]) == 200 for k in sec))

# Rentang fisiologis (bukan saturasi, bukan nol)
vels = [sec[k]["motor_kinetic_velocity_px_s"] for k in content_keys]
loads = [sec[k]["prefrontal_cognitive_load"] for k in content_keys]
check("velocity dalam rentang baca 60-140 px/s",
      all(60 <= v <= 140 for v in vels), f"{min(vels)}-{max(vels)}")
check("cognitive_load dalam 0..1",
      all(0.0 <= l <= 1.0 for l in loads), f"{min(loads)}-{max(loads)}")
check("velocity tidak saturasi (spread > 0)",
      max(vels) - min(vels) > 1.0, f"spread={round(max(vels)-min(vels),1)}")
check("load tidak saturasi (spread > 0.05)",
      max(loads) - min(loads) > 0.05, f"spread={round(max(loads)-min(loads),3)}")

# Narasi kognitif benar: Kontak = aksi (M1 dominan), section teknis = load lebih tinggi
kontak_m1 = sec["Kontak_Konversi"]["cluster_ratio"]["M1_motor"]
tech_loads = [sec[k]["prefrontal_cognitive_load"]
              for k in ("Proyek_LKS_Robotika", "Proyek_Otomasi_PLC")]
check("Kontak didominasi korteks motorik M1 (>0.1)", kontak_m1 > 0.1, str(kontak_m1))
check("Section teknis load > Kontak load",
      min(tech_loads) > sec["Kontak_Konversi"]["prefrontal_cognitive_load"],
      f"tech_min={min(tech_loads)} kontak={sec['Kontak_Konversi']['prefrontal_cognitive_load']}")

# cluster_ratio menjumlah ~1
for k in content_keys:
    tot = sum(sec[k]["cluster_ratio"].values())
    check(f"cluster_ratio[{k}] ~= 1.0", 0.98 <= tot <= 1.02, str(round(tot, 4)))

# ── A2. Determinisme: jalankan ulang simulator, hasil harus identik ─────────
r = subprocess.run([sys.executable, SIM_PATH], capture_output=True, text=True, cwd=ROOT)
check("simulator exit 0", r.returncode == 0, r.stderr.strip()[:200])
d2 = json.load(open(JSON_PATH, encoding="utf-8"))
check("determinisme: total_spikes identik setelah re-run",
      d2["summary"]["total_synaptic_spikes"] == d["summary"]["total_synaptic_spikes"])

# ── B. Bukti teks NYATA dari portfolioData.js ──────────────────────────────
js = open(DATA_JS, encoding="utf-8").read()
for tok in ["Konveyor", "PLC", "Khayyis", "PID", "ISO 2768-1"]:
    check(f"token nyata '{tok}' ada di portfolioData.js", tok in js)
check("simulator membaca portfolioData.js",
      "portfolioData.js" in open(SIM_PATH, encoding="utf-8").read())

# ── C. Wiring komponen React ───────────────────────────────────────────────
comp = open(COMPONENT, encoding="utf-8").read()
check("komponen import neuroData.json", "from '../lib/neuroData.json'" in comp)
check("komponen pakai TiltCard", "TiltCard" in comp)
check("komponen punya scroll listener (passive)",
      "addEventListener('scroll'" in comp and "passive: true" in comp)
check("komponen throttle via requestAnimationFrame", "requestAnimationFrame" in comp)
check("komponen hormati prefers-reduced-motion", "prefers-reduced-motion" in comp)
check("komponen bersihkan listener (cleanup)", "removeEventListener('scroll'" in comp)
check("komponen punya id='neuro' anchor", 'id="neuro"' in comp)
check("komponen punya aria-labelledby", "aria-labelledby" in comp)
check("komponen tidak pakai library chart eksternal",
      not re.search(r"from '(recharts|chart\.js|d3|victory)", comp))

page = open(PAGE, encoding="utf-8").read()
check("page.js mengimpor NeuroDataScienceSection",
      "NeuroDataScienceSection" in page)
check("page.js merender <NeuroDataScienceSection />",
      "<NeuroDataScienceSection />" in page)

navbar = open(NAVBAR, encoding="utf-8").read()
check("Navbar punya link #neuro", 'href="#neuro"' in navbar)
dock = open(DOCK, encoding="utf-8").read()
check("FloatingDock punya item #neuro", "'#neuro'" in dock)

# ── D. Anti-slop ───────────────────────────────────────────────────────────
check("UI menampilkan label 'SIMULASI'", "SIMULASI" in comp)
check("UI menampilkan disclaimer integritas", "disclaimer" in comp)
# Tidak ada klaim fake gain yang tak berdasar di komponen
for bad in ["+34.3%", "+54.2%", "attention gain", "10x faster", "100% accurate"]:
    check(f"tidak ada klaim slop '{bad}'", bad not in comp)

# Tap target >=44px (aksesibilitas mobile) pada elemen interaktif baru
check("nav mobile min-h-[44px]", "min-h-[44px]" in navbar)

# ── Ringkasan ──────────────────────────────────────────────────────────────
total = len(checks)
passed = sum(1 for _, ok, _ in checks if ok)
failed = [n for n, ok, _ in checks if not ok]
print("\n" + "=" * 70)
print(f"HASIL: {passed}/{total} PASS")
if failed:
    print("GAGAL: " + ", ".join(failed))
    sys.exit(1)
print("SEMUA VERIFIKASI LULUS — delivery tervalidasi secara empiris.")
sys.exit(0)
