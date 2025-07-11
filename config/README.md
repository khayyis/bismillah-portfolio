# Konfigurasi Website Portofolio

Folder ini berisi file-file konfigurasi yang memudahkan Anda untuk mengubah berbagai aspek website portofolio tanpa perlu mengubah kode komponen secara langsung.

## Daftar File Konfigurasi

Folder ini berisi beberapa file konfigurasi yang dapat Anda ubah:

1. **userInfo.js** - Informasi pribadi seperti nama, judul, kontak, dll.
2. **projectsConfig.js** - Daftar proyek yang ditampilkan di bagian Proyek
3. **skillsConfig.js** - Daftar keahlian, kemampuan, dan sertifikasi
4. **themeConfig.js** - Pengaturan tema visual seperti warna, font, dan efek
5. **siteConfig.js** - Pengaturan situs secara keseluruhan, termasuk metadata dan SEO
6. **socialConfig.js** - Tautan sosial media dan kontak eksternal

## Cara Menggunakan

Untuk mengubah aspek website, cukup edit file konfigurasi yang sesuai di folder ini. Semua perubahan akan otomatis diterapkan ke seluruh website tanpa perlu mengubah kode komponen.

### 1. Struktur File userInfo.js

```javascript
const userInfo = {
  // Informasi Dasar
  name: "Nama Lengkap Anda",
  title: "Judul/Posisi Anda",
  handle: "username_anda",
  status: "Status Ketersediaan",
  availability: "Jenis Ketersediaan",
  
  // Informasi Kontak
  email: "email@anda.com",
  instagram: "@username_instagram",
  
  // Informasi Lokasi
  location: "Kota, Negara",
  school: "Nama Sekolah/Institusi",
  department: "Jurusan/Departemen",
  
  // Informasi Gambar
  avatarUrl: "/path/ke/foto/profil.jpg",
  miniAvatarUrl: "/path/ke/foto/mini.jpg",
  
  // Informasi Tentang
  about: "Deskripsi tentang diri Anda...",
  
  // Teks Tombol
  contactText: "Teks Tombol Kontak",
  contactButtonText: "Teks Tombol Hubungi",
  sendMessageText: "Teks Tombol Kirim Pesan",
};
```

#### Penjelasan Field userInfo.js

- **name**: Nama lengkap Anda yang akan ditampilkan di profil
- **title**: Judul atau posisi Anda (misalnya "Web Developer", "Mahasiswa Teknik")
- **handle**: Username yang ditampilkan dengan format @username
- **status**: Status ketersediaan Anda (misalnya "Available for Hire")
- **availability**: Jenis ketersediaan (misalnya "Freelance / Pelajar")
- **email**: Alamat email kontak
- **instagram**: Username Instagram dengan format @username
- **location**: Lokasi Anda (Kota, Negara)
- **school**: Nama sekolah atau institusi pendidikan
- **department**: Jurusan atau departemen
- **avatarUrl**: Path ke file gambar profil utama
- **miniAvatarUrl**: Path ke file gambar profil mini (bisa sama dengan avatarUrl)
- **about**: Deskripsi tentang diri Anda yang ditampilkan di bagian About
- **contactText**: Teks yang ditampilkan pada tombol kontak di kartu profil
- **contactButtonText**: Teks yang ditampilkan pada tombol hubungi di bagian About
- **sendMessageText**: Teks yang ditampilkan pada tombol kirim pesan di form kontak

### 2. Struktur File projectsConfig.js

```javascript
const projectsConfig = [
  {
    id: 1,
    title: "Judul Proyek",
    description: "Deskripsi proyek Anda...",
    imageUrl: "/path/ke/gambar/proyek.jpg",
    tags: ["Tag1", "Tag2", "Tag3"],
    demoUrl: "#", // URL demo proyek
    codeUrl: "#", // URL kode sumber
    featured: true // Apakah proyek unggulan
  },
  // Tambahkan proyek lainnya di sini
];
```

#### Penjelasan Field projectsConfig.js

- **id**: ID unik untuk proyek
- **title**: Judul proyek
- **description**: Deskripsi singkat tentang proyek
- **imageUrl**: Path ke gambar proyek (dari folder public)
- **tags**: Array tag/kategori proyek
- **demoUrl**: URL untuk demo proyek (gunakan # jika tidak ada)
- **codeUrl**: URL untuk kode sumber proyek (gunakan # jika tidak ada)
- **featured**: Boolean yang menentukan apakah proyek ditampilkan sebagai unggulan

### 3. Struktur File skillsConfig.js

```javascript
const skillsConfig = {
  // Kategori skill teknis dengan persentase kemampuan
  technicalSkills: [
    { name: "Nama Skill", percentage: 85 },
    // Tambahkan skill lainnya
  ],
  
  // Kategori skill perangkat lunak
  softwareSkills: [
    { name: "Nama Software", icon: "icon-name" },
    // Tambahkan software lainnya
  ],
  
  // Kategori soft skills
  softSkills: [
    "Soft Skill 1",
    "Soft Skill 2",
    // Tambahkan soft skill lainnya
  ],
  
  // Sertifikasi dan penghargaan
  certifications: [
    {
      title: "Judul Sertifikasi",
      issuer: "Penerbit",
      date: "Tahun",
      credentialUrl: "#"
    },
    // Tambahkan sertifikasi lainnya
  ],
};
```

### 4. Struktur File themeConfig.js

File ini berisi pengaturan tema visual seperti warna, font, dan efek. Anda dapat menyesuaikan nilai-nilai ini sesuai preferensi Anda.

### 5. Struktur File siteConfig.js

File ini berisi pengaturan situs secara keseluruhan, termasuk metadata untuk SEO, pengaturan Open Graph untuk media sosial, dan item navigasi.

### 6. Struktur File socialConfig.js

```javascript
const socialConfig = {
  // Tautan sosial media
  socialMedia: {
    instagram: {
      url: "https://instagram.com/username",
      username: "@username",
      enabled: true,
    },
    // Platform sosial media lainnya...
  },
  
  // Tautan eksternal
  externalLinks: {
    portfolio: {
      url: "https://your-portfolio.com",
      label: "Portfolio Website",
      enabled: true,
    },
    // Tautan eksternal lainnya...
  },
  
  // Pengaturan kontak
  contact: {
    email: {
      address: "email@anda.com",
      subject: "Subject Default",
      enabled: true,
    },
    // Metode kontak lainnya...
  },
  
  // Pengaturan sharing
  sharing: {
    enabled: true,
    platforms: ["facebook", "twitter", "linkedin", "whatsapp"],
    defaultMessage: "Pesan default untuk berbagi",
  },
};
```

File ini berisi pengaturan untuk tautan sosial media, tautan eksternal, metode kontak, dan opsi berbagi. Anda dapat mengaktifkan atau menonaktifkan platform tertentu dengan mengubah nilai `enabled`.

## Catatan Penting

- Pastikan path gambar benar dan mengarah ke file yang ada di folder `/public`
- Jangan mengubah struktur file, hanya ubah nilai dari setiap properti
- Setelah mengubah file konfigurasi, website akan otomatis memperbarui informasi yang ditampilkan
- Untuk perubahan yang lebih kompleks, Anda mungkin perlu mengubah kode komponen