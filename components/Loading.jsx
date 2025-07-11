'use client';

import React from 'react';

// Komponen Loading yang telah dihapus animasinya
const Loading = React.memo(({ isLoading = true, text = "Memuat..." }) => {
  // Tidak menampilkan apa-apa
  return null;
});

// Menambahkan displayName untuk membantu debugging
Loading.displayName = 'Loading';

export default Loading;