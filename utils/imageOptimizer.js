/**
 * Utilitas untuk mengoptimalkan dan mengelola gambar
 */

// Fungsi untuk memvalidasi URL gambar
export function isValidImageUrl(url) {
  if (!url) return false;
  
  // Cek apakah URL adalah string
  if (typeof url !== 'string') return false;
  
  // Cek apakah URL kosong setelah trim
  if (url.trim() === '') return false;
  
  // Cek apakah URL adalah URL gambar yang valid
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];
  const hasValidExtension = imageExtensions.some(ext => 
    url.toLowerCase().endsWith(ext)
  );
  
  // Cek apakah URL adalah URL absolut atau relatif yang valid
  const isAbsoluteUrl = /^(https?:\/\/|\/)/.test(url) || /^[A-Za-z]:\\/.test(url);
  
  return hasValidExtension || isAbsoluteUrl;
}

// Fungsi untuk menormalkan URL gambar
export function normalizeImageUrl(url, basePath = '') {
  if (!url) return '';
  
  // Jika URL sudah absolut (http, https, atau path C:\), kembalikan apa adanya
  if (/^(https?:\/\/|[A-Za-z]:\\)/.test(url)) {
    return url;
  }
  
  // Jika URL dimulai dengan '/', anggap sebagai path relatif dari root
  if (url.startsWith('/')) {
    // Jika di browser, gunakan origin sebagai base
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${url}`;
    }
    return url;
  }
  
  // Jika URL relatif dan basePath disediakan, gabungkan keduanya
  if (basePath) {
    // Pastikan basePath diakhiri dengan '/' dan url tidak dimulai dengan '/'
    const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
    const normalizedUrl = url.startsWith('/') ? url.substring(1) : url;
    return `${normalizedBasePath}${normalizedUrl}`;
  }
  
  // Jika di browser dan tidak ada basePath, gunakan origin sebagai base
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/${url}`;
  }
  
  return url;
}

// Fungsi untuk memuat gambar sebelumnya (preload)
export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    if (!url || typeof url !== 'string') {
      reject(new Error('URL gambar tidak valid'));
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Gagal memuat gambar: ${url}`));
    img.src = url;
  });
}

// Fungsi untuk memperbaiki gambar yang rusak
export function fixBrokenImage(imgElement, placeholderSrc = '/images/Dalam-Tahap-Pengembangan.jpeg') {
  if (!imgElement) return;
  
  // Cek apakah gambar sudah dimuat dengan benar
  if (imgElement.complete && imgElement.naturalWidth === 0) {
    console.warn(`Gambar rusak terdeteksi: ${imgElement.src}`);
    
    // Simpan src asli untuk referensi
    const originalSrc = imgElement.src;
    
    // Coba muat ulang gambar
    const tempSrc = imgElement.src;
    imgElement.src = '';
    setTimeout(() => {
      imgElement.src = tempSrc;
      
      // Tambahkan event listener untuk menangani jika masih gagal
      imgElement.onerror = () => {
        console.warn(`Gagal memuat ulang gambar: ${originalSrc}, menggunakan placeholder`);
        imgElement.src = placeholderSrc;
        
        // Tambahkan kelas untuk styling
        imgElement.classList.add('image-error');
        
        // Tambahkan atribut untuk debugging
        imgElement.setAttribute('data-original-src', originalSrc);
        imgElement.setAttribute('data-error', 'true');
      };
    }, 500);
  }
}

// Fungsi untuk mengoptimalkan gambar berdasarkan koneksi dan perangkat
export function getOptimizedImageProps(src, connection, device) {
  const props = {
    src: src,
    loading: 'lazy', // Default lazy loading
    decoding: 'async', // Default async decoding
  };
  
  // Jika tidak ada informasi koneksi atau perangkat, kembalikan default
  if (!connection || !device) return props;
  
  // Untuk koneksi lambat atau mode hemat data, gunakan kualitas lebih rendah
  if (connection.saveData || 
      connection.effectiveType === 'slow-2g' || 
      connection.effectiveType === '2g') {
    // Tambahkan parameter untuk meminta gambar kualitas lebih rendah jika menggunakan CDN
    if (src.includes('imagecdn') || src.includes('cloudinary') || src.includes('imgix')) {
      props.src = `${src}${src.includes('?') ? '&' : '?'}quality=60&auto=compress`;
    }
  }
  
  // Untuk perangkat mobile, prioritaskan loading gambar yang terlihat
  if (device.isMobile) {
    props.loading = 'eager'; // Eager loading untuk gambar yang terlihat di viewport
  }
  
  // Untuk perangkat low-end, gunakan decoding sync untuk menghindari jank
  if (device.isLowEndDevice) {
    props.decoding = 'sync';
  }
  
  return props;
}

// Fungsi untuk mendeteksi apakah gambar terlihat di viewport
export function isImageInViewport(imgElement, threshold = 0) {
  if (!imgElement || typeof window === 'undefined') return false;
  
  const rect = imgElement.getBoundingClientRect();
  
  return (
    rect.top >= 0 - threshold &&
    rect.left >= 0 - threshold &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + threshold
  );
}

// Fungsi untuk memuat gambar secara progresif
export function loadImageProgressively(imgElement, lowQualitySrc, highQualitySrc) {
  if (!imgElement || !lowQualitySrc || !highQualitySrc) return;
  
  // Muat gambar kualitas rendah terlebih dahulu
  imgElement.src = lowQualitySrc;
  
  // Setelah gambar kualitas rendah dimuat, muat gambar kualitas tinggi
  imgElement.onload = () => {
    // Tambahkan kelas untuk efek blur
    imgElement.classList.add('image-blur');
    
    // Muat gambar kualitas tinggi
    const highQualityImg = new Image();
    highQualityImg.onload = () => {
      // Ganti src dengan gambar kualitas tinggi
      imgElement.src = highQualitySrc;
      
      // Hapus kelas blur setelah transisi
      setTimeout(() => {
        imgElement.classList.remove('image-blur');
      }, 500);
    };
    highQualityImg.src = highQualitySrc;
  };
  
  // Tangani error
  imgElement.onerror = () => {
    console.warn(`Gagal memuat gambar progresif: ${lowQualitySrc}`);
    imgElement.src = highQualitySrc;
  };
}