// Contoh penggunaan sistem tema dalam komponen React

// 1. Menggunakan useTheme hook
import { useTheme } from '../components/ThemeProvider';

function ThemeAwareComponent() {
  // Mengakses nilai tema dari context
  const { theme, toggleTheme, isDark, isLight, systemPreference } = useTheme();
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Informasi Tema
      </h2>
      
      <div className="space-y-2 mb-4">
        <p className="text-gray-700 dark:text-gray-300">
          Tema saat ini: <span className="font-medium">{theme}</span>
        </p>
        {systemPreference && (
          <p className="text-gray-700 dark:text-gray-300">
            Preferensi sistem: <span className="font-medium">{systemPreference}</span>
          </p>
        )}
      </div>
      
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
      >
        Beralih ke tema {isDark ? 'terang' : 'gelap'}
      </button>
    </div>
  );
}

// 2. Menggunakan variabel CSS untuk styling
function CSSVariableComponent() {
  return (
    <div style={{
      backgroundColor: 'rgb(var(--bg-primary))',
      color: 'rgb(var(--text-primary))',
      padding: '1rem',
      borderRadius: '0.5rem',
      border: '1px solid rgb(var(--border-color))'
    }}>
      <h3 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
        Komponen dengan Variabel CSS
      </h3>
      <p style={{ color: 'rgb(var(--text-secondary))' }}>
        Komponen ini menggunakan variabel CSS untuk styling yang responsif terhadap tema.
      </p>
      <button style={{
        backgroundColor: 'rgb(var(--button-primary-bg))',
        color: 'rgb(var(--button-primary-text))',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        border: 'none',
        marginTop: '1rem'
      }}>
        Tombol Utama
      </button>
    </div>
  );
}

// 3. Menggunakan Tailwind CSS dengan dark mode
function TailwindComponent() {
  return (
    <div className="p-4 bg-light-bg-primary dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary rounded-lg border border-light-border dark:border-dark-border">
      <h3 className="text-lg font-semibold mb-2">
        Komponen dengan Tailwind CSS
      </h3>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        Komponen ini menggunakan Tailwind CSS dengan dark mode untuk styling yang responsif terhadap tema.
      </p>
      <div className="flex space-x-2">
        <button className="px-3 py-1 bg-primary-blue dark:bg-primary-darkBlue text-white rounded">
          Tombol Primer
        </button>
        <button className="px-3 py-1 bg-white dark:bg-gray-800 text-primary-blue dark:text-blue-300 border border-primary-blue dark:border-blue-500 rounded">
          Tombol Sekunder
        </button>
      </div>
    </div>
  );
}

// 4. Komponen kartu yang responsif terhadap tema
function ThemeCard({ title, description, icon }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl">
      <div className="flex items-center mb-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-medium transition-colors">
          Pelajari lebih lanjut &rarr;
        </a>
      </div>
    </div>
  );
}

// 5. Komponen form dengan tema
function ThemeForm() {
  return (
    <form className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Form dengan Tema
      </h2>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
          Nama
        </label>
        <input 
          type="text" 
          id="name" 
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          placeholder="Masukkan nama"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
          Email
        </label>
        <input 
          type="email" 
          id="email" 
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          placeholder="Masukkan email"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
          Pesan
        </label>
        <textarea 
          id="message" 
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          placeholder="Masukkan pesan"
        ></textarea>
      </div>
      
      <div className="flex items-center mb-4">
        <input 
          type="checkbox" 
          id="remember" 
          className="h-4 w-4 text-blue-500 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <label htmlFor="remember" className="ml-2 text-gray-700 dark:text-gray-300">
          Ingat saya
        </label>
      </div>
      
      <button 
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        Kirim
      </button>
    </form>
  );
}

// Export semua komponen contoh
export {
  ThemeAwareComponent,
  CSSVariableComponent,
  TailwindComponent,
  ThemeCard,
  ThemeForm
};