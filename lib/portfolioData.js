export const profileData = {
  name: "Khayyis Billawal Rozikin",
  tagline: "Teknik Mekatronika & AI Systems Builder",
  school: "SMKN 4 Jakarta",
  department: "Teknik Mekatronika",
  status: "Tersedia untuk Proyek Rekayasa & Kolaborasi",
  location: "Jakarta, Indonesia",
  bio: "Siswa Teknik Mekatronika SMKN 4 Jakarta dengan spesialisasi pada robotika otonom, perancangan mekanikal 3D CAD industri, dan arsitektur sistem berbasis AI. Memiliki rekam jejak praktis dalam perancangan modul konveyor T-Junction di PT Bumi Alam Segar (Wings Group), kompetisi LKS Autonomous Mobile Robotic, perancangan firmware ECU Web Serial, serta pengembangan platform computer vision serverless.",
  avatar: "/images/khayyis-profile.jpg",
  avatarSmall: "/images/cropped-khayyis-profile.jpg",
  contacts: {
    email: "khayyis8@gmail.com",
    telegram: "KhayyisBillawal",
    telegramUrl: "https://t.me/KhayyisBillawal",
    whatsapp: "62895325637890",
    whatsappUrl: "https://wa.me/62895325637890?text=Halo%20Khayyis%2C%20saya%20tertarik%20dengan%20portofolio%20teknik%20mekatronika%20dan%20AI%20Anda.",
    github: "https://github.com/khayyis",
    githubUsername: "khayyis",
    instagram: "https://instagram.com/Khayyis_Billawal",
    instagramUsername: "@Khayyis_Billawal"
  },
  pillars: [
    {
      id: "robotics",
      title: "Robotika Otonom & PLC",
      subtitle: "Navigasi presisi, kendali motor closed-loop, dan automasi industri PLC.",
      highlights: ["LKS Autonomous Mobile Robotic", "PLC Mitsubishi GX Works2", "HMI Aquaficap Industrial"]
    },
    {
      id: "cad",
      title: "Desain 3D CAD & Fabrikasi",
      subtitle: "Shop drawing ISO standar, analisis kinematika, dan perancangan mekanikal.",
      highlights: ["Kinematika T-Junction 90° PT BAS", "Autodesk Inventor 2026", "Toleransi ISO 2768-1 & SS304/SS316"]
    },
    {
      id: "ai-vision",
      title: "AI & Computer Vision",
      subtitle: "Arsitektur biometrik wajah serverless, model inference, dan automasi.",
      highlights: ["We.Sut Platform Biometrik", "YuNet ONNX & InsightFace", "Cloudflare Serverless D1/R2"]
    },
    {
      id: "embedded",
      title: "Firmware & Algoritma Quant",
      subtitle: "Protokol hardware low-level, Web Serial API, dan engine kuantitatif.",
      highlights: ["ECU Web Serial Remap & Dyno", "UART TTL K-Line DLC", "IPDA Quant Trading EA MT5"]
    }
  ],
  projects: [
    {
      id: "conveyor-bas",
      category: "cad",
      categoryLabel: "CAD & Kinematika",
      title: "Sistem Transfer Konveyor 90° T-Junction",
      organization: "PT Bumi Alam Segar (Wings Group)",
      year: "2026",
      summary: "Perancangan dan simulasi kinematika mekanisme Overhead Rotary Swing Flap untuk mengalihkan kardus kecap pada persimpangan konveyor 90 derajat secara otomatis tanpa cycle delay pendorong linier.",
      image: "/images/cad-conveyor.jpg",
      metrics: [
        { label: "Mekanisme", value: "Overhead Rotary Flap" },
        { label: "Software", value: "Autodesk Inventor 2026" },
        { label: "Status Desain", value: "Disetujui Mentor Industri" },
        { label: "Standar", value: "ISO 2768-1 Sanitari" }
      ],
      details: [
        "Menganalisis tiga alternatif kinematika pemindah kardus karton sekunder: Linear Pusher, Overhead Rotary Swing Flap, dan Rack & Pinion.",
        "Alternatif 2 (Rotary Swing Flap) dipilih karena memotong lintasan dan mentransfer momentum tanpa menghentikan laju konveyor pembawa.",
        "Mencegah tumbukan keras pada kardus karton dan mengeliminasi risiko penumpukan produk pada lini pengemasan akhir.",
        "Menyusun dokumen shop drawing proyeksi ortogonal A3 berskala 1:20 lengkap dengan potongan detail fabrikasi."
      ],
      tags: ["Autodesk Inventor", "Kinematika", "Shop Drawing", "ISO 2768-1", "PT BAS Wings Group"]
    },
    {
      id: "lks-robotics",
      category: "robotics",
      categoryLabel: "Robotika & PLC",
      title: "Autonomous Mobile Robot LKS",
      organization: "SMKN 4 Jakarta",
      year: "2025:2026",
      summary: "Robot otonom bergerak yang dirancang untuk navigasi lintasan, penghindaran rintangan, dan penanganan material presisi dalam ajang Lomba Kompetensi Siswa (LKS).",
      image: "/images/robotics-lks.jpg",
      metrics: [
        { label: "Kategori", value: "Autonomous Mobile Robotic" },
        { label: "Kendali", value: "PID Closed-Loop Control" },
        { label: "Sistem Sensor", value: "Multi-Array IR & Enkoder" },
        { label: "Kompetisi", value: "Lomba Kompetensi Siswa" }
      ],
      details: [
        "Mengembangkan logika kontrol manuver otonom dengan kompensasi deviasi lintasan secara real-time.",
        "Mengintegrasikan aktuator gripper presisi untuk pemindahan objek kompetisi sesuai koordinat target.",
        "Implementasi kalkulasi kinematika roda diferensial untuk akurasi posisi sudut dan jarak tempuh.",
        "Pengujian kestabilan daya baterai dan respon driver motor pada berbagai skenario kecepatan."
      ],
      tags: ["Mobile Robotics", "C++", "PID Control", "Kinematika Robot", "SMKN 4 Jakarta"]
    },
    {
      id: "we-sut",
      category: "ai-vision",
      categoryLabel: "AI & Software",
      title: "We.Sut: Platform Biometrik Wajah Serverless",
      organization: "We.Sut Production",
      year: "2026",
      summary: "Sistem distribusi foto event instan berbasis pencocokan wajah AI dengan arsitektur murni serverless tanpa single point of failure (zero tunnel SPOF).",
      image: "/images/we-sut.png",
      metrics: [
        { label: "Arsitektur", value: "100% Serverless Edge" },
        { label: "Database", value: "Cloudflare D1 & R2" },
        { label: "Model AI", value: "InsightFace 512-D & YuNet" },
        { label: "Deployment", value: "OpenNext Cloudflare Pages" }
      ],
      details: [
        "Menghilangkan ketergantungan tunnel lokal dan VPS dengan memigrasikan seluruh komputasi ke Cloudflare Workers edge.",
        "Ekstraksi vektor fitur wajah 512 dimensi untuk pencarian foto pelari dan tamu acara dalam hitungan milidetik.",
        "Integrasi pembayaran digital QRIS dinamis dan notifikasi transaksi instan.",
        "Optimasi frontend anti-slop dengan eliminasi komponen berat dan pencegahan hidrasi error."
      ],
      tags: ["Cloudflare D1/R2", "Next.js 16", "InsightFace", "Computer Vision", "Serverless"]
    },
    {
      id: "ecu-remap",
      category: "embedded",
      categoryLabel: "Firmware & Quant",
      title: "ECU Web Serial Remap & Dyno Telemetry",
      organization: "Proyek Rekayasa Mandiri",
      year: "2026",
      summary: "Aplikasi diagnostik dan remap ECU sepeda motor berbasis browser melalui Web Serial API dengan kalkulasi dyno dual-mode (Road dan Inertia Paddock Standar).",
      image: "/images/placeholder-project.jpg",
      metrics: [
        { label: "Antarmuka", value: "Web Serial API (Browser)" },
        { label: "Kabel/IC", value: "FTDI FT232R K-Line DLC" },
        { label: "Sampling Data", value: "16Hz CSV Logger" },
        { label: "Fitur Dyno", value: "Road & Paddock Inertia" }
      ],
      details: [
        "Komunikasi serial duplex non-blocking langsung dari browser ke bus K-Line DLC ECU motor tanpa software driver desktop berat.",
        "Pemodelan kalkulasi tenaga roda (WHP) dan torsi via rumus inersia (Tau = I * alpha) dan gaya dinamis jalan raya.",
        "Editor matriks 16x16 bahan bakar dan timing pengapian dengan visualisasi 4-zona AFR tripwire.",
        "Logging telemetri kecepatan, RPM, suhu mesin, dan rasio TPS ke file CSV lokal."
      ],
      tags: ["Web Serial API", "FTDI UART", "K-Line DLC", "Dyno Telemetry", "Firmware"]
    },
    {
      id: "helical-gear",
      category: "cad",
      categoryLabel: "CAD & Kinematika",
      title: "Roda Gigi Heliks Transmisi Robot Palletizing",
      organization: "PT Bumi Alam Segar (Wings Group)",
      year: "2026",
      summary: "Rekayasa gambar kerja dan pemodelan 3D suku cadang roda gigi heliks presisi tinggi untuk transmisi lengan robot penata kardus kemasan.",
      image: "/images/cad-conveyor.jpg",
      metrics: [
        { label: "Normal Module", value: "mn = 1.0 mm" },
        { label: "Jumlah Gigi", value: "Z = 9 (Left Helix 5°)" },
        { label: "Pitch Diameter", value: "Dp = 9.034 mm" },
        { label: "Format Gambar", value: "Skala 2:1 ISO A4" }
      ],
      details: [
        "Menghitung parameter geometri roda gigi heliks: diameter pitch, diameter kaki, dan sudut tekan normal 20 derajat.",
        "Menerapkan spesifikasi chamfer 0.50 x 45 derajat dan toleransi penyimpangan ukuran nominal standar bengkel presisi.",
        "Memastikan komponen pengganti dapat diproduksi langsung melalui mesin bubut dan milling CNC tanpa deviasi getaran.",
        "Penyusunan etiket standar perusahaan dan kartu riwayat suku cadang mesin palletizing."
      ],
      tags: ["Roda Gigi Heliks", "Robot Palletizing", "Autodesk Inventor", "ISO 2768-1", "PT BAS"]
    },
    {
      id: "ipda-quant",
      category: "embedded",
      categoryLabel: "Firmware & Quant",
      title: "IPDA Quant Engine & Order Flow Absorption",
      organization: "Quant Trading Systems",
      year: "2026",
      summary: "Sistem kuantitatif untuk instrumen komoditas emas (XAUUSD) dengan deteksi rezim volatilitas, tracking level volume HVN, dan manajemen risiko bertingkat.",
      image: "/images/placeholder-project.jpg",
      metrics: [
        { label: "Instrumen", value: "XAUUSD (Gold)" },
        { label: "Platform", value: "TradingView & MT5 EA" },
        { label: "Model", value: "HMM + HVN Order Flow" },
        { label: "Proteksi Modal", value: "Stealth Equity Trailing" }
      ],
      details: [
        "Mendeteksi area absorpsi likuiditas institusional melalui pelacakan High Volume Node (HVN) dan divergensi order flow.",
        "Mengembangkan skrip Pine Script v6 untuk alert presisi dan integrasi sinyal ke terminal eksekusi otomatis.",
        "Menerapkan aturan manajemen risiko ketat: proteksi profit bertahap dan trailing drawdown otomatis.",
        "Analisis data historis dan forward-testing tanpa overfitting kurva pergerakan harga."
      ],
      tags: ["Pine Script v6", "MetaTrader 5", "Kuantitatif", "Risk Management", "Order Flow"]
    }
  ],
  skills: [
    {
      category: "Mekatronika & Otomasi Industri",
      items: [
        { name: "Autonomous Mobile Robotics", desc: "Navigasi lintasan, kendali PID, dan penanganan material" },
        { name: "PLC Programming", desc: "Mitsubishi MELSOFT GX Works2, Ladder Diagram, logic sequence" },
        { name: "Industrial HMI", desc: "Aquaficap HMI runtime, panel interaktif operator, alarm logging" },
        { name: "Kinematika Konveyor", desc: "Analisis sistem transfer 90°, rotary flap, dan peredam benturan" },
        { name: "Sensor & Aktuator", desc: "Enkoder optik, sensor induktif/kapasitif, motor DC/stepper, pneumatik" }
      ]
    },
    {
      category: "Desain 3D CAD & Standar Manufaktur",
      items: [
        { name: "Autodesk Inventor Professional", desc: "Pemodelan 3D part, assembly mekanikal, dan simulasi gerak" },
        { name: "Shop Drawing Teknik", desc: "Proyeksi ortogonal A3/A4, potongan detail, etiket industri" },
        { name: "Standar Toleransi ISO 2768-1", desc: "Toleransi geometrik kelas teliti dan kekasaran permukaan N8" },
        { name: "Material Sanitari Industri", desc: "Rangka stainless steel SS304/SS316 higienis untuk lini pangan" },
        { name: "Transmisi Roda Gigi", desc: "Perhitungan roda gigi heliks, spur gear, dan poros transmisi" }
      ]
    },
    {
      category: "Artificial Intelligence & Web Engineering",
      items: [
        { name: "Computer Vision & Biometrik", desc: "InsightFace 512-D, YuNet ONNX face detection, embedding matching" },
        { name: "Next.js & React", desc: "App Router modern, SSR/SSG stabil, arsitektur anti-slop responsif" },
        { name: "Telegram Mini App (TMA)", desc: "Integrasi WebApp SDK, validasi kriptografis HMAC-SHA256 initData" },
        { name: "Cloudflare Serverless", desc: "Cloudflare Workers, D1 Serverless SQL, R2 Storage, zero tunnel" },
        { name: "Tailwind CSS", desc: "Desain antarmuka fungsional, rasio kontras WCAG AA, mobile tap target" }
      ]
    },
    {
      category: "Hardware, Firmware & Tooling",
      items: [
        { name: "Web Serial API", desc: "Komunikasi duplex UART langsung dari browser ke mikrokontroler/ECU" },
        { name: "C / C++ & Arduino", desc: "Pemrograman embedded low-overhead, manipulasi register, interrupt" },
        { name: "Automasi WhatsApp & Bot", desc: "WAHA NOWEB engine, webhook callback, event-driven messaging" },
        { name: "Python 3 & Analisis Data", desc: "Automasi pengujian berbasis assert, NumPy, evaluasi algoritma" },
        { name: "Pine Script v6 & Algo EA", desc: "Pemodelan strategi kuantitatif, order flow, dan eksekusi MT5" }
      ]
    }
  ],
  experience: [
    {
      period: "2026",
      role: "Engineering Drafter & Kinematic Analyst (Praktik Kerja Lapangan)",
      organization: "PT Bumi Alam Segar (Wings Group)",
      location: "Kawasan Industri MM2100, Cikarang",
      description: "Melaksanakan perancangan gambar kerja teknik mesin (shop drawing) dan analisis kinematika sistem transfer konveyor 90° T-Junction. Menyusun model 3D roda gigi heliks transmisi robot palletizing, struktur Pallet Lelehan Gula 1500x1500 mm, serta modifikasi rak stainless steel SS304/SS316 untuk laboratorium QC dan R&D dengan standar toleransi ISO 2768-1."
    },
    {
      period: "2023:Sekarang",
      role: "Siswa Jurusan Teknik Mekatronika",
      organization: "SMKN 4 Jakarta",
      location: "Jakarta Utara, Indonesia",
      description: "Mempelajari perpaduan ilmu teknik mesin, elektronika kendali, pemrograman komputer, dan automasi industri. Berpartisipasi aktif dalam kegiatan perakitan robot, pemrograman PLC Mitsubishi, perancangan sirkuit kendali motor, serta riset implementasi AI pada sistem mekatronika."
    }
  ]
};
