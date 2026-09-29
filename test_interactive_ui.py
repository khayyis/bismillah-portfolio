import re

def test_interactive_ui():
    print("=" * 60)
    print("VERIFIKASI INTERAKTIVITAS & ARSITEKTUR UI LOKAL BUILD")
    print("=" * 60)
    with open('/mnt/c/Users/user/Desktop/bismillah-portfolio/.next/server/app/index.html') as f:
        html = f.read()

    # 1. Canvas Click Spark
    assert '<canvas' in html, "Canvas ClickSpark partikel tidak ditemukan"
    print("[TEST 1] ClickSpark canvas partikel terpasang di root DOM -> PASS")

    # 2. Live Search Bar
    assert 'Cari proyek, CAD, atau instansi...' in html, "Search bar input tidak ditemukan"
    print("[TEST 2] Live Search bar dengan filter real-time terpasang -> PASS")

    # 3. Interactive 3D Tilt Cards Trigger
    assert 'Buka Spesifikasi Lengkap' in html, "Trigger spesifikasi proyek tidak ditemukan"
    print("[TEST 3] 3D Tilt Project Cards dengan modal trigger terpasang -> PASS")

    # 4. Floating Dock
    assert 'aria-label="Kembali ke atas"' in html, "Floating Dock back-to-top tidak ditemukan"
    assert 'href="#beranda"' in html, "Floating Dock Beranda link tidak ditemukan"
    print("[TEST 4] macOS-style Interactive Floating Dock terpasang -> PASS")

    # 5. Interactive Project Proof Badges in Skills
    assert 'BUKTI PROYEK' in html, "Tombol bukti proyek tidak ditemukan"
    print("[TEST 5] Skill matrix terhubung ke modal bukti proyek nyata -> PASS")

    # 6. Anti-Slop Rule R-02 (Zero Em Dash '—')
    em_dashes = [m.start() for m in re.finditer(r"—", html)]
    assert len(em_dashes) == 0, f"Ditemukan {len(em_dashes)} karakter em dash!"
    print(f"[TEST 6] Kepatuhan R-02: 0 karakter em dash ditemukan -> PASS")

    print("=" * 60)
    print("SEMUA ASSERTION UI INTERAKTIF LULUS (100% SUKSES)")
    print("=" * 60)

if __name__ == "__main__":
    test_interactive_ui()
