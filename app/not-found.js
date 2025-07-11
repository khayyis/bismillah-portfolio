'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Halaman Tidak Ditemukan</h1>
      <p className="mb-6">Maaf, halaman yang Anda cari tidak tersedia.</p>
      <Link href="/">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Kembali ke Beranda
        </button>
      </Link>
    </div>
  );
}