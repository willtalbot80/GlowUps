/** @type {import('tailwindcss').Config} */
module.exports = {
  // Purge unused styles in production; scans all JS/JSX source files
  purge: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1ED',
        beige: '#E8DCC8',
        gold: '#D4AF37',
        copper: '#B87333',
        bronze: '#8B6F47',
      },
      borderRadius: {
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  variants: {},
  plugins: [],
};