'use client';

import TabLoader from '../components/TabLoader';

/**
 * Loading - Komponen loading untuk Next.js App Router
 * 
 * Komponen ini akan ditampilkan secara otomatis oleh Next.js saat halaman sedang dimuat.
 * Menggunakan TabLoader dengan animasi text cycling.
 */
export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#111'
    }}>
      <TabLoader />
    </div>
  );
}
