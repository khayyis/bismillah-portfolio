/**
 * File konfigurasi untuk data proyek
 * Berisi informasi tentang proyek-proyek yang ditampilkan di halaman proyek
 */

const projectsData = {
  // Gambar proyek
  projectImages: {
    robotics: "/images/placeholder-project.jpg",
    chatbot: "/images/CHATBOT-WHATSAPP.png",
    design3d: "/images/Dalam-Tahap-Pengembangan.jpeg",
    photography: "/images/Dalam-Tahap-Pengembangan.jpeg"
  },
  
  // Data proyek - Hanya menampilkan proyek yang disebutkan oleh pengguna
  projects: [
    {
      id: 1,
      title: "LKS AUTONOMOUS MOBILE ROBOTIC",
      category: "Robotik",
      description: "Pengembangan robot autonomous mobile untuk kompetisi LKS. Robot ini dapat bergerak dan mengambil keputusan secara mandiri berdasarkan sensor-sensor yang terpasang.",
      image: "/images/placeholder-project.jpg",
      status: "Sedang Dikembangkan",
      colorStops: ["#3A29FF", "#9D4EDD", "#FF3232"]
    },
    {
      id: 2,
      title: "CHATBOT WHATSAPP",
      category: "AI",
      description: "Pengembangan chatbot WhatsApp dengan berbagai fitur automasi dan integrasi API untuk memudahkan komunikasi dan layanan.",
      image: "/images/CHATBOT-WHATSAPP.png",
      status: "Aktif",
      colorStops: ["#FF3232", "#FF9E00", "#FFEA00"]
    },
    {
      id: 3,
      title: "DESAIN 3D",
      category: "Desain 3D",
      description: "Pembuatan model 3D komponen-komponen mekatronika untuk simulasi dan prototyping menggunakan software CAD.",
      image: "/images/Dalam-Tahap-Pengembangan.jpeg",
      status: "Selesai",
      colorStops: ["#00B4D8", "#48CAE4", "#90E0EF"]
    },
    {
      id: 4,
      title: "FOTOGRAFI",
      category: "Fotografi",
      description: "Koleksi fotografi dengan fokus pada pemandangan alam dan teknik fotografi untuk menghasilkan gambar yang dramatis.",
      image: "/images/Dalam-Tahap-Pengembangan.jpeg",
      status: "Berkelanjutan",
      colorStops: ["#2D6A4F", "#40916C", "#52B788"]
    }
  ],
  
  // Kategori proyek
  categories: ['Semua', 'Robotik', 'Desain 3D', 'AI', 'Fotografi'],
  
  // Teks untuk halaman proyek
  projectPageText: {
    title: "Proyek Saya",
    description: "Berbagai proyek yang telah dan sedang saya kerjakan dalam bidang robotik, desain 3D, AI, dan fotografi."
  }
};

export default projectsData;

// Tambahkan detail teknis dan metrik performa
const projects = [{
  title: 'LKS Autonomous Mobile Robotic',
  technologies: ['Arduino', 'Python', 'LIDAR'],
  achievements: 'Juara 1 Nasional LKS 2023',
  challenges: 'Optimasi pathfinding di lingkungan dinamis'
}];