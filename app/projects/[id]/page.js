'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlareHover from '@/components/GlareHover';
import Link from 'next/link';
import Image from 'next/image';
import Contact from '@/components/Contact';

// Data proyek (sama dengan yang ada di Projects.jsx)
const projectsData = [
  {
    id: 1,
    title: "Robot Autonomous Mobile",
    category: "Robotik",
    image: "/images/placeholder-project.jpg",
    description: "Pengembangan robot autonomous mobile untuk kompetisi LKS. Robot ini dapat bergerak dan mengambil keputusan secara mandiri berdasarkan sensor-sensor yang terpasang.",
    status: "Sedang Dikembangkan",
    colorStops: ["#3A29FF", "#9D4EDD", "#FF3232"],
    fullDescription: [
      "Robot autonomous mobile ini dirancang untuk kompetisi Lomba Kompetensi Siswa (LKS) dengan kemampuan navigasi mandiri menggunakan berbagai sensor.",
      "Dilengkapi dengan sensor ultrasonik untuk deteksi jarak, sensor garis untuk mengikuti jalur, dan kamera untuk pengenalan objek.",
      "Menggunakan mikrokontroler Arduino Mega sebagai otak utama dan Raspberry Pi untuk pemrosesan gambar tingkat lanjut.",
      "Diprogram menggunakan bahasa C++ untuk Arduino dan Python untuk Raspberry Pi dengan implementasi algoritma pathfinding dan obstacle avoidance."
    ],
    features: [
      "Navigasi otomatis",
      "Penghindaran rintangan",
      "Pengenalan objek",
      "Kontrol jarak jauh opsional",
      "Baterai tahan lama"
    ],
    gallery: [
      "/images/Dalam-Tahap-Pengembangan.jpeg",
      "/images/Dalam-Tahap-Pengembangan.jpeg",
      "/images/Dalam-Tahap-Pengembangan.jpeg"
    ]
  },
  {
    id: 2,
    title: "Chatbot WhatsApp",
    category: "AI",
    image: "/images/CHATBOT-WHATSAPP.png",
    description: "Pengembangan chatbot WhatsApp dengan berbagai fitur automasi dan integrasi API untuk memudahkan komunikasi dan layanan.",
    status: "Aktif",
    colorStops: ["#FF3232", "#FF9E00", "#FFEA00"],
    fullDescription: [
      "Chatbot WhatsApp ini dikembangkan menggunakan WhatsApp Business API dan Node.js untuk mengotomatisasi komunikasi dan layanan.",
      "Terintegrasi dengan berbagai API eksternal untuk menyediakan informasi real-time seperti cuaca, berita, dan layanan lainnya.",
      "Mengimplementasikan Natural Language Processing (NLP) untuk memahami dan merespons pesan pengguna dengan lebih natural.",
      "Dilengkapi dengan dashboard admin untuk monitoring dan konfigurasi respons chatbot."
    ],
    features: [
      "Respons otomatis 24/7",
      "Integrasi multi-API",
      "Pemahaman bahasa natural",
      "Dashboard analitik",
      "Personalisasi respons"
    ],
    gallery: [
      "/images/CHATBOT-WHATSAPP.png",
      "/images/Dalam-Tahap-Pengembangan.jpeg",
      "/images/Dalam-Tahap-Pengembangan.jpeg"
    ]
  },
  {
    id: 3,
    title: "Desain 3D Model Komponen Mekatronika",
    category: "Desain 3D",
    image: "/images/Dalam-Tahap-Pengembangan.jpeg",
    description: "Pembuatan model 3D komponen-komponen mekatronika untuk simulasi dan prototyping menggunakan software CAD.",
    status: "Selesai",
    colorStops: ["#00B4D8", "#48CAE4", "#90E0EF"],
    fullDescription: [
      "Proyek ini berfokus pada pembuatan model 3D komponen mekatronika menggunakan software CAD profesional seperti SolidWorks dan Fusion 360.",
      "Model yang dibuat mencakup berbagai komponen seperti motor, sensor, bracket, dan casing untuk robot dan sistem otomasi.",
      "Desain dibuat dengan mempertimbangkan aspek manufaktur, seperti toleransi, material, dan metode produksi.",
      "Model 3D ini digunakan untuk simulasi, analisis, dan prototyping sebelum komponen diproduksi secara fisik."
    ],
    features: [
      "Desain presisi tinggi",
      "Simulasi mekanis",
      "Optimasi untuk 3D printing",
      "Dokumentasi teknis lengkap",
      "Kompatibilitas dengan standar industri"
    ],
    gallery: [
      "/Dalam-Tahap-Pengembangan.jpeg",
      "/Dalam-Tahap-Pengembangan.jpeg",
      "/Dalam-Tahap-Pengembangan.jpeg"
    ]
  },
  {
    id: 4,
    title: "Fotografi Landscape",
    category: "Fotografi",
    image: "/images/Dalam-Tahap-Pengembangan.jpeg",
    description: "Koleksi fotografi landscape dengan fokus pada pemandangan alam dan teknik long exposure untuk menghasilkan gambar yang dramatis.",
    status: "Berkelanjutan",
    colorStops: ["#2D6A4F", "#40916C", "#52B788"],
    fullDescription: [
      "Koleksi fotografi landscape ini menampilkan keindahan alam Indonesia dengan fokus pada komposisi dan pencahayaan yang dramatis.",
      "Menggunakan teknik long exposure untuk menciptakan efek gerakan pada air dan awan, memberikan dimensi waktu pada gambar statis.",
      "Pengambilan gambar dilakukan pada golden hour dan blue hour untuk mendapatkan warna dan kontras terbaik.",
      "Proses post-processing minimal untuk mempertahankan keautentikan pemandangan sambil meningkatkan mood dan atmosfer."
    ],
    features: [
      "Teknik long exposure",
      "Komposisi golden ratio",
      "Pencahayaan natural",
      "Lokasi eksotis",
      "Cetak kualitas tinggi tersedia"
    ],
    gallery: [
      "/images/Dalam-Tahap-Pengembangan.jpeg",
      "/images/Dalam-Tahap-Pengembangan.jpeg",
      "/images/Dalam-Tahap-Pengembangan.jpeg"
    ]
  },
  {
    id: 5,
    title: "Fotografi Potret",
    category: "Fotografi",
    image: "/images/Dalam-Tahap-Pengembangan.jpeg",
    description: "Seri fotografi potret dengan penekanan pada pencahayaan natural dan komposisi yang menarik untuk menangkap ekspresi dan karakter subjek.",
    status: "Aktif",
    colorStops: ["#7209B7", "#B5179E", "#F72585"],
    fullDescription: [
      "Seri fotografi potret ini berfokus pada penangkapan karakter dan ekspresi subjek melalui pencahayaan dan komposisi yang tepat.",
      "Menggunakan pencahayaan natural dan reflector untuk menciptakan dimensi dan tekstur pada wajah subjek.",
      "Pengambilan gambar dilakukan dengan pendekatan candid dan terarah untuk mendapatkan ekspresi yang otentik.",
      "Editing dilakukan dengan pendekatan minimalis untuk mempertahankan tampilan natural dengan penajaman pada detail mata dan tekstur kulit."
    ],
    features: [
      "Pencahayaan natural",
      "Komposisi dinamis",
      "Penangkapan ekspresi otentik",
      "Editing minimalis",
      "Tersedia dalam format digital dan cetak"
    ],
    gallery: [
      "/images/Dalam-Tahap-Pengembangan.jpeg",
      "/images/Dalam-Tahap-Pengembangan.jpeg",
      "/images/Dalam-Tahap-Pengembangan.jpeg"
    ]
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mendapatkan ID proyek dari parameter URL
    const projectId = parseInt(params.id);
    
    // Mencari proyek berdasarkan ID
    const foundProject = projectsData.find(p => p.id === projectId);
    
    if (foundProject) {
      setProject(foundProject);
    }
    
    // Menghapus elemen loading yang ditambahkan saat navigasi
    const loadingElement = document.getElementById('project-loading');
    if (loadingElement) {
      // Animasi fade out sebelum menghapus elemen
      loadingElement.style.opacity = '0';
      setTimeout(() => {
        loadingElement.remove();
      }, 500);
    }
    
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="hello-transition hello-fade-in">
          <div className="hello-transition-content">
            <div className="hello-logo hello-logo-reveal">
              <div className="hello-logo-circle hello-pulse"></div>
              <div className="hello-logo-text">K</div>
            </div>
            <div className="hello-loading-text hello-logo-reveal" style={{ animationDelay: '0.1s' }}>
              Memuat Proyek...
            </div>
            <div className="hello-progress hello-logo-reveal" style={{ animationDelay: '0.2s' }}>
              <div 
                className="hello-progress-bar"
                style={{ 
                  width: '95%',
                  transition: 'width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              ></div>
            </div>
            <div className="connection-status">
              Khayyis Billawal Rozikin | Portofolio
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Proyek Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">Maaf, proyek yang Anda cari tidak tersedia.</p>
        <GlareHover
          height="44px"
          width="180px"
          background="#2563eb"
          borderRadius="8px"
          glareColor="#ffffff"
          glareOpacity={0.3}
          glareAngle={-30}
          glareSize={300}
          transitionDuration={800}
        >
          <Link 
            href="/#projects"
            className="w-full h-full flex items-center justify-center text-white font-semibold text-base no-underline select-none bg-transparent border-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Proyek
          </Link>
        </GlareHover>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <Link 
            href="/#projects"
            className="inline-flex items-center text-primary-blue hover:text-blue-700 font-medium mb-4 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Proyek
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
          >
            {project.title}
          </motion.h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              {project.category}
            </span>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {project.status}
            </span>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Left column - Image */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video overflow-hidden rounded-xl shadow-lg mb-8"
            >
              <Image 
                src={project.image} 
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Deskripsi Proyek</h2>
              {project.fullDescription.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="text-gray-700 mb-4"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            
            {/* Gallery */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Galeri</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.gallery.map((image, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="relative aspect-square overflow-hidden rounded-lg shadow-md"
                  >
                    <Image 
                      src={image} 
                      alt={`${project.title} - Gambar ${index + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Features and CTA */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-xl p-6 shadow-md mb-8 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Fitur Utama</h2>
              <ul className="space-y-3 mb-6">
                {project.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="flex items-start"
                  >
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <GlareHover
                height="44px"
                width="100%"
                background="#2563eb"
                borderRadius="8px"
                glareColor="#ffffff"
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
              >
                <button 
                  onClick={() => {
                    const contactSection = document.getElementById('kontak');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full h-full flex items-center justify-center text-white font-semibold text-base no-underline select-none bg-transparent border-none cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Hubungi Saya
                </button>
              </GlareHover>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Komponen Contact */}
      <Contact />
    </div>
  );
}