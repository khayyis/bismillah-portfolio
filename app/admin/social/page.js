'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth, useAdminData } from '../../../hooks/useAdminData';

const socialPlatforms = [
    { key: 'instagram', label: 'Instagram', icon: '📸', placeholder: 'https://instagram.com/username' },
    { key: 'github', label: 'GitHub', icon: '💻', placeholder: 'https://github.com/username' },
    { key: 'linkedin', label: 'LinkedIn', icon: '💼', placeholder: 'https://linkedin.com/in/username' },
    { key: 'twitter', label: 'Twitter / X', icon: '🐦', placeholder: 'https://twitter.com/username' },
    { key: 'youtube', label: 'YouTube', icon: '🎬', placeholder: 'https://youtube.com/@channel' },
    { key: 'whatsapp', label: 'WhatsApp', icon: '💬', placeholder: '+62812345678' },
    { key: 'telegram', label: 'Telegram', icon: '✈️', placeholder: 'https://t.me/username' },
];

export default function AdminSocial() {
    const { isAuthenticated, isChecking } = useAdminAuth();
    const { social, isLoaded, updateSocial } = useAdminData();
    const router = useRouter();

    const [formData, setFormData] = useState({});
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!isChecking && !isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, isChecking, router]);

    useEffect(() => {
        if (isLoaded && social) {
            setFormData(social);
        }
    }, [isLoaded, social]);

    const handleChange = (platform, field, value) => {
        setFormData(prev => ({
            ...prev,
            [platform]: {
                ...prev[platform],
                [field]: value
            }
        }));
    };

    const handleToggle = (platform) => {
        const current = formData[platform]?.enabled ?? false;
        handleChange(platform, 'enabled', !current);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Object.keys(formData).forEach(platform => {
            updateSocial(platform, formData[platform]);
        });
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
                        <h1 className="text-2xl font-bold text-white">Sosial Media</h1>
                    </div>
                    {saved && (
                        <div className="px-4 py-2 bg-green-600 text-white rounded-lg animate-pulse">
                            ✓ Tersimpan!
                        </div>
                    )}
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {socialPlatforms.map(({ key, label, icon, placeholder }) => {
                        const data = formData[key] || {};
                        const isEnabled = data.enabled ?? false;

                        return (
                            <div
                                key={key}
                                className={`bg-gray-800 rounded-xl p-4 border transition-all ${isEnabled ? 'border-blue-600' : 'border-gray-700 opacity-60'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <span className="text-xl">{icon}</span>
                                        {label}
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => handleToggle(key)}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${isEnabled ? 'bg-blue-600' : 'bg-gray-600'
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isEnabled ? 'right-1' : 'left-1'
                                                }`}
                                        />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {key === 'whatsapp' ? (
                                        <>
                                            <div>
                                                <label className="block text-xs text-gray-400 mb-1">Nomor WhatsApp</label>
                                                <input
                                                    type="text"
                                                    value={data.number || ''}
                                                    onChange={(e) => handleChange(key, 'number', e.target.value)}
                                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder={placeholder}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-400 mb-1">Pesan Default</label>
                                                <input
                                                    type="text"
                                                    value={data.message || ''}
                                                    onChange={(e) => handleChange(key, 'message', e.target.value)}
                                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Halo, saya ingin..."
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <label className="block text-xs text-gray-400 mb-1">URL</label>
                                                <input
                                                    type="text"
                                                    value={data.url || ''}
                                                    onChange={(e) => handleChange(key, 'url', e.target.value)}
                                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder={placeholder}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-400 mb-1">Username</label>
                                                <input
                                                    type="text"
                                                    value={data.username || ''}
                                                    onChange={(e) => handleChange(key, 'username', e.target.value)}
                                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="@username"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
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
