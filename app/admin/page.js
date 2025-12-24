'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../hooks/useAdminData';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, isChecking, login } = useAdminAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isChecking && isAuthenticated) {
            router.push('/admin/dashboard');
        }
    }, [isAuthenticated, isChecking, router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (login(password)) {
            router.push('/admin/dashboard');
        } else {
            setError('Password salah!');
            setLoading(false);
        }
    };

    if (isChecking) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-700">
                <h1 className="text-3xl font-bold text-white text-center mb-2">Admin Panel</h1>
                <p className="text-gray-400 text-center mb-8">Masukkan password untuk melanjutkan</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Masukkan password..."
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Loading...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                <p className="text-gray-500 text-xs text-center mt-6">
                    Default password: admin123
                </p>
            </div>
        </div>
    );
}
