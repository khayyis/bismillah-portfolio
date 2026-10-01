export const profileData = {
  name: "Khayyis Billawal Rozikin",
  tagline: "Teknik Mekatronika",
  school: "SMKN 4 Jakarta",
  department: "Mekatronika",
  status: "Siap Magang & Kerja",
  location: "Jakarta, Indonesia",
  bio: "Siswa SMKN 4 Jakarta spesialisasi perancangan CAD mekanik, otomasi PLC, robotika mobile, dan aplikasi web teknik.",
  avatar: "/images/khayyis-profile.jpg",
  avatarSmall: "/images/cropped-khayyis-profile.jpg",
  contacts: {
    email: "khayyis8@gmail.com",
    telegram: "KhayyisBillawal",
    telegramUrl: "https://t.me/KhayyisBillawal",
    whatsapp: "62895325637890",
    whatsappUrl: "https://wa.me/62895325637890?text=Halo%20Khayyis.",
    github: "https://github.com/khayyis",
    githubUsername: "khayyis",
    instagram: "https://instagram.com/Khayyis_Billawal",
    instagramUsername: "@Khayyis_Billawal"
  },
  pillars: [
    {
      id: "robotics",
      title: "Robotika Mobile & PLC",
      subtitle: "Navigasi lintasan otonom, kendali PID, dan ladder PLC.",
      highlights: ["Robot Mobile LKS", "PLC Mitsubishi GX Works2", "HMI Aquaficap"]
    },
    {
      id: "cad",
      title: "Desain CAD & Fabrikasi",
      subtitle: "Shop drawing ISO standar, analisis kinematika, dan perancangan mesin.",
      highlights: ["Konveyor 90° PT BAS", "Autodesk Inventor", "Toleransi ISO 2768-1"]
    },
    {
      id: "ai-vision",
      title: "Computer Vision & Web",
      subtitle: "Pencocokan wajah AI, model ONNX, dan web serverless.",
      highlights: ["We.Sut Biometrik", "YuNet & InsightFace", "Cloudflare D1 & R2"]
    },
    {
      id: "embedded",
      title: "Firmware ECU & Quant",
      subtitle: "Telemetri serial Web Serial 16Hz dan algoritma kuantitatif.",
      highlights: ["Web Serial Remap ECU", "FTDI UART Telemetri", "IPDA Quant Engine"]
    }
  ],
  projects: [
    {
      id: "conveyor-bas",
      category: "cad",
      categoryLabel: "CAD",
      title: "Konveyor 90° T-Junction",
      organization: "PT Bumi Alam Segar (Wings)",
      year: "2026",
      summary: "Mekanisme Rotary Flap pemindah kardus kecap di persimpangan konveyor 90 derajat tanpa menghentikan belt.",
      image: "/images/cad-conveyor.jpg",
      metrics: [
        { label: "Mekanisme", value: "Overhead Rotary Flap" },
        { label: "Software", value: "Autodesk Inventor" },
        { label: "Hasil", value: "Disetujui Mentor Industri" },
        { label: "Standar", value: "ISO 2768-1 Teliti" }
      ],
      details: [
        "Membandingkan sistem linier, rotary flap, dan rack & pinion.",
        "Rotary flap terpilih karena bekerja kontinu tanpa jeda silinder.",
        "Mencegah kardus penyok dan bottleneck lini pengemasan.",
        "Shop drawing A3 skala 1:20 lengkap potongan sambungan las."
      ],
      tags: ["Autodesk Inventor", "Konveyor", "Shop Drawing", "PT BAS"]
    },
    {
      id: "lks-robotics",
      category: "robotics",
      categoryLabel: "Robotik",
      title: "Autonomous Mobile Robot LKS",
      organization: "SMKN 4 Jakarta",
      year: "2025:2026",
      summary: "Robot beroda otonom navigasi lintasan garis dan pemindah balok kompetisi LKS.",
      image: "/images/robotics-lks.jpg",
      metrics: [
        { label: "Kendali", value: "PID Closed-Loop" },
        { label: "Sensorik", value: "IR Array + Enkoder" },
        { label: "Aktuator", value: "DC Geared + Gripper" },
        { label: "Kompetisi", value: "LKS Mekatronika" }
      ],
      details: [
        "Koreksi arah roda otomatis berbasis sensor infra merah.",
        "Gripper presisi untuk memindahkan objek ke target.",
        "Kinematika diferensial agar manuver tidak selip.",
        "Tuning parameter PID untuk manuver cepat dan stabil."
      ],
      tags: ["C++", "PID Control", "Gripper", "LKS Robotika"]
    },
    {
      id: "we-sut",
      category: "ai-vision",
      categoryLabel: "AI & Web",
      title: "We.Sut Biometrik Wajah",
      organization: "We.Sut Production",
      year: "2026",
      summary: "Web pencari foto event berbasis pencocokan wajah AI instan tanpa server lokal.",
      image: "/images/we-sut.png",
      metrics: [
        { label: "Infrastruktur", value: "Cloudflare Edge" },
        { label: "Database", value: "Cloudflare D1 & R2" },
        { label: "Model AI", value: "InsightFace + YuNet" },
        { label: "Frontend", value: "Next.js 16" }
      ],
      details: [
        "Backend serverless edge tanpa tunnel lokal.",
        "Ekstraksi vektor wajah 512 dimensi untuk pencarian instan.",
        "Integrasi pembayaran QRIS otomatis.",
        "Tampilan web responsif dan ringan dibuka di ponsel."
      ],
      tags: ["Cloudflare", "InsightFace", "YuNet", "Next.js"]
    },
    {
      id: "helical-gear",
      category: "cad",
      categoryLabel: "CAD",
      title: "Roda Gigi Heliks Robot",
      organization: "PT Bumi Alam Segar (Wings)",
      year: "2026",
      summary: "Gambar kerja bengkel fabrikasi roda gigi heliks transmisi robot penata kemasan.",
      image: "/images/gear-helical-composited.jpg",
      metrics: [
        { label: "Modul Gigi", value: "Module mn = 1.0 mm" },
        { label: "Jumlah Gigi", value: "Z = 9 (Heliks 5°)" },
        { label: "Pitch", value: "Dp = 9.034 mm" },
        { label: "Format", value: "ISO A4 Skala 2:1" }
      ],
      details: [
        "Kalkulasi diameter pitch, diameter luar, dan sudut tekan 20°.",
        "Toleransi ukuran presisi agar roda gigi tidak oblak.",
        "Tabel parameter modul gigi lengkap pada etiket gambar.",
        "Siap diproduksi mesin bubut dan milling bengkel."
      ],
      tags: ["Roda Gigi", "Autodesk Inventor", "ISO Drawing", "PT BAS"]
    },
    {
      id: "ecu-remap",
      category: "embedded",
      categoryLabel: "Firmware",
      title: "ECU Web Serial & Dyno",
      organization: "Mandiri",
      year: "2026",
      summary: "Aplikasi browser baca sensor dan telemetri ECU mesin via antarmuka serial USB.",
      image: "/images/cad-conveyor.jpg",
      metrics: [
        { label: "Protokol", value: "Web Serial Browser" },
        { label: "Antarmuka", value: "FTDI UART Serial" },
        { label: "Sampling", value: "16 Hz Real-Time" },
        { label: "Analisis", value: "Telemetri Putaran Roda" }
      ],
      details: [
        "Komunikasi serial duplex browser ke antarmuka ECU.",
        "Pemantauan telemetri putaran roda dan sensor mesin.",
        "Visualisasi matriks parameter operasional real-time.",
        "Datalogger telemetri sensor ke format CSV."
      ],
      tags: ["Web Serial", "ECU Telemetri", "UART", "CSV Logger"]
    },
    {
      id: "ipda-quant",
      category: "embedded",
      categoryLabel: "Quant",
      title: "IPDA Quant Engine",
      organization: "Quant Trading Systems",
      year: "2026",
      summary: "Algoritma deteksi titik likuiditas volume pasar dan manajemen resiko posisi otomatis.",
      image: "/images/we-sut.png",
      metrics: [
        { label: "Instrumen", value: "Aset Komoditas & FX" },
        { label: "Platform", value: "TradingView & MT5" },
        { label: "Metode", value: "Volume HVN + Order Flow" },
        { label: "Proteksi", value: "Trailing Drawdown" }
      ],
      details: [
        "Deteksi area akumulasi transaksi volume harga pasar.",
        "Logika eksekusi sinyal presisi tinggi.",
        "Manajemen resiko otomatis pembatas kerugian posisi.",
        "Pengujian data historis bebas kurva overfitting."
      ],
      tags: ["Pine Script", "MetaTrader 5", "Order Flow", "Kuantitatif"]
    }
  ],
  skills: [
    {
      category: "Otomasi & Robotika",
      items: [
        { name: "Mobile Robotics", desc: "Navigasi garis, kendali PID roda, dan capit gripper" },
        { name: "PLC Programming", desc: "Mitsubishi GX Works2, diagram tangga Ladder, dan wiring relay" },
        { name: "HMI Industri", desc: "Panel operator layar sentuh Aquaficap dan log sensor" },
        { name: "Mekanika Konveyor", desc: "Sistem transfer 90° dan transmisi motor penggerak" },
        { name: "Sensor & Aktuator", desc: "Sensor induktif, optik, enkoder, dan silinder pneumatik" }
      ]
    },
    {
      category: "CAD & Manufaktur",
      items: [
        { name: "Autodesk Inventor", desc: "Pemodelan 3D part mesin, assembly rangka, dan simulasi gerak" },
        { name: "Shop Drawing ISO", desc: "Gambar teknik format A3/A4 standar bengkel pabrik" },
        { name: "Standar Toleransi", desc: "Toleransi geometrik ISO 2768-1 dan kekasaran permukaan" },
        { name: "Material Sanitari", desc: "Stainless steel SS304/SS316 untuk mesin industri makanan" },
        { name: "Transmisi Roda Gigi", desc: "Perhitungan modul roda gigi heliks dan poros as" }
      ]
    },
    {
      category: "Software & Rekayasa",
      items: [
        { name: "Computer Vision", desc: "Deteksi wajah model YuNet dan pengenalan InsightFace" },
        { name: "Next.js Web", desc: "Aplikasi web modern, serverless edge, dan desain responsif" },
        { name: "Telegram Mini App", desc: "Aplikasi web di dalam chat Telegram via initData HMAC" },
        { name: "Cloudflare D1 & R2", desc: "Database serverless SQL dan storage cloud file gambar" },
        { name: "Tailwind CSS", desc: "Desain antarmuka cepat dan layout ramah layar ponsel" }
      ]
    },
    {
      category: "Sistem & Otomasi",
      items: [
        { name: "C & C++ Embedded", desc: "Pemrograman logika mikrokontroler dan sensor industri" },
        { name: "Otomasi WhatsApp", desc: "Bot notifikasi transaksi otomatis server WAHA" },
        { name: "Python Testing", desc: "Script verifikasi otomatis assert dan validasi sistem" }
      ]
    }
  ],
  experience: [
    {
      period: "2026",
      role: "Drafter Mesin (Praktik Kerja Lapangan)",
      organization: "PT Bumi Alam Segar (Wings)",
      location: "MM2100, Cikarang",
      description: "Membuat shop drawing dan analisis mekanisme konveyor 90°. Merancang 3D roda gigi heliks robot palletizing, dudukan pallet gula 1.5x1.5 meter, dan rak stainless steel bengkel."
    },
    {
      period: "2023:Sekarang",
      role: "Siswa Teknik Mekatronika",
      organization: "SMKN 4 Jakarta",
      location: "Jakarta Utara",
      description: "Belajar teknik mesin, kelistrikan kendali, pemrograman komputer, dan otomasi industri. Terpilih sebagai tim perakit robot mobile LKS."
    }
  ]
};
