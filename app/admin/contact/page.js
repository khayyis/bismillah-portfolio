'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth, useAdminData } from '../../../hooks/useAdminData';

const iconOptions = ['📧', '✈️', '🎓', '📷', '🔗', '💼', '🌐', '📱', '💬', '🎨', '🛠️', '📚'];

export default function AdminContact() {
    const { isAuthenticated, isChecking } = useAdminAuth();
    const {
        contact, customLinks, isLoaded,
        updateContact, addCustomLink, updateCustomLink, deleteCustomLink
    } = useAdminData();
    const router = useRouter();

    const [formData, setFormData] = useState({});
    const [saved, setSaved] = useState(false);
    const [editingLink, setEditingLink] = useState(null);
    const [newLink, setNewLink] = useState({ title: '', subtitle: '', url: '', icon: '🔗', enabled: true });

    useEffect(() => {
        if (!isChecking && !isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, isChecking, router]);

    useEffect(() => {
        if (isLoaded && contact) {
            setFormData(contact);
        }
    }, [isLoaded, contact]);

    const handleContactChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: typeof prev[section] === 'object'
                ? { ...prev[section], [field]: value }
                : value
        }));
    };

    const handleSaveContact = async () => {
        await updateContact(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleAddLink = async () => {
        if (newLink.title.trim()) {
            await addCustomLink(newLink);
            setNewLink({ title: '', subtitle: '', url: '', icon: '🔗', enabled: true });
        }
    };

    const handleUpdateLink = async (id, updates) => {
        await updateCustomLink(id, updates);
        setEditingLink(null);
    };

    const handleDeleteLink = async (id) => {
        if (confirm('Hapus link ini?')) {
            await deleteCustomLink(id);
        }
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
                        <h1 className="text-2xl font-bold text-white">Hubungi Saya</h1>
                    </div>
                    {saved && (
                        <div className="px-4 py-2 bg-green-600 text-white rounded-lg animate-pulse">
                            ✓ Tersimpan!
                        </div>
                    )}
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-6 space-y-8">
                {/* Section Title */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-lg font-bold text-white mb-4">📝 Judul Section</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Judul</label>
                            <input
                                type="text"
                                value={formData.sectionTitle || ''}
                                onChange={(e) => handleContactChange('sectionTitle', null, e.target.value)}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Hubungi Saya"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Subtitle</label>
                            <textarea
                                value={formData.sectionSubtitle || ''}
                                onChange={(e) => handleContactChange('sectionSubtitle', null, e.target.value)}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={2}
                                placeholder="Tertarik untuk berkolaborasi..."
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-lg font-bold text-white mb-4">📞 Kontak Utama</h2>
                    <div className="space-y-6">
                        {/* Email */}
                        <div className="border-b border-gray-700 pb-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-medium flex items-center gap-2">📧 Email</h3>
                                <button
                                    type="button"
                                    onClick={() => handleContactChange('email', 'enabled', !formData.email?.enabled)}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${formData.email?.enabled ? 'bg-blue-600' : 'bg-gray-600'}`}
                                >
                                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.email?.enabled ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="email"
                                    value={formData.email?.address || ''}
                                    onChange={(e) => handleContactChange('email', 'address', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                                    placeholder="email@example.com"
                                />
                                <input
                                    type="text"
                                    value={formData.email?.subject || ''}
                                    onChange={(e) => handleContactChange('email', 'subject', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                                    placeholder="Subject email"
                                />
                            </div>
                        </div>

                        {/* Telegram */}
                        <div className="border-b border-gray-700 pb-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-medium flex items-center gap-2">✈️ Telegram</h3>
                                <button
                                    type="button"
                                    onClick={() => handleContactChange('telegram', 'enabled', !formData.telegram?.enabled)}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${formData.telegram?.enabled ? 'bg-blue-600' : 'bg-gray-600'}`}
                                >
                                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.telegram?.enabled ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.telegram?.username || ''}
                                    onChange={(e) => handleContactChange('telegram', 'username', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                                    placeholder="username"
                                />
                                <input
                                    type="text"
                                    value={formData.telegram?.url || ''}
                                    onChange={(e) => handleContactChange('telegram', 'url', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                                    placeholder="https://t.me/username"
                                />
                            </div>
                        </div>

                        {/* School */}
                        <div className="border-b border-gray-700 pb-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-medium flex items-center gap-2">🎓 Sekolah</h3>
                                <button
                                    type="button"
                                    onClick={() => handleContactChange('school', 'enabled', !formData.school?.enabled)}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${formData.school?.enabled ? 'bg-blue-600' : 'bg-gray-600'}`}
                                >
                                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.school?.enabled ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.school?.name || ''}
                                    onChange={(e) => handleContactChange('school', 'name', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                                    placeholder="Nama Sekolah"
                                />
                                <input
                                    type="text"
                                    value={formData.school?.department || ''}
                                    onChange={(e) => handleContactChange('school', 'department', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                                    placeholder="Jurusan"
                                />
                            </div>
                        </div>

                        {/* Photography */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-medium flex items-center gap-2">📷 Fotografi</h3>
                                <button
                                    type="button"
                                    onClick={() => handleContactChange('photography', 'enabled', !formData.photography?.enabled)}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${formData.photography?.enabled ? 'bg-blue-600' : 'bg-gray-600'}`}
                                >
                                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.photography?.enabled ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.photography?.title || ''}
                                    onChange={(e) => handleContactChange('photography', 'title', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                                    placeholder="Judul"
                                />
                                <input
                                    type="text"
                                    value={formData.photography?.subtitle || ''}
                                    onChange={(e) => handleContactChange('photography', 'subtitle', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                                    placeholder="Subtitle"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSaveContact}
                        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        💾 Simpan Kontak
                    </button>
                </div>

                {/* Custom Links */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-lg font-bold text-white mb-4">🔗 Custom Links</h2>
                    <p className="text-gray-400 text-sm mb-4">Tambahkan link kustom yang akan ditampilkan di section Hubungi Saya</p>

                    {/* Existing Links */}
                    <div className="space-y-3 mb-6">
                        {customLinks.map((link) => (
                            <div key={link.id} className={`bg-gray-700 rounded-lg p-4 border ${link.enabled ? 'border-gray-600' : 'border-gray-700 opacity-60'}`}>
                                {editingLink === link.id ? (
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                defaultValue={link.title}
                                                id={`title-${link.id}`}
                                                className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                                                placeholder="Judul"
                                            />
                                            <input
                                                type="text"
                                                defaultValue={link.subtitle}
                                                id={`subtitle-${link.id}`}
                                                className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                                                placeholder="Subtitle"
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            <input
                                                type="text"
                                                defaultValue={link.url}
                                                id={`url-${link.id}`}
                                                className="col-span-2 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                                                placeholder="URL"
                                            />
                                            <select
                                                defaultValue={link.icon}
                                                id={`icon-${link.id}`}
                                                className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                                            >
                                                {iconOptions.map(icon => (
                                                    <option key={icon} value={icon}>{icon}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdateLink(link.id, {
                                                    title: document.getElementById(`title-${link.id}`).value,
                                                    subtitle: document.getElementById(`subtitle-${link.id}`).value,
                                                    url: document.getElementById(`url-${link.id}`).value,
                                                    icon: document.getElementById(`icon-${link.id}`).value
                                                })}
                                                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                                            >
                                                Simpan
                                            </button>
                                            <button
                                                onClick={() => setEditingLink(null)}
                                                className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{link.icon}</span>
                                            <div>
                                                <div className="text-white font-medium">{link.title}</div>
                                                {link.subtitle && <div className="text-gray-400 text-sm">{link.subtitle}</div>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleUpdateLink(link.id, { enabled: !link.enabled })}
                                                className={`relative w-10 h-5 rounded-full transition-colors ${link.enabled ? 'bg-blue-600' : 'bg-gray-600'}`}
                                            >
                                                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${link.enabled ? 'right-0.5' : 'left-0.5'}`} />
                                            </button>
                                            <button
                                                onClick={() => setEditingLink(link.id)}
                                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteLink(link.id)}
                                                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Add New Link */}
                    <div className="bg-gray-700/50 rounded-lg p-4 border border-dashed border-gray-600">
                        <h3 className="text-white font-medium mb-3">+ Tambah Link Baru</h3>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <input
                                type="text"
                                value={newLink.title}
                                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                placeholder="Judul (wajib)"
                            />
                            <input
                                type="text"
                                value={newLink.subtitle}
                                onChange={(e) => setNewLink({ ...newLink, subtitle: e.target.value })}
                                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                placeholder="Subtitle (opsional)"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            <input
                                type="text"
                                value={newLink.url}
                                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                className="col-span-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                placeholder="URL (opsional)"
                            />
                            <select
                                value={newLink.icon}
                                onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                            >
                                {iconOptions.map(icon => (
                                    <option key={icon} value={icon}>{icon}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleAddLink}
                            disabled={!newLink.title.trim()}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded transition-colors"
                        >
                            + Tambah Link
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
