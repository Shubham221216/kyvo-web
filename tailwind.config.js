/** @type {import('tailwindcss').Config} */
import brandColors from './src/theme/brandColors.js'

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          ...brandColors,
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },

      keyframes: {
        'marquee-rtl': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-ltr': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'marquee-rtl': 'marquee-rtl 28s linear infinite',
        'marquee-ltr': 'marquee-ltr 28s linear infinite',
      },
    },
  },
  plugins: [],
}
