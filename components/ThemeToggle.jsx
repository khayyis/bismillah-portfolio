'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme, systemPreference } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`${styles.themeToggle} p-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400`}
      aria-label={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      title={`Mode saat ini: ${theme}${systemPreference ? ` (preferensi sistem: ${systemPreference})` : ''}`}
    >
      <div className={styles.iconContainer}>
        {/* Icon matahari untuk mode gelap (akan beralih ke mode terang) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.icon} ${styles.sunIcon} ${theme === 'dark' ? styles.active : styles.inactive}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
        
        {/* Icon bulan untuk mode terang (akan beralih ke mode gelap) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.icon} ${styles.moonIcon} ${theme === 'light' ? styles.active : styles.inactive}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
    </button>
  );
}