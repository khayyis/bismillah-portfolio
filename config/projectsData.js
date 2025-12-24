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

  // Data proyek - Kosong, siap ditambahkan nanti
  projects: [],

  // Kategori proyek
  categories: ['Semua'],

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