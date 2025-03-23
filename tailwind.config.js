/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2C2C2C',
        secondary: '#9A8A78',
        text: {
          DEFAULT: '#4A4A4A',
          light: '#6B6B6B'
        },
        background: {
          light: '#F9F7F5'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],

}