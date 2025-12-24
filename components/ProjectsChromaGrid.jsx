'use client';

import React from 'react';
import ChromaGrid from './ChromaGrid';
import { useProjects } from '../hooks/useProfile';

const ProjectsChromaGrid = () => {
    const { projects, isLoaded } = useProjects();

    if (!isLoaded) {
        return (
            <section id="projects" className="py-16 md:py-20 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white">PROYEK SAYA</h2>
                    </div>
                    <div className="flex justify-center items-center min-h-[300px]">
                        <div className="text-gray-400">Loading...</div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-16 md:py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">PROYEK SAYA</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Berbagai proyek yang telah dan sedang saya kerjakan
                    </p>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Belum ada proyek.</p>
                        <p className="text-gray-600 text-sm mt-2">
                            Tambahkan proyek melalui <a href="/admin" className="text-blue-500 hover:underline">admin panel</a>.
                        </p>
                    </div>
                ) : (
                    <div style={{ minHeight: '400px', position: 'relative' }}>
                        <ChromaGrid
                            items={projects}
                            radius={280}
                            columns={3}
                            damping={0.4}
                            fadeOut={0.5}
                            ease="power3.out"
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsChromaGrid;
