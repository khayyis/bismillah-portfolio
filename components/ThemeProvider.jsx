'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import themeConfig from '../config/themeConfig';

// Membuat context untuk tema
const ThemeContext = createContext();

// Custom hook untuk mengelola tema
const useThemeManager = () => {
  // Menggunakan nilai default dari themeConfig
  const [theme, setTheme] = useState(themeConfig.mode || 'dark');
  const [systemPreference, setSystemPreference] = useState(null);
  
  // Fungsi untuk mengubah tema
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // Menyimpan preferensi tema di localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  }, [theme]);
  
  // Fungsi untuk mengatur tema berdasarkan preferensi sistem
  const setThemeBySystemPreference = useCallback(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setSystemPreference(prefersDark ? 'dark' : 'light');
    // Hanya terapkan preferensi sistem jika tidak ada tema yang tersimpan
    if (!localStorage.getItem('theme')) {
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);
  
  // Efek untuk memuat tema dari localStorage saat komponen dimuat
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        setThemeBySystemPreference();
      }

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        setSystemPreference(e.matches ? 'dark' : 'light');
        if (!localStorage.getItem('theme')) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        mediaQuery.addListener(handleChange);
      }

      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else {
          mediaQuery.removeListener(handleChange);
        }
      };
    }
  }, [setThemeBySystemPreference]);
  
  // Efek untuk menerapkan kelas tema ke elemen body
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(`theme-${theme}`);
      
      // Tambahkan atribut data-theme untuk Tailwind dark mode
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);
  
  return {
    theme,
    systemPreference,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    setTheme
  };
};

// Hook untuk menggunakan tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider komponen untuk tema
export default function ThemeProvider({ children }) {
  // Menggunakan custom hook untuk mengelola tema
  const themeManager = useThemeManager();
  
  return (
    <ThemeContext.Provider value={themeManager}>
      {children}
    </ThemeContext.Provider>
  );
}