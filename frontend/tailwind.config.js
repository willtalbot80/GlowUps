/** @type {import('tailwindcss').Config} */
// Updated by demo/design-update PR
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1ED',
        beige: '#E8DCC8',
        gold: '#D4AF37',
        copper: '#B87333',
        bronze: '#8B6F47',
      },
      fontFamily: {
        heading: ['Merriweather', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
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