export const profileData = {
  name: "Khayyis Billawal Rozikin",
  tagline: "Teknik Mekatronika & AI Systems Builder",
  school: "SMKN 4 Jakarta",
  department: "Teknik Mekatronika",
  status: "Tersedia untuk Rekayasa Industri",
  location: "Jakarta, Indonesia",
  bio: "Siswa SMK Mekatronika perancang mekanikal CAD industri, perakit robotika mobil LKS, dan pengembang sistem AI serverless. Praktik kerja lapangan di PT Bumi Alam Segar (Wings Group) mengerjakan analisis konveyor dan shop drawing pabrik.",
  avatar: "/images/khayyis-profile.jpg",
  avatarSmall: "/images/cropped-khayyis-profile.jpg",
  contacts: {
    email: "khayyis8@gmail.com",
    telegram: "KhayyisBillawal",
    telegramUrl: "https://t.me/KhayyisBillawal",
    whatsapp: "62895325637890",
    whatsappUrl: "https://wa.me/62895325637890?text=Halo%20Khayyis%2C%20saya%20tertarik%20dengan%20proyek%20teknik%20mekatronika%20Anda.",
    github: "https://github.com/khayyis",
    githubUsername: "khayyis",
    instagram: "https://instagram.com/Khayyis_Billawal",
    instagramUsername: "@Khayyis_Billawal"
  },
  pillars: [
    {
      id: "robotics",
      title: "Robotika Mobile & PLC",
      subtitle: "Navigasi lintasan otonom, kendali motor PID, dan logic ladder PLC.",
      highlights: ["LKS Autonomous Mobile Robotic", "PLC Mitsubishi GX Works2", "Panel Operator HMI Aquaficap"]
    },
    {
      id: "cad",
      title: "Desain CAD & Fabrikasi Mesin",
      subtitle: "Shop drawing ISO pabrik, analisis kinematika belokan, dan pemodelan 3D part.",
      highlights: ["Kinematika Konveyor 90° PT BAS", "Autodesk Inventor Professional", "Toleransi ISO 2768-1 Sanitari"]
    },
    {
      id: "ai-vision",
      title: "Computer Vision & Cloud Edge",
      subtitle: "Pencocokan biometrik wajah, model inference ONNX, dan cloud database serverless.",
      highlights: ["Platform Biometrik We.Sut", "Deteksi Wajah YuNet & InsightFace", "Cloudflare Workers D1 & R2"]
    },
    {
      id: "embedded",
      title: "Firmware ECU & Telemetri Dyno",
      subtitle: "Komunikasi serial hardware K-Line DLC dan logging telemetri mesin.",
      highlights: ["Web Serial Remap ECU Honda", "Kabel FTDI FT232R K-Line", "Kalkulasi WHP Dyno Inersia"]
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
      summary: "Rancangan mekanisme Overhead Rotary Swing Flap untuk membelokkan kardus kecap di persimpangan konveyor 90 derajat tanpa menghentikan laju belt.",
      image: "/images/cad-conveyor.jpg",
      metrics: [
        { label: "Mekanisme", value: "Overhead Rotary Flap" },
        { label: "Software", value: "Autodesk Inventor 2026" },
        { label: "Verifikasi", value: "ACC Mentor Industri PT BAS" },
        { label: "Standar", value: "ISO 2768-1 Kelas Teliti" }
      ],
      details: [
        "Membandingkan 3 opsi transfer kardus: silinder linier, rotary flap, dan rack & pinion.",
        "Mekanisme rotary flap dipilih karena meniadakan jeda resiprokal silinder angin.",
        "Mencegah kardus penyok akibat tabrakan dan menghentikan penumpukan di ujung lini.",
        "Menyusun shop drawing ortogonal format A3 skala 1:20 lengkap detail sambungan las."
      ],
      tags: ["Autodesk Inventor", "Kinematika Konveyor", "Shop Drawing A3", "PT BAS Wings Group"]
    },
    {
      id: "lks-robotics",
      category: "robotics",
      categoryLabel: "Robotika & PLC",
      title: "Autonomous Mobile Robot LKS",
      organization: "SMKN 4 Jakarta",
      year: "2025:2026",
      summary: "Robot beroda otonom untuk navigasi rute lintasan arena, pembacaan sensor garis, dan pemindahan balok kerja ajang LKS.",
      image: "/images/robotics-lks.jpg",
      metrics: [
        { label: "Kategori", value: "Mobile Robotik LKS" },
        { label: "Algoritma", value: "Closed-Loop PID Tracking" },
        { label: "Sensorik", value: "IR Sensor Array + Enkoder" },
        { label: "Aktuator", value: "Motor DC Geared + Gripper" }
      ],
      details: [
        "Memprogram koreksi posisi roda secara real-time berdasarkan feedback sensor infra merah.",
        "Membuat mekanisme penjepit gripper untuk mengangkat dan menaruh objek di titik koordinat.",
        "Menghitung kinematika roda diferensial agar belokan robot tidak selip.",
        "Menyetel parameter PID (Kp, Ki, Kd) untuk respon manuver stabil di kecepatan maksimal."
      ],
      tags: ["C++ Embedded", "Kendali PID", "Kinematika Roda", "LKS Robotika"]
    },
    {
      id: "we-sut",
      category: "ai-vision",
      categoryLabel: "AI & Software",
      title: "We.Sut: Platform Biometrik Wajah Serverless",
      organization: "We.Sut Production",
      year: "2026",
      summary: "Website pencari foto pelari otomatis dengan pengenalan wajah berbasis cloud edge tanpa server fisik lokal.",
      image: "/images/we-sut.png",
      metrics: [
        { label: "Infrastruktur", value: "Cloudflare Edge Workers" },
        { label: "Database", value: "Cloudflare D1 SQL + Storage R2" },
        { label: "Ekstraksi AI", value: "InsightFace 512-D + YuNet" },
        { label: "Framework", value: "Next.js App Router" }
      ],
      details: [
        "Memindahkan backend ke edge worker untuk menghilangkan kebutuhan server lokal dan reverse tunnel.",
        "Menyimpan vektor embedding wajah 512 dimensi untuk pencarian foto instan di antara ribuan gambar.",
        "Menyambungkan sistem pembayaran QRIS otomatis dan verifikasi mutasi rekening.",
        "Membangun antarmuka web responsif bebas komponen berat agar cepat dimuat di ponsel."
      ],
      tags: ["Cloudflare D1 R2", "InsightFace", "YuNet ONNX", "Next.js 16"]
    },
    {
      id: "ecu-remap",
      category: "embedded",
      categoryLabel: "Firmware & Quant",
      title: "ECU Web Serial Remap & Dyno Telemetry",
      organization: "Proyek Rekayasa Mandiri",
      year: "2026",
      summary: "Aplikasi browser untuk membaca sensor mesin dan menyetel peta bahan bakar ECU motor langsung lewat kabel USB serial.",
      image: "/images/placeholder-project.jpg",
      metrics: [
        { label: "Protokol", value: "Web Serial API Browser" },
        { label: "Antarmuka", value: "FTDI FT232R K-Line DLC" },
        { label: "Data Rate", value: "Sampling 16 Hertz" },
        { label: "Analisis", value: "Dyno Inersia Jalan & Paddock" }
      ],
      details: [
        "Mengirim paket data dua arah antara browser dan port diagnostik motor tanpa instal software berat.",
        "Menghitung estimasi tenaga roda dan torsi memakai rumus inersia putaran roda belakang.",
        "Menampilkan tabel matriks 16x16 bahan bakar dan derajat pengapian mesin.",
        "Merekam log putaran RPM, sudut bukaan gas TPS, dan temperatur mesin ke file CSV."
      ],
      tags: ["Web Serial API", "K-Line DLC Motor", "FTDI UART", "Datalogger CSV"]
    },
    {
      id: "helical-gear",
      category: "cad",
      categoryLabel: "CAD & Kinematika",
      title: "Roda Gigi Heliks Robot Palletizing",
      organization: "PT Bumi Alam Segar (Wings Group)",
      year: "2026",
      summary: "Gambar kerja bengkel untuk pembuatan suku cadang roda gigi heliks penggerak lengan robot penata kardus kemasan.",
      image: "/images/cad-conveyor.jpg",
      metrics: [
        { label: "Modul Gigi", value: "Normal Module mn = 1.0 mm" },
        { label: "Spesifikasi", value: "Z = 9 Gigi, Sudut Heliks 5°" },
        { label: "Dimensi", value: "Diameter Pitch 9.034 mm" },
        { label: "Gambar Kerja", value: "Format ISO A4 Skala 2:1" }
      ],
      details: [
        "Menghitung ukuran roda gigi: diameter pitch, diameter luar, dan sudut tekan 20 derajat.",
        "Menentukan angka toleransi ukuran presisi agar roda gigi hasil bubut tidak oblak saat berputar.",
        "Menyajikan tabel spesifikasi modul gigi lengkap pada etiket gambar standar pabrik.",
        "Memastikan komponen baru pas dipasang menggantikan suku cadang aus di unit robot."
      ],
      tags: ["Roda Gigi Heliks", "Autodesk Inventor", "Shop Drawing ISO", "PT BAS Wings"]
    },
    {
      id: "ipda-quant",
      category: "embedded",
      categoryLabel: "Firmware & Quant",
      title: "IPDA Quant Engine & Order Flow Absorption",
      organization: "Quant Trading Systems",
      year: "2026",
      summary: "Skrip analisis volume pasar emas untuk menandai titik harga penting dan menjalankan perintah otomatis.",
      image: "/images/placeholder-project.jpg",
      metrics: [
        { label: "Pasar", value: "XAUUSD (Emas)" },
        { label: "Platform", value: "TradingView & MetaTrader 5" },
        { label: "Metode", value: "Level Volume HVN + Order Flow" },
        { label: "Manajemen", value: "Trailing Stop Pengaman Modal" }
      ],
      details: [
        "Membaca penumpukan transaksi di harga tertentu untuk mencari titik pantulan harga pasar.",
        "Menulis indikator Pine Script v6 untuk mengirim sinyal otomatis ke terminal eksekusi.",
        "Menyetel batasan resiko kerugian per posisi secara otomatis.",
        "Menguji skrip pada pergerakan harga riil tanpa mengubah parameter historis sembarangan."
      ],
      tags: ["Pine Script v6", "MetaTrader 5 EA", "Analisis Volume", "Trading Kuantitatif"]
    }
  ],
  skills: [
    {
      category: "Mekatronika & Otomasi Industri",
      items: [
        { name: "Autonomous Mobile Robotics", desc: "Navigasi lintasan, kendali PID roda, dan pemrograman capit gripper" },
        { name: "Pemrograman PLC", desc: "Mitsubishi GX Works2, diagram tangga Ladder, dan perakitan sirkuit relay" },
        { name: "Layar Sentuh HMI Pabrik", desc: "Desain panel operator Aquaficap HMI dan tampilan status sensor" },
        { name: "Mekanika Konveyor", desc: "Sistem pengalih kardus 90 derajat dan penyetelan motor belt" },
        { name: "Sensor & Aktuator Industri", desc: "Sensor proximity induktif, enkoder putar, dan silinder pneumatik" }
      ]
    },
    {
      category: "Desain 3D CAD & Fabrikasi",
      items: [
        { name: "Autodesk Inventor Professional", desc: "Pemodelan 3D suku cadang, assembly rangka mesin, dan animasi gerak" },
        { name: "Gambar Kerja Shop Drawing", desc: "Gambar teknik proyeksi proyek A3 dan A4 lengkap potongan detail las" },
        { name: "Standar Ukuran Toleransi", desc: "Penerapan toleransi pasangan ISO 2768-1 dan kekasaran permukaan bubut" },
        { name: "Material Stainless Steel", desc: "Penggunaan bahan SS304 dan SS316 untuk mesin industri makanan higienis" },
        { name: "Perhitungan Roda Gigi", desc: "Kalkulasi ukuran gigi heliks, modul gigi, dan poros as transmisi" }
      ]
    },
    {
      category: "Software & Sistem AI",
      items: [
        { name: "Computer Vision Pengenal Wajah", desc: "Ekstraksi ciri wajah InsightFace dan deteksi model YuNet ONNX" },
        { name: "Next.js & Antarmuka Web", desc: "Pembuatan dashboard aplikasi web App Router dan tata letak responsif" },
        { name: "Telegram Mini App", desc: "Aplikasi web di dalam chat Telegram dengan verifikasi tanda tangan bot" },
        { name: "Cloudflare Serverless", desc: "Database serverless D1 SQL dan penyimpanan file media R2" },
        { name: "Tailwind CSS", desc: "Penyusunan tampilan web cepat dan penyesuaian ukuran layar ponsel" }
      ]
    },
    {
      category: "Hardware & Alat Pengujian",
      items: [
        { name: "Komunikasi Web Serial", desc: "Koneksi kabel data USB UART langsung dari browser ke mikrokontroler" },
        { name: "Bahasa C & C++ Embedded", desc: "Pemrograman mikrokontroler Arduino dan pembacaan register sensor" },
        { name: "Otomasi Pesan WhatsApp", desc: "Server WAHA engine NOWEB untuk kirim pesan transaksi otomatis" },
        { name: "Python Pengujian Data", desc: "Script Python assert untuk memeriksa hasil kerja dan hitung rumus" },
        { name: "Pine Script TradingView", desc: "Pemrograman indikator grafik harga dan pengujian aturan beli jual" }
      ]
    }
  ],
  experience: [
    {
      period: "2026",
      role: "Drafter Mesin (Praktik Kerja Lapangan)",
      organization: "PT Bumi Alam Segar (Wings Group)",
      location: "MM2100, Cikarang",
      description: "Membuat shop drawing dan menganalisis mekanisme belokan konveyor 90 derajat. Menggambar model 3D roda gigi heliks robot penata barang, dudukan pallet lelehan gula 1.5x1.5 meter, dan modifikasi rak stainless steel bengkel."
    },
    {
      period: "2023:Sekarang",
      role: "Siswa Jurusan Teknik Mekatronika",
      organization: "SMKN 4 Jakarta",
      location: "Jakarta Utara",
      description: "Belajar teori dan praktik teknik mesin, kelistrikan kendali, pemrograman komputer, serta otomasi pabrik. Terpilih merakit robot bergerak LKS dan memprogram PLC."
    }
  ]
};
