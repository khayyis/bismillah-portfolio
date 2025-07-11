import { notFound } from 'next/navigation';
import ProjectDetailPageClient from '../../../components/ProjectDetailPageClient';
import optimizedProjectsData from '../../../config/optimizedProjectsData';

// Fungsi untuk menghasilkan metadata dinamis berdasarkan ID proyek
export async function generateMetadata({ params }) {
  const projectId = params.id;
  const project = optimizedProjectsData.projects.find(
    (p) => p.id === parseInt(projectId)
  );

  if (!project) {
    return {
      title: 'Proyek Tidak Ditemukan',
      description: 'Maaf, proyek yang Anda cari tidak tersedia.',
    };
  }

  return {
    title: `${project.title} | Khayyis Billawal Rozikin`,
    description: project.description,
    keywords: [project.category, 'Proyek', 'Portfolio', 'Khayyis Billawal Rozikin'],
    openGraph: {
      title: `${project.title} | Khayyis Billawal Rozikin`,
      description: project.description,
      images: [{
        url: project.image,
        width: 1200,
        height: 630,
        alt: project.title,
      }],
    },
  };
}

// Fungsi untuk menghasilkan parameter statis
export async function generateStaticParams() {
  return optimizedProjectsData.projects.map((project) => ({
    id: project.id.toString(),
  }));
}

/**
 * Halaman Detail Proyek yang Dioptimalkan
 */
export default function ProjectDetail({ params }) {
  const projectId = params.id;
  
  // Validasi ID proyek
  if (!projectId || isNaN(parseInt(projectId))) {
    notFound();
  }

  return <ProjectDetailPageClient projectId={projectId} />;
}