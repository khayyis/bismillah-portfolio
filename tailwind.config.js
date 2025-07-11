/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Mengaktifkan dark mode berbasis class
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2563EB',
          darkBlue: '#1E40AF',
          lightBlue: '#3B82F6',
        },
        secondary: {
          white: '#FFFFFF',
          lightGray: '#F8FAFC',
          mediumGray: '#E2E8F0',
          darkGray: '#64748B',
        },
        accent: {
          brightBlue: '#0EA5E9',
        },
        dark: {
          bg: {
            primary: '#111827', // gray-900
            secondary: '#1F2937', // gray-800
          },
          text: {
            primary: '#F9FAFB', // gray-50
            secondary: '#E5E7EB', // gray-200
          },
          border: '#374151', // gray-700
        },
        light: {
          bg: {
            primary: '#F9FAFB', // gray-50
            secondary: '#F3F4F6', // gray-100
          },
          text: {
            primary: '#1F2937', // gray-800
            secondary: '#4B5563', // gray-600
          },
          border: '#E5E7EB', // gray-200
        },
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': '48px',
        'h1': '36px',
        'h2': '24px',
        'body': '16px',
        'caption': '14px',
      },
      lineHeight: {
        'hero': '1.1',
        'h1': '1.2',
        'h2': '1.3',
        'body': '1.6',
        'caption': '1.4',
      },
      fontWeight: {
        hero: '700',
        heading: '600',
        body: '400',
        caption: '500',
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '96': '96px',
        '128': '128px',
      },
      borderRadius: {
        DEFAULT: '6px',
        'card': '8px',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'card-dark': '0 4px 6px rgba(0, 0, 0, 0.2)',
      },
      maxWidth: {
        'container': '1200px',
      },
      screens: {
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1024px',
        'large': '1200px',
      },
    },
  },
  plugins: [],
}