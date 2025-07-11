'use client';

import dynamic from 'next/dynamic';

const OptimizedProjectsPage = dynamic(() => import('./OptimizedProjectsPage'), { ssr: false });

export default function OptimizedProjectsPageClient() {
  return <OptimizedProjectsPage />;
}