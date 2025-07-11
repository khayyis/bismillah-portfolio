// Script untuk preload gambar proyek
document.addEventListener('DOMContentLoaded', function() {
  console.log('Preload Project Images Script Loaded');
  
  // Daftar gambar yang perlu di-preload
  const imagesToPreload = [
    '/images/Dalam-Tahap-Pengembangan.jpeg',
    '/images/CHATBOT-WHATSAPP.png'
  ];
  
  // Fungsi untuk mendapatkan URL yang konsisten
  function getConsistentUrl(url) {
    if (!url) return '';
    
    try {
      // Jika URL sudah absolut dengan http, gunakan apa adanya
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      
      // Jika URL relatif dengan awalan /, gunakan apa adanya
      if (url.startsWith('/')) {
        return url;
      }
      
      // Jika tidak ada awalan, tambahkan path relatif
      return '/images/' + url;
    } catch (e) {
      console.error('Error normalizing URL:', url, e);
      return url; // Kembalikan URL asli jika terjadi error
    }
  }

  // Fungsi untuk preload gambar
  function preloadImages() {
    console.log('Preloading images:', imagesToPreload);
    
    // Verifikasi keberadaan placeholder image terlebih dahulu
    const placeholderImg = new Image();
    const placeholderSrc = getConsistentUrl('/images/Dalam-Tahap-Pengembangan.jpeg');
    console.log(`Verifying placeholder image: ${placeholderSrc}`);
    
    placeholderImg.onload = () => {
      console.log(`Placeholder image verified: ${placeholderSrc}`);
      // Setelah placeholder terverifikasi, preload gambar lainnya
      imagesToPreload.forEach(src => {
        if (src === '/images/Dalam-Tahap-Pengembangan.jpeg') return; // Skip placeholder karena sudah diverifikasi
        
        const img = new Image();
        const normalizedSrc = getConsistentUrl(src);
        console.log(`Preloading image: ${normalizedSrc}`);
        img.src = normalizedSrc;
        img.onload = () => console.log(`Image preloaded successfully: ${normalizedSrc}`);
        img.onerror = (e) => {
          console.error(`Failed to preload image: ${normalizedSrc}`, e);
          // Coba lagi dengan URL relatif jika URL absolut gagal
          if (normalizedSrc.includes(window.location.origin)) {
            const relativeUrl = normalizedSrc.replace(window.location.origin, '');
            console.log(`Retrying with relative URL: ${relativeUrl}`);
            const retryImg = new Image();
            retryImg.src = relativeUrl;
            retryImg.onerror = () => console.error(`Retry failed for: ${relativeUrl}`);
          }
        };
      });
    };
    
    placeholderImg.onerror = (e) => {
      console.error(`Critical error: Placeholder image not found: ${placeholderSrc}`, e);
      // Coba lagi dengan URL relatif alternatif
      const retryPlaceholder = new Image();
      retryPlaceholder.src = '/images/Dalam-Tahap-Pengembangan.jpeg';
      retryPlaceholder.onerror = () => console.error('Critical error: Placeholder image not found with alternative path');
    };
    
    placeholderImg.src = placeholderSrc;
  }

  // Preload gambar dengan delay kecil setelah halaman dimuat
  setTimeout(() => {
    preloadImages();
  }, 500);

  // Fungsi untuk memperbaiki gambar yang gagal dimuat
  function fixBrokenImages() {
    console.log('Fixing broken images...');
    // Cari semua gambar dalam project card dan AuroraCard
    const images = document.querySelectorAll('.project-card img, [class*="AuroraCard"] img');
    console.log(`Found ${images.length} project images`);
    
    images.forEach((img, index) => {
      console.log(`Checking image #${index + 1}:`, img.src);
      
      // Tambahkan handler untuk error
      img.onerror = function() {
        console.error(`Image error for: ${this.src}`);
        this.classList.add('error');
        
        // Cari parent container untuk menambahkan pesan error
        const container = this.closest('.relative.w-full.h-40') || this.parentElement;
        if (container && !container.querySelector('.image-error-container')) {
          const errorDiv = document.createElement('div');
          errorDiv.className = 'absolute inset-0 flex items-center justify-center bg-gray-800 image-error-container';
          errorDiv.style.zIndex = '20';
          errorDiv.innerHTML = '<span class="text-center text-gray-300 p-2">Gambar tidak tersedia</span>';
          container.appendChild(errorDiv);
        }
        
        // Coba gunakan placeholder sebagai fallback
        const placeholderSrc = '/images/Dalam-Tahap-Pengembangan.jpeg';
        if (this.src !== placeholderSrc) {
          console.log(`Replacing with placeholder: ${placeholderSrc}`);
          this.src = placeholderSrc;
        }
      };
      
      // Perbaiki tampilan gambar
      img.style.display = 'block';
      img.style.opacity = '1';
      img.style.visibility = 'visible';
      img.style.zIndex = '10';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.objectPosition = 'center';
      
      // Cek apakah gambar sudah error
      if (!img.complete || img.naturalWidth === 0) {
        console.log(`Reloading image: ${img.src}`);
        // Coba muat ulang gambar
        const currentSrc = img.src;
        
        // Jangan reload jika src kosong
        if (!currentSrc || currentSrc === 'about:blank' || currentSrc === 'null') {
          console.log('Empty src, setting placeholder');
          img.src = '/images/Dalam-Tahap-Pengembangan.jpeg';
          return;
        }
        
        img.src = '';
        setTimeout(() => {
          // Coba dengan URL absolut
          let newSrc = currentSrc;
          
          // Jika URL relatif, konversi ke absolut
          if (currentSrc.startsWith('/')) {
            newSrc = window.location.origin + currentSrc;
          } 
          // Jika URL berisi /images/ tapi bukan URL lengkap, ekstrak bagian filename
          else if (currentSrc.includes('/images/') && !currentSrc.startsWith('http')) {
            newSrc = window.location.origin + '/images/' + currentSrc.split('/images/')[1];
          }
          
          console.log(`Reloaded with absolute src: ${newSrc}`);
          img.src = newSrc;
          
          // Tambahkan handler untuk error kedua
          img.onerror = function() {
            console.error(`Second attempt failed for: ${newSrc}`);
            // Gunakan placeholder sebagai fallback terakhir
            this.src = '/images/Dalam-Tahap-Pengembangan.jpeg';
          };
        }, 100);
      }
    });
  }

  // Coba perbaiki gambar yang rusak setelah beberapa detik
  setTimeout(fixBrokenImages, 1000);
  // Coba lagi setelah beberapa detik untuk memastikan
  setTimeout(fixBrokenImages, 3000);
  // Coba lagi setelah lebih lama untuk memastikan semua gambar dimuat
  setTimeout(fixBrokenImages, 5000);
});