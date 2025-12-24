'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth, useAdminData } from '../../../hooks/useAdminData';

export default function AdminDashboard() {
    const { isAuthenticated, isChecking, logout } = useAdminAuth();
    const { skills, projects, isLoaded, exportData } = useAdminData();
    const router = useRouter();

    useEffect(() => {
        if (!isChecking && !isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, isChecking, router]);

    const handleLogout = () => {
        logout();
        router.push('/admin');
    };

    if (isChecking || !isLoaded) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                            ← Kembali ke Website
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Total Skills</h3>
                        <p className="text-4xl font-bold text-white">{skills.length}</p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Total Projects</h3>
                        <p className="text-4xl font-bold text-white">{projects.length}</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Link
                        href="/admin/skills"
                        className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 border border-blue-600/50 hover:border-blue-500 transition-all hover:scale-[1.02] group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-3xl">
                                ⚡
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    Kelola Skills
                                </h3>
                                <p className="text-blue-200/70">
                                    Tambah, edit, hapus, dan atur urutan keahlian
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/projects"
                        className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 border border-purple-600/50 hover:border-purple-500 transition-all hover:scale-[1.02] group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-3xl">
                                📁
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                                    Kelola Projects
                                </h3>
                                <p className="text-purple-200/70">
                                    Tambah, edit, hapus, dan atur urutan proyek
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Export/Import Section */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-4">Backup & Restore</h3>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={exportData}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Export Data (JSON)
                        </button>
                        <label className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Import Data
                            <input
                                type="file"
                                accept=".json"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (ev) => {
                                            const { importData } = useAdminData();
                                            if (importData(ev.target.result)) {
                                                alert('Data berhasil di-import!');
                                                window.location.reload();
                                            } else {
                                                alert('Gagal import data. Pastikan format JSON valid.');
                                            }
                                        };
                                        reader.readAsText(file);
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <p className="text-gray-500 text-sm mt-3">
                        Export data untuk backup, atau import untuk restore dari file backup.
                    </p>
                </div>
            </main>
        </div>
    );
}
