import { NextResponse } from 'next/server';

// Middleware untuk menangani simulasi delay pada gambar
export async function middleware(request) {
  const { pathname, search } = request.nextUrl;
  
  // Cek apakah request adalah untuk gambar dan memiliki parameter delay
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp)$/) && search.includes('delay=')) {
    // Ekstrak nilai delay dari parameter URL (dalam milidetik)
    const delayMatch = search.match(/delay=(\d+)/);
    const delayMs = delayMatch ? parseInt(delayMatch[1], 10) : 2000;
    
    // Simulasi delay dengan menunggu
    await new Promise(resolve => setTimeout(resolve, delayMs));
    
    // Lanjutkan dengan request asli setelah delay
    return NextResponse.next();
  }
  
  // Untuk request lainnya, lanjutkan tanpa modifikasi
  return NextResponse.next();
}

// Konfigurasi untuk menentukan path mana yang akan diproses oleh middleware
export const config = {
  // Hanya proses request untuk gambar
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};