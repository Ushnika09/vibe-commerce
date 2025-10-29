/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral / Base
        background: '#F5F5F5',
        surface: '#E0E0E0',
        navbar: '#B0B0B0',
        textPrimary: '#333333',
        textSecondary: '#666666',
        
        // Primary / Brand
        primary: {
          DEFAULT: '#2AA198',
          hover: '#1F7A75',
          light: '#3DB3A9',
          dark: '#1A6660',
        },
        
        // Accents
        link: '#4FA3E1',
        success: '#81C784',
        warning: '#E57373',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        card: '1rem',
        button: '0.5rem',
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.08)',
        navbar: '0 2px 4px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};