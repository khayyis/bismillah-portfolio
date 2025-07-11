# Portofolio Khayyis Billawal Rozikin

Proyek portofolio personal untuk Khayyis Billawal Rozikin, siswa SMKN 4 Jakarta jurusan Teknik Mekatronika.

## Teknologi yang Digunakan

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animasi**: Framer Motion
- **Deployment**: Vercel (direkomendasikan)

## Fitur

- Desain modern yang mengikuti Payrot Design System
- Layout yang responsif untuk semua perangkat
- Animasi halus dengan Framer Motion
- Formulir kontak interaktif
- Tampilan proyek dinamis dengan filter kategori

## Cara Menjalankan Proyek Secara Lokal

1. Pastikan Anda telah menginstal Node.js (minimal versi 18.x)

2. Clone repositori ini:
   ```bash
   git clone https://github.com/username/khayyis-portfolio.git
   cd khayyis-portfolio
   ```

3. Instal dependensi:
   ```bash
   npm install
   ```

4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Struktur Folder

- `/components` - Komponen React yang dapat digunakan kembali
- `/app` - Halaman dan layout Next.js App Router
- `/public` - Aset statis seperti gambar
- `/config` - File konfigurasi untuk informasi pribadi, proyek, keahlian, dan tema

## Cara Mengedit Konten

Untuk memperbarui konten portofolio, Anda dapat menggunakan file konfigurasi yang tersedia di folder `/config`:

1. **Informasi Pribadi**: Edit file `config/userInfo.js` untuk mengubah nama, judul, kontak, dan informasi pribadi lainnya
2. **Proyek**: Edit file `config/projectsConfig.js` untuk mengubah daftar proyek yang ditampilkan
3. **Keahlian**: Edit file `config/skillsConfig.js` untuk mengubah daftar keahlian dan sertifikasi
4. **Tema**: Edit file `config/themeConfig.js` untuk menyesuaikan warna, font, dan efek visual
5. **SEO & Metadata**: Edit file `config/siteConfig.js` untuk mengubah pengaturan SEO dan metadata situs
6. **Sosial Media**: Edit file `config/socialConfig.js` untuk mengubah tautan sosial media dan kontak

Semua perubahan pada file konfigurasi akan otomatis diterapkan ke seluruh website tanpa perlu mengubah komponen secara langsung. Lihat file `config/README.md` untuk panduan lebih detail.

## Menyesuaikan Tema

Tema visual didasarkan pada Payrot Design System. Anda dapat menyesuaikan warna, font, dan nilai-nilai lain di file `tailwind.config.js`.

## Menambahkan Foto

1. Simpan foto profil Anda di folder `public/images/`
2. Perbarui komponen `Hero.jsx` dan `About.jsx` dengan nama file foto Anda

## Deployment

Cara termudah untuk men-deploy portofolio ini adalah dengan menggunakan Vercel:

1. Unggah kode Anda ke GitHub/GitLab/Bitbucket
2. Impor proyek ke [Vercel](https://vercel.com)
3. Ikuti petunjuk untuk men-deploy

## Lisensi

Hak cipta © 2024 Khayyis Billawal Rozikin. Hak cipta dilindungi.