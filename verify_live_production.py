import urllib.request
import json
import re
import time

LIVE_URL = f"https://khayyis.vercel.app/?t={int(time.time())}"

def verify_live_khayyis():
    print("=" * 65)
    print("VERIFIKASI EMPIRIS LIVE PRODUKSI: https://khayyis.vercel.app")
    print("=" * 65)
    
    req = urllib.request.Request(LIVE_URL, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    with urllib.request.urlopen(req) as resp:
        status = resp.status
        html = resp.read().decode("utf-8")
        headers = dict(resp.headers)

    print(f"[TEST 1] HTTP Response Status: {status} OK")
    assert status == 200, f"Expected 200, got {status}"

    print("[TEST 2] Verifikasi Elemen Kunci Portofolio Rekayasa di Live...")
    assert "Khayyis Billawal Rozikin" in html, "Nama tidak ditemukan di live HTML"
    assert "SMKN 4 Jakarta" in html, "SMKN 4 Jakarta tidak ditemukan di live HTML"
    assert "PT Bumi Alam Segar" in html, "Pengalaman PT BAS tidak ditemukan di live HTML"
    assert "Autonomous Mobile Robot" in html, "Proyek LKS Robotika tidak ditemukan di live HTML"
    assert "Dokumentasi Proyek Rekayasa" in html, "Section Proyek redrawn tidak ditemukan di live HTML"
    assert "telegram-web-app.js" not in html, "Telegram TMA SDK still present in live HTML"
    assert "telegram" not in html.lower(), "Telegram reference still present in live HTML"
    print(" -> PASSED: Seluruh data rekayasa live 100% dan bebas dari jejak Telegram.")

    print("[TEST 3] Verifikasi Anti-Slop Rule R-02 (Zero Em Dash '—') di Live...")
    em_dashes = [m.start() for m in re.finditer(r"—", html)]
    assert len(em_dashes) == 0, f"Ditemukan {len(em_dashes)} karakter em dash di live!"
    print(" -> PASSED: 0 karakter em dash (R-02 100% dipatuhi di produksi).")

    print("[TEST 4] Verifikasi Live API Endpoint https://khayyis.vercel.app/api/data...")
    api_req = urllib.request.Request(f"https://khayyis.vercel.app/api/data?t={int(time.time())}")
    with urllib.request.urlopen(api_req) as api_resp:
        assert api_resp.status == 200
        api_data = json.loads(api_resp.read().decode("utf-8"))
    
    assert "profile" in api_data, "Struktur data API tidak valid"
    assert len(api_data.get("projects", [])) >= 6, "Proyek di API kurang dari 6"
    print(f" -> PASSED: Live API merespon 200 OK dengan {len(api_data['projects'])} data proyek tervalidasi.")

    print("=" * 65)
    print("SEMUA PENGUJIAN PRODUKSI VERCEL SUKSES 100% (ZERO MOCK/LOCAL)")
    print("=" * 65)

if __name__ == "__main__":
    verify_live_khayyis()
