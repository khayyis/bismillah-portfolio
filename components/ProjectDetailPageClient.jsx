'use client';

import dynamic from 'next/dynamic';

const ProjectDetailPage = dynamic(() => import('./ProjectDetailPage'), { ssr: false });

export default function ProjectDetailPageClient({ projectId }) {
  return <ProjectDetailPage projectId={projectId} />;
}