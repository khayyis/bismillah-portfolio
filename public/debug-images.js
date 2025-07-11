// Script untuk debugging gambar - Enhanced
document.addEventListener('DOMContentLoaded', function() {
  console.log('Debug Images Script Loaded - Enhanced Version');
  
  // Fungsi untuk log semua gambar di halaman
  function logAllImages() {
    const allImages = document.querySelectorAll('img');
    console.log(`Total images on page: ${allImages.length}`);
    
    allImages.forEach((img, index) => {
      console.log(`Image #${index + 1}:`, {
        src: img.src,
        width: img.width,
        height: img.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        display: window.getComputedStyle(img).display,
        visibility: window.getComputedStyle(img).visibility,
        opacity: window.getComputedStyle(img).opacity,
        zIndex: window.getComputedStyle(img).zIndex,
        position: window.getComputedStyle(img).position
      });
    });
  }
  
  // Fungsi untuk log gambar proyek
  function logProjectImages() {
    const projectImages = document.querySelectorAll('.project-card img, [class*="project"] img, [class*="AuroraCard"] img');
    console.log(`Total project images: ${projectImages.length}`);
    
    projectImages.forEach((img, index) => {
      const style = window.getComputedStyle(img);
      const parentStyle = window.getComputedStyle(img.parentElement);
      
      console.log(`Project Image #${index + 1}:`, {
        src: img.src,
        width: img.width,
        height: img.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        zIndex: style.zIndex,
        position: style.position,
        parentDisplay: parentStyle.display,
        parentVisibility: parentStyle.visibility,
        parentOpacity: parentStyle.opacity,
        parentZIndex: parentStyle.zIndex,
        className: img.className,
        parentClassName: img.parentElement.className
      });
      
      // Tambahkan outline untuk debugging visual
      img.style.outline = '3px solid red';
      img.parentElement.style.outline = '3px solid blue';
    });
  }
  
  // Fungsi untuk memperbaiki gambar yang tidak ditampilkan
  function fixNonDisplayingImages() {
    console.log('Fixing non-displaying images...');
    const allImages = document.querySelectorAll('img');
    let fixedCount = 0;
    
    allImages.forEach((img, index) => {
      // Cek apakah gambar tidak ditampilkan atau tidak dimuat dengan benar
      const style = window.getComputedStyle(img);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0' || 
          !img.complete || img.naturalWidth === 0) {
        console.log(`Fixing non-displaying image #${index + 1}:`, img.src);
        fixedCount++;
        
        // Perbaiki CSS
        img.style.display = 'block !important';
        img.style.visibility = 'visible !important';
        img.style.opacity = '1 !important';
        img.style.zIndex = '10 !important';
        img.style.width = '100% !important';
        img.style.height = '100% !important';
        img.style.objectFit = 'cover !important';
        img.style.objectPosition = 'center !important';
        
        // Coba muat ulang gambar
        if (img.src && img.src !== window.location.href) {
          const currentSrc = img.src;
          img.src = '';
          setTimeout(() => {
            console.log(`Reloading image: ${currentSrc}`);
            img.src = currentSrc;
          }, 100);
        }
      }
    });
    
    console.log(`Fixed ${fixedCount} images`);
    return fixedCount;
  }
  
  // Fungsi untuk memperbaiki gambar proyek secara khusus
  function fixProjectImages() {
    console.log('Fixing project images specifically...');
    const projectImages = document.querySelectorAll('.project-card img, [class*="project"] img, [class*="AuroraCard"] img');
    let fixedCount = 0;
    
    projectImages.forEach((img, index) => {
      console.log(`Fixing project image #${index + 1}:`, img.src);
      fixedCount++;
      
      // Perbaiki CSS dengan !important
      img.setAttribute('style', `
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 10 !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center !important;
        position: relative !important;
        transform: translateZ(0) !important;
        backface-visibility: hidden !important;
        -webkit-backface-visibility: hidden !important;
        -webkit-transform: translateZ(0) scale(1.0, 1.0) !important;
        outline: 3px solid red !important;
      `);
      
      // Perbaiki parent container
      const container = img.closest('.relative.w-full.h-40') || img.parentElement;
      if (container) {
        container.setAttribute('style', `
          position: relative !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          overflow: hidden !important;
          min-height: 160px !important;
          width: 100% !important;
          z-index: 5 !important;
          outline: 3px solid blue !important;
        `);
      }
      
      // Coba muat ulang gambar jika perlu
      if (!img.complete || img.naturalWidth === 0) {
        if (img.src && img.src !== window.location.href) {
          const currentSrc = img.src;
          
          // Jika URL relatif, konversi ke absolut
          let newSrc = currentSrc;
          if (currentSrc.startsWith('/')) {
            newSrc = window.location.origin + currentSrc;
          }
          
          // Jika gambar error, gunakan placeholder
          if (img.naturalWidth === 0) {
            newSrc = '/images/Dalam-Tahap-Pengembangan.jpeg';
          }
          
          img.src = '';
          setTimeout(() => {
            console.log(`Reloading project image with: ${newSrc}`);
            img.src = newSrc;
          }, 100);
        }
      }
      
      // Khusus untuk AuroraCard, perbaiki container dan loading state
      if (img.closest('[class*="AuroraCard"]')) {
        // Perbaiki loading state jika ada
        const loadingState = img.parentElement.querySelector('[class*="loading"]');
        if (loadingState) {
          loadingState.style.display = 'none';
        }
        
        // Perbaiki error container jika ada
        const errorContainer = img.parentElement.querySelector('.image-error-container');
        if (errorContainer && img.complete && img.naturalWidth > 0) {
          errorContainer.style.display = 'none';
        }
      }
    });
    
    console.log(`Fixed ${fixedCount} project images`);
    return fixedCount;
  }
  
  // Jalankan fungsi debugging setelah halaman dimuat
  setTimeout(logAllImages, 2000);
  setTimeout(logProjectImages, 2500);
  setTimeout(fixNonDisplayingImages, 3000);
  setTimeout(fixProjectImages, 3500);
  
  // Jalankan lagi setelah beberapa detik untuk memastikan
  setTimeout(logProjectImages, 5000);
  setTimeout(fixNonDisplayingImages, 5500);
  setTimeout(fixProjectImages, 6000);
  
  // Jalankan lagi setelah lebih lama untuk memastikan semua gambar dimuat
  setTimeout(logProjectImages, 8000);
  setTimeout(fixProjectImages, 8500);
  
  // Tambahkan event listener untuk window load
  window.addEventListener('load', function() {
    console.log('Window fully loaded - fixing images again');
    setTimeout(fixProjectImages, 1000);
  });
});