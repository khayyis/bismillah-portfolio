/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
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
            primary: '#111827',
            secondary: '#1F2937',
          },
          text: {
            primary: '#F9FAFB',
            secondary: '#E5E7EB',
          },
          border: '#374151',
        },
        light: {
          bg: {
            primary: '#F9FAFB',
            secondary: '#F3F4F6',
          },
          text: {
            primary: '#1F2937',
            secondary: '#4B5563',
          },
          border: '#E5E7EB',
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