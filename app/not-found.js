import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 text-center text-zinc-100">
      <h1 className="text-3xl font-bold tracking-tight text-white">404: Halaman Tidak Ditemukan</h1>
      <p className="mt-2 text-sm text-zinc-400">Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.</p>
      <Link
        href="/"
        className="mt-6 flex min-h-[44px] items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
