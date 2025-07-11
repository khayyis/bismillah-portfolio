# ProfileCard Component

## Komponen yang Dioptimasi

Komponen ProfileCard telah dioptimasi untuk performa dan pengalaman pengguna yang lebih baik. Berikut adalah komponen-komponen yang tersedia:

1. **ProfileCard** - Komponen dasar dengan optimasi internal
2. **OptimizedProfileCard** - Wrapper dengan lazy loading dan intersection observer
3. **ProfileCardProvider** - Provider untuk konfigurasi performa berdasarkan device
4. **ProfileCardWithProvider** - Solusi lengkap dengan semua optimasi

## Cara Penggunaan

### Penggunaan Dasar

```jsx
import ProfileCard from './components/ProfileCard';

function MyComponent() {
  return (
    <ProfileCard
      avatarUrl="/images/avatar.jpg"
      miniAvatarUrl="/images/mini-avatar.jpg"
      name="John Doe"
      title="Web Developer"
      handle="johndoe"
      status="Available"
      contactText="Contact"
      showUserInfo={true}
      enableTilt={true}
      onContactClick={() => console.log('Contact clicked')}
    />
  );
}
```

### Penggunaan dengan Optimasi Penuh

```jsx
import ProfileCardWithProvider from './components/ProfileCardWithProvider';

function MyComponent() {
  return (
    <ProfileCardWithProvider
      avatarUrl="/images/avatar.jpg"
      miniAvatarUrl="/images/mini-avatar.jpg"
      name="John Doe"
      title="Web Developer"
      handle="johndoe"
      status="Available"
      contactText="Contact"
      showUserInfo={true}
      onContactClick={() => console.log('Contact clicked')}
    />
  );
}
```

## Fitur Optimasi

### 1. Optimasi Performa

- **Lazy Loading** - Komponen dimuat hanya ketika diperlukan
- **Intersection Observer** - Komponen dimuat hanya ketika terlihat di viewport
- **Debounced Animations** - Animasi dioptimasi dengan debouncing untuk mengurangi jank
- **requestAnimationFrame** - Animasi menggunakan requestAnimationFrame untuk performa yang lebih baik
- **React.memo** - Mencegah re-render yang tidak perlu

### 2. Optimasi Loading

- **Preloading** - Avatar dimuat sebelumnya untuk mengurangi waktu loading
- **Fallback Images** - Gambar fallback digunakan jika gambar utama gagal dimuat
- **Loading States** - Indikator loading yang jelas untuk pengalaman pengguna yang lebih baik
- **Error Handling** - Penanganan error yang baik dengan retry mechanism

### 3. Optimasi Adaptif

- **Device Detection** - Optimasi berdasarkan kemampuan device
- **Connection Detection** - Adaptasi berdasarkan kualitas koneksi
- **Reduced Motion** - Mendukung preferensi reduced motion
- **Battery Saving** - Optimasi untuk mode hemat baterai

## Props

| Prop | Tipe | Default | Deskripsi |
|------|------|---------|------------|
| `avatarUrl` | string | - | URL gambar avatar utama |
| `miniAvatarUrl` | string | - | URL gambar mini avatar |
| `name` | string | - | Nama pengguna |
| `title` | string | - | Judul atau posisi pengguna |
| `handle` | string | - | Username atau handle pengguna |
| `status` | string | - | Status pengguna |
| `contactText` | string | 'Contact' | Teks tombol kontak |
| `showUserInfo` | boolean | true | Menampilkan info pengguna |
| `enableTilt` | boolean | true | Mengaktifkan efek tilt |
| `onContactClick` | function | - | Handler untuk klik tombol kontak |
| `className` | string | - | Class tambahan untuk styling |
| `iconUrl` | string | - | URL ikon tambahan |
| `grainUrl` | string | - | URL tekstur grain |
| `behindGradient` | string | - | Gradient di belakang card |
| `innerGradient` | string | - | Gradient di dalam card |
| `showBehindGradient` | boolean | true | Menampilkan gradient di belakang card |

## Utilitas

Beberapa fungsi utilitas tersedia di `utils/profileCardOptimizer.js`:

- `isValidAvatarUrl` - Memvalidasi URL avatar
- `preloadAvatar` - Memuat avatar sebelumnya dengan timeout dan retry
- `createThrottledAnimationHandler` - Membuat handler animasi yang di-throttle
- `getOptimizedGradient` - Mengoptimasi gradient berdasarkan preferensi pengguna
- `getProfileCardPerformanceConfig` - Mendapatkan konfigurasi performa berdasarkan device

## Performa

Komponen ini dioptimasi untuk:

- **First Contentful Paint (FCP)** - Dengan lazy loading dan preloading
- **Largest Contentful Paint (LCP)** - Dengan optimasi loading avatar
- **Cumulative Layout Shift (CLS)** - Dengan placeholder yang sesuai
- **First Input Delay (FID)** - Dengan optimasi event handler
- **Interaction to Next Paint (INP)** - Dengan optimasi animasi