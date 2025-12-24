'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth, useAdminData } from '../../../hooks/useAdminData';

export default function AdminSkills() {
    const { isAuthenticated, isChecking } = useAdminAuth();
    const { skills, isLoaded, addSkill, updateSkill, deleteSkill, reorderSkills } = useAdminData();
    const router = useRouter();

    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', icon: '⚡', level: 80, category: '' });
    const [draggedIndex, setDraggedIndex] = useState(null);

    useEffect(() => {
        if (!isChecking && !isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, isChecking, router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updateSkill(editingId, formData);
            setEditingId(null);
        } else {
            addSkill(formData);
        }
        setFormData({ name: '', icon: '⚡', level: 80, category: '' });
        setShowForm(false);
    };

    const handleEdit = (skill) => {
        setFormData({ name: skill.name, icon: skill.icon, level: skill.level, category: skill.category });
        setEditingId(skill.id);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus skill ini?')) {
            deleteSkill(id);
        }
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
            reorderSkills(draggedIndex, dropIndex);
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
                        <h1 className="text-2xl font-bold text-white">Kelola Skills</h1>
                    </div>
                    <button
                        onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', icon: '⚡', level: 80, category: '' }); }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                        <span className="text-xl">+</span> Tambah Skill
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
                            <h2 className="text-xl font-bold text-white mb-4">
                                {editingId ? 'Edit Skill' : 'Tambah Skill Baru'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Nama Skill</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Icon (emoji)</label>
                                    <input
                                        type="text"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Level ({formData.level}%)</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Kategori</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Programming, Framework, dll"
                                    />
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
                                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        {editingId ? 'Update' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Skills List */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-700">
                        <p className="text-gray-400 text-sm">
                            💡 Drag & drop untuk mengatur urutan. Klik Edit untuk mengubah, Delete untuk menghapus.
                        </p>
                    </div>

                    {skills.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            Belum ada skill. Klik "Tambah Skill" untuk menambah.
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-700">
                            {skills.map((skill, index) => (
                                <li
                                    key={skill.id}
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
                                    <div className="text-2xl">{skill.icon}</div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium">{skill.name}</h3>
                                        <p className="text-gray-500 text-sm">{skill.category}</p>
                                    </div>
                                    <div className="w-24">
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                        <p className="text-gray-500 text-xs mt-1 text-center">{skill.level}%</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(skill)}
                                            className="px-3 py-1 bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600/30 rounded transition-colors text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(skill.id)}
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
