'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth, useAdminData } from '../../../hooks/useAdminData';

const colorPresets = [
    { name: 'Blue', color: '#3B82F6', gradient: 'linear-gradient(145deg, #3B82F6, #000)' },
    { name: 'Green', color: '#10B981', gradient: 'linear-gradient(145deg, #10B981, #000)' },
    { name: 'Purple', color: '#8B5CF6', gradient: 'linear-gradient(145deg, #8B5CF6, #000)' },
    { name: 'Red', color: '#EF4444', gradient: 'linear-gradient(145deg, #EF4444, #000)' },
    { name: 'Yellow', color: '#F59E0B', gradient: 'linear-gradient(145deg, #F59E0B, #000)' },
    { name: 'Cyan', color: '#06B6D4', gradient: 'linear-gradient(145deg, #06B6D4, #000)' },
    { name: 'Pink', color: '#EC4899', gradient: 'linear-gradient(145deg, #EC4899, #000)' },
    { name: 'Indigo', color: '#4F46E5', gradient: 'linear-gradient(145deg, #4F46E5, #000)' },
];

export default function AdminProjects() {
    const { isAuthenticated, isChecking } = useAdminAuth();
    const { projects, isLoaded, addProject, updateProject, deleteProject, reorderProjects } = useAdminData();
    const router = useRouter();

    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        image: '/images/Dalam-Tahap-Pengembangan.jpeg',
        handle: '',
        url: '',
        borderColor: '#3B82F6',
        gradient: 'linear-gradient(145deg, #3B82F6, #000)'
    });
    const [draggedIndex, setDraggedIndex] = useState(null);

    useEffect(() => {
        if (!isChecking && !isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, isChecking, router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updateProject(editingId, formData);
            setEditingId(null);
        } else {
            addProject(formData);
        }
        setFormData({
            title: '',
            subtitle: '',
            image: '/images/Dalam-Tahap-Pengembangan.jpeg',
            handle: '',
            url: '',
            borderColor: '#3B82F6',
            gradient: 'linear-gradient(145deg, #3B82F6, #000)'
        });
        setShowForm(false);
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            subtitle: project.subtitle,
            image: project.image,
            handle: project.handle || '',
            url: project.url || '',
            borderColor: project.borderColor,
            gradient: project.gradient
        });
        setEditingId(project.id);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus project ini?')) {
            deleteProject(id);
        }
    };

    const handleColorPreset = (preset) => {
        setFormData({ ...formData, borderColor: preset.color, gradient: preset.gradient });
    };

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        e.target.style.opacity = '0.5';
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1';
        setDraggedIndex(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== dropIndex) {
            reorderProjects(draggedIndex, dropIndex);
        }
        setDraggedIndex(null);
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
                        <h1 className="text-2xl font-bold text-white">Kelola Projects</h1>
                    </div>
                    <button
                        onClick={() => {
                            setShowForm(true);
                            setEditingId(null);
                            setFormData({
                                title: '',
                                subtitle: '',
                                image: '/images/Dalam-Tahap-Pengembangan.jpeg',
                                handle: '',
                                url: '',
                                borderColor: '#3B82F6',
                                gradient: 'linear-gradient(145deg, #3B82F6, #000)'
                            });
                        }}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                        <span className="text-xl">+</span> Tambah Project
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                        <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-gray-700 my-8">
                            <h2 className="text-xl font-bold text-white mb-4">
                                {editingId ? 'Edit Project' : 'Tambah Project Baru'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Judul Project</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Nama project..."
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Subtitle / Kategori</label>
                                    <input
                                        type="text"
                                        value={formData.subtitle}
                                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Web Development, Robotik, dll"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">URL Gambar</label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="/images/project.jpg atau https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Handle (opsional)</label>
                                    <input
                                        type="text"
                                        value={formData.handle}
                                        onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="@username"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Link Project (opsional)</label>
                                    <input
                                        type="text"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Warna Border</label>
                                    <div className="flex flex-wrap gap-2">
                                        {colorPresets.map((preset) => (
                                            <button
                                                key={preset.name}
                                                type="button"
                                                onClick={() => handleColorPreset(preset)}
                                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${formData.borderColor === preset.color ? 'border-white scale-110' : 'border-gray-600'
                                                    }`}
                                                style={{ backgroundColor: preset.color }}
                                                title={preset.name}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="border border-gray-600 rounded-lg p-4 mt-4">
                                    <p className="text-gray-400 text-xs mb-2">Preview:</p>
                                    <div
                                        className="rounded-lg p-3 border"
                                        style={{
                                            background: formData.gradient,
                                            borderColor: formData.borderColor
                                        }}
                                    >
                                        <p className="text-white font-bold">{formData.title || 'Judul Project'}</p>
                                        <p className="text-gray-300 text-sm">{formData.subtitle || 'Subtitle'}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => { setShowForm(false); setEditingId(null); }}
                                        className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                                    >
                                        {editingId ? 'Update' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Projects List */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-700">
                        <p className="text-gray-400 text-sm">
                            💡 Drag & drop untuk mengatur urutan. Klik Edit untuk mengubah, Delete untuk menghapus.
                        </p>
                    </div>

                    {projects.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            Belum ada project. Klik "Tambah Project" untuk menambah.
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-700">
                            {projects.map((project, index) => (
                                <li
                                    key={project.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, index)}
                                    className={`flex items-center gap-4 p-4 hover:bg-gray-750 cursor-grab active:cursor-grabbing transition-colors ${draggedIndex === index ? 'bg-gray-700' : ''
                                        }`}
                                >
                                    <div className="text-gray-500 cursor-grab">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                                        </svg>
                                    </div>
                                    <div
                                        className="w-16 h-12 rounded-lg overflow-hidden border-2"
                                        style={{ borderColor: project.borderColor }}
                                    >
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium">{project.title}</h3>
                                        <p className="text-gray-500 text-sm">{project.subtitle}</p>
                                    </div>
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: project.borderColor }}
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="px-3 py-1 bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600/30 rounded transition-colors text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="px-3 py-1 bg-red-600/20 text-red-500 hover:bg-red-600/30 rounded transition-colors text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}
