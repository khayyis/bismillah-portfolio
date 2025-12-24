'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth, useAdminData } from '../../../hooks/useAdminData';

export default function AdminProfile() {
    const { isAuthenticated, isChecking } = useAdminAuth();
    const { profile, isLoaded, updateProfile } = useAdminData();
    const router = useRouter();

    const [formData, setFormData] = useState({});
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!isChecking && !isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, isChecking, router]);

    useEffect(() => {
        if (isLoaded && profile) {
            setFormData(profile);
        }
    }, [isLoaded, profile]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (isChecking || !isLoaded) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">
                            ← Dashboard
                        </Link>
                        <h1 className="text-2xl font-bold text-white">Profil & Informasi</h1>
                    </div>
                    {saved && (
                        <div className="px-4 py-2 bg-green-600 text-white rounded-lg animate-pulse">
                            ✓ Tersimpan!
                        </div>
                    )}
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Informasi Dasar */}
                    <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            👤 Informasi Dasar
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={formData.name || ''}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title / Jabatan</label>
                                <input
                                    type="text"
                                    value={formData.title || ''}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Handle / Username</label>
                                <input
                                    type="text"
                                    value={formData.handle || ''}
                                    onChange={(e) => handleChange('handle', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Khayyis_Billawal"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Status</label>
                                <input
                                    type="text"
                                    value={formData.status || ''}
                                    onChange={(e) => handleChange('status', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Available for Hire"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Availability</label>
                                <input
                                    type="text"
                                    value={formData.availability || ''}
                                    onChange={(e) => handleChange('availability', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Freelance / Pelajar"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Informasi Pendidikan */}
                    <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            🎓 Pendidikan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Sekolah / Institusi</label>
                                <input
                                    type="text"
                                    value={formData.school || ''}
                                    onChange={(e) => handleChange('school', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Jurusan / Departemen</label>
                                <input
                                    type="text"
                                    value={formData.department || ''}
                                    onChange={(e) => handleChange('department', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Lokasi</label>
                                <input
                                    type="text"
                                    value={formData.location || ''}
                                    onChange={(e) => handleChange('location', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Jakarta, Indonesia"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Kontak */}
                    <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            📧 Kontak
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Instagram</label>
                                <input
                                    type="text"
                                    value={formData.instagram || ''}
                                    onChange={(e) => handleChange('instagram', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="@username"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Gambar */}
                    <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            🖼️ Foto Profil
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">URL Avatar</label>
                                <input
                                    type="text"
                                    value={formData.avatarUrl || ''}
                                    onChange={(e) => handleChange('avatarUrl', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="/images/profile.jpg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">URL Mini Avatar</label>
                                <input
                                    type="text"
                                    value={formData.miniAvatarUrl || ''}
                                    onChange={(e) => handleChange('miniAvatarUrl', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="/images/profile.jpg"
                                />
                            </div>
                            {formData.avatarUrl && (
                                <div className="md:col-span-2">
                                    <p className="text-sm text-gray-400 mb-2">Preview:</p>
                                    <img
                                        src={formData.avatarUrl}
                                        alt="Preview"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
                                    />
                                </div>
                            )}
                        </div>
                    </section>

                    {/* About */}
                    <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            📝 Tentang Saya
                        </h2>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Bio / Deskripsi</label>
                            <textarea
                                value={formData.about || ''}
                                onChange={(e) => handleChange('about', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Ceritakan tentang diri Anda..."
                            />
                        </div>
                    </section>

                    {/* Teks Tombol */}
                    <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            🔘 Teks Tombol
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Tombol Kontak</label>
                                <input
                                    type="text"
                                    value={formData.contactText || ''}
                                    onChange={(e) => handleChange('contactText', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Tombol Hubungi</label>
                                <input
                                    type="text"
                                    value={formData.contactButtonText || ''}
                                    onChange={(e) => handleChange('contactButtonText', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Tombol Kirim</label>
                                <input
                                    type="text"
                                    value={formData.sendMessageText || ''}
                                    onChange={(e) => handleChange('sendMessageText', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                        >
                            💾 Simpan Perubahan
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
