# Sistem Tema (Theme System)

## Pengantar

Sistem tema pada aplikasi ini dirancang untuk memberikan pengalaman yang konsisten dan dapat disesuaikan bagi pengguna. Sistem ini mendukung tema terang (light) dan gelap (dark) dengan transisi yang halus dan integrasi dengan preferensi sistem operasi pengguna.

## Fitur Utama

- **Tema Terang dan Gelap**: Dukungan penuh untuk tema terang dan gelap
- **Preferensi Sistem**: Secara otomatis mendeteksi dan mengikuti preferensi tema sistem operasi pengguna
- **Persistensi**: Menyimpan preferensi tema pengguna di localStorage
- **Transisi Halus**: Animasi transisi yang halus saat beralih antar tema
- **Integrasi Tailwind**: Terintegrasi dengan Tailwind CSS dark mode
- **Variabel CSS**: Menggunakan variabel CSS untuk konsistensi warna dan kemudahan pemeliharaan

## Struktur Sistem

### 1. ThemeProvider

Komponen `ThemeProvider` adalah pusat dari sistem tema. Komponen ini:

- Menyediakan context untuk tema saat ini
- Mengelola state tema (terang/gelap)
- Mendeteksi preferensi sistem
- Menyimpan preferensi pengguna di localStorage
- Menerapkan kelas tema ke elemen body

### 2. useTheme Hook

Hook `useTheme` memungkinkan komponen untuk mengakses dan memanipulasi tema:

```jsx
const { theme, toggleTheme, isDark, isLight, systemPreference } = useTheme();
```

### 3. Variabel CSS

Variabel CSS didefinisikan dalam `globals.css` dan diorganisir berdasarkan tema:

```css
:root {
  /* Variabel tema terang */
  --bg-primary: 249, 250, 251;
  --text-primary: 31, 41, 55;
  /* ... */
}

.theme-dark {
  /* Variabel tema gelap */
  --bg-primary: 17, 24, 39;
  --text-primary: 249, 250, 251;
  /* ... */
}
```

### 4. Integrasi Tailwind

Tailwind CSS dikonfigurasi untuk mendukung dark mode berbasis class:

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

## Cara Penggunaan

### Mengakses Tema dalam Komponen

```jsx
import { useTheme } from '../components/ThemeProvider';

function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <div>
      <p>Tema saat ini: {theme}</p>
      <button onClick={toggleTheme}>Ubah Tema</button>
      {isDark && <p>Ini adalah tema gelap</p>}
    </div>
  );
}
```

### Styling dengan Variabel CSS

```css
.my-element {
  background-color: rgb(var(--bg-primary));
  color: rgb(var(--text-primary));
  border: 1px solid rgb(var(--border-color));
}
```

### Styling dengan Tailwind Dark Mode

```jsx
<div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
  Konten yang responsif terhadap tema
</div>
```

## Praktik Terbaik

1. **Gunakan variabel CSS** untuk warna dan properti visual lainnya untuk konsistensi
2. **Manfaatkan Tailwind dark mode** dengan prefix `dark:` untuk styling yang responsif terhadap tema
3. **Uji kedua tema** untuk memastikan kontras dan keterbacaan yang baik
4. **Pertimbangkan aksesibilitas** saat memilih kombinasi warna
5. **Gunakan transisi** untuk pengalaman pengguna yang lebih baik saat beralih tema

## Troubleshooting

### Tema Tidak Berubah

- Pastikan `ThemeProvider` membungkus aplikasi Anda
- Periksa localStorage untuk nilai tema yang tersimpan
- Pastikan CSS variabel diterapkan dengan benar

### Flickering saat Pemuatan

- Implementasikan strategi untuk menghindari flash of unstyled content (FOUC)
- Pertimbangkan untuk menambahkan script inline di `_document.js` untuk mendeteksi tema sebelum render

## Pengembangan Lebih Lanjut

- Tema kustom tambahan selain terang dan gelap
- Preferensi warna aksen yang dapat disesuaikan
- Transisi tema yang lebih canggih
- Integrasi dengan mode hemat baterai perangkat