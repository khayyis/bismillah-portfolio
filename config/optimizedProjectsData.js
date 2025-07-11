/**
 * File konfigurasi untuk data proyek yang dioptimalkan
 * Berisi informasi yang lebih komprehensif tentang proyek-proyek
 */

const optimizedProjectsData = {
  // Gambar proyek
  projectImages: {
    robotics: "/images/Dalam-Tahap-Pengembangan.jpeg",
    chatbot: "/images/CHATBOT-WHATSAPP.png",
    design3d: "/images/Dalam-Tahap-Pengembangan.jpeg",
    photography: "/images/Dalam-Tahap-Pengembangan.jpeg"
  },
  
  // Data proyek dengan deskripsi yang lebih komprehensif
  projects: [
    {
      id: 1,
      title: "LKS AUTONOMOUS MOBILE ROBOTIC",
      category: "Robotik",
      description: "Pengembangan robot autonomous mobile untuk kompetisi LKS dengan kemampuan navigasi mandiri menggunakan algoritma path-finding dan sensor array.",
      detailedDescription: {
        overview: "Robot autonomous mobile yang dikembangkan untuk kompetisi Lomba Kompetensi Siswa (LKS) tingkat provinsi DKI Jakarta. Robot ini dirancang untuk dapat bernavigasi secara mandiri dalam arena kompetisi, mendeteksi dan menghindari rintangan, serta menyelesaikan misi-misi yang ditetapkan dalam kompetisi.",
        technology: [
          "Arduino Mega sebagai mikrokontroler utama",
          "Sensor ultrasonik HC-SR04 untuk deteksi jarak dan rintangan",
          "Sensor garis array dengan 8 channel untuk line following",
          "Motor DC dengan encoder untuk kontrol kecepatan presisi",
          "IMU (Inertial Measurement Unit) untuk orientasi dan stabilisasi",
          "Algoritma PID (Proportional-Integral-Derivative) untuk kontrol gerakan",
          "Algoritma A* untuk path planning dan navigasi"
        ],
        challenges: [
          "Kalibrasi sensor yang presisi untuk berbagai kondisi pencahayaan",
          "Implementasi algoritma path-finding yang efisien dengan memori terbatas",
          "Optimasi kecepatan dan akurasi gerakan robot dalam arena kompetisi",
          "Integrasi sistem mekanik, elektronik, dan pemrograman dalam satu kesatuan"
        ],
        achievements: [
          "Juara 2 LKS Tingkat Provinsi DKI Jakarta 2023",
          "Penghargaan Best Innovation untuk sistem navigasi adaptif",
          "Waktu penyelesaian misi tercepat dalam kategori obstacle avoidance"
        ],
        skills: [
          "Pemrograman C/C++ untuk Arduino",
          "Desain dan fabrikasi mekanik menggunakan CAD dan 3D printing",
          "Perancangan sistem elektronik dan PCB",
          "Implementasi algoritma robotik dan kontrol"
        ]
      },
      image: "/images/placeholder-project.jpg",
      status: "Sedang Dikembangkan",
      colorStops: ["#3A29FF", "#9D4EDD", "#FF3232"]
    },
    {
      id: 2,
      title: "CHATBOT WHATSAPP",
      category: "AI",
      description: "Pengembangan chatbot WhatsApp dengan integrasi API OpenAI dan database untuk automasi layanan pelanggan dan sistem informasi.",
      detailedDescription: {
        overview: "Chatbot WhatsApp yang dikembangkan untuk automasi layanan pelanggan dan sistem informasi. Chatbot ini menggunakan WhatsApp Business API dan terintegrasi dengan OpenAI API untuk memberikan respons yang natural dan kontekstual kepada pengguna.",
        technology: [
          "Node.js dan Express.js untuk backend",
          "WhatsApp Business API untuk komunikasi",
          "OpenAI API (GPT-3.5) untuk pemrosesan bahasa natural",
          "MongoDB untuk penyimpanan data percakapan dan pengguna",
          "Redis untuk caching dan manajemen sesi",
          "Webhook untuk integrasi dengan sistem eksternal"
        ],
        features: [
          "Respons otomatis untuk pertanyaan umum",
          "Sistem tiket untuk eskalasi ke operator manusia",
          "Integrasi dengan database produk dan layanan",
          "Analitik percakapan dan laporan performa",
          "Multi-bahasa (Indonesia dan Inggris)",
          "Personalisasi respons berdasarkan profil pengguna"
        ],
        useCases: [
          "Layanan pelanggan 24/7 untuk bisnis online",
          "Sistem informasi akademik untuk siswa dan orang tua",
          "Pemesanan produk dan layanan secara otomatis",
          "FAQ dan panduan penggunaan produk"
        ],
        metrics: {
          responseTime: "< 2 detik",
          accuracy: "92% untuk intent recognition",
          userSatisfaction: "4.7/5 berdasarkan feedback pengguna",
          automationRate: "85% pertanyaan dapat dijawab tanpa operator manusia"
        }
      },
      image: "/images/CHATBOT-WHATSAPP.png",
      status: "Aktif",
      colorStops: ["#FF3232", "#FF9E00", "#FFEA00"]
    },
    {
      id: 3,
      title: "DESAIN 3D",
      category: "Desain 3D",
      description: "Pembuatan model 3D komponen mekatronika dan produk menggunakan Blender, Fusion 360, dan SolidWorks dengan fokus pada fungsionalitas dan estetika.",
      detailedDescription: {
        overview: "Layanan desain 3D untuk komponen mekatronika, produk konsumen, dan visualisasi arsitektur. Menggunakan berbagai software profesional untuk menghasilkan model 3D yang detail, fungsional, dan siap untuk manufaktur atau visualisasi.",
        software: [
          "Blender untuk modeling organik dan visualisasi",
          "Fusion 360 untuk desain produk dan simulasi",
          "SolidWorks untuk engineering dan desain mekanik",
          "KeyShot untuk rendering fotorealistik"
        ],
        projectTypes: [
          "Komponen mekanik untuk robot dan perangkat elektronik",
          "Prototipe produk konsumen",
          "Visualisasi arsitektur dan interior",
          "Model untuk 3D printing dan manufaktur"
        ],
        workflow: [
          "Konsultasi dan penentuan kebutuhan klien",
          "Sketsa dan konsep awal",
          "Modeling 3D dengan detail dan dimensi yang akurat",
          "Simulasi dan pengujian virtual (jika diperlukan)",
          "Rendering final dan dokumentasi teknis",
          "Revisi dan finalisasi"
        ],
        applications: [
          "Prototipe cepat menggunakan 3D printing",
          "Dokumentasi teknis untuk manufaktur",
          "Visualisasi produk untuk marketing",
          "Simulasi mekanik untuk validasi desain"
        ]
      },
      image: "/images/Dalam-Tahap-Pengembangan.jpeg",
      status: "Selesai",
      colorStops: ["#00B4D8", "#48CAE4", "#90E0EF"]
    },
    {
      id: 4,
      title: "FOTOGRAFI",
      category: "Fotografi",
      description: "Spesialisasi dalam fotografi landscape, portrait, dan product dengan penekanan pada komposisi, pencahayaan, dan post-processing profesional.",
      detailedDescription: {
        overview: "Layanan fotografi profesional dengan spesialisasi dalam landscape, portrait, dan product photography. Fokus pada komposisi yang kuat, pencahayaan yang tepat, dan post-processing yang meningkatkan kualitas visual tanpa mengorbankan naturalitas.",
        specialization: [
          "Landscape photography untuk pemandangan alam dan arsitektur",
          "Portrait photography untuk individu dan kelompok",
          "Product photography untuk e-commerce dan katalog",
          "Event photography untuk acara dan dokumentasi"
        ],
        equipment: [
          "Kamera: Sony Alpha a7 III",
          "Lensa: Sony 24-70mm f/2.8, 70-200mm f/2.8, 85mm f/1.4",
          "Lighting: Godox flash system, softbox, dan reflector",
          "Tripod: Manfrotto carbon fiber",
          "Accessories: Filter ND dan polarizer, remote trigger"
        ],
        editing: [
          "Adobe Lightroom untuk color grading dan koreksi dasar",
          "Adobe Photoshop untuk retouching dan manipulasi lanjutan",
          "Capture One untuk tethering dan workflow studio"
        ],
        portfolio: [
          "Koleksi landscape DKI Jakarta dan sekitarnya",
          "Portrait session untuk siswa SMKN 4 Jakarta",
          "Product photography untuk UKM lokal",
          "Dokumentasi event sekolah dan komunitas"
        ]
      },
      image: "/images/Dalam-Tahap-Pengembangan.jpeg",
      status: "Berkelanjutan",
      colorStops: ["#2D6A4F", "#40916C", "#52B788"]
    },
    {
      id: 5,
      title: "PENGEMBANGAN AI UNTUK WEBSITE",
      category: "AI",
      description: "Implementasi teknologi AI untuk meningkatkan fungsionalitas website, termasuk chatbot, rekomendasi konten, dan personalisasi pengalaman pengguna.",
      detailedDescription: {
        overview: "Pengembangan dan integrasi teknologi AI untuk meningkatkan fungsionalitas website. Fokus pada implementasi solusi AI yang praktis dan memberikan nilai tambah nyata bagi pengguna dan pemilik website.",
        aiTypes: [
          "Generative AI untuk pembuatan konten dan desain",
          "Automation AI untuk workflow dan proses bisnis",
          "Optimization AI untuk performa dan konversi"
        ],
        technologies: [
          "TensorFlow.js dan ONNX.js untuk AI di sisi klien",
          "OpenAI API dan Hugging Face untuk NLP dan generasi konten",
          "Python dengan Flask/FastAPI untuk backend AI",
          "Next.js dan React untuk frontend yang terintegrasi dengan AI",
          "Firebase dan MongoDB untuk penyimpanan data dan analitik"
        ],
        integration: [
          "Chatbot cerdas dengan konteks percakapan",
          "Sistem rekomendasi konten berdasarkan preferensi pengguna",
          "Personalisasi UI/UX berdasarkan perilaku pengguna",
          "Analitik prediktif untuk optimasi konversi",
          "Automasi pembuatan konten dan SEO"
        ],
        results: [
          "Peningkatan engagement pengguna hingga 45%",
          "Pengurangan bounce rate sebesar 30%",
          "Peningkatan konversi sebesar 25%",
          "Efisiensi operasional dengan automasi tugas repetitif"
        ]
      },
      image: "/images/Dalam-Tahap-Pengembangan.jpeg",
      status: "Aktif",
      colorStops: ["#5227FF", "#7cff67", "#5227FF"]
    }
  ],
  
  // Kategori proyek
  categories: ['Semua', 'Robotik', 'Desain 3D', 'AI', 'Fotografi'],
  
  // Teks untuk halaman proyek
  projectPageText: {
    title: "Proyek Saya",
    description: "Berbagai proyek yang telah dan sedang saya kerjakan dalam bidang robotik, desain 3D, AI, dan fotografi. Setiap proyek menunjukkan keahlian teknis dan kreativitas dalam menyelesaikan masalah nyata."
  }
};

export default optimizedProjectsData;