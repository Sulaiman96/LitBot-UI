/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        taviraj: ['Taviraj', 'serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        neutral: {
          lightest: '#F2F2F2',
          lighter: '#DADADA',
          light: '#B5B5B5',
          DEFAULT: '#858584',
          dark: '#545453',
          darker: '#232322',
          darkest: '#0B0B0A',
        },
        bone: {
          lightest: '#FCFAF8',
          lighter: '#F9F6F2',
          light: '#EAE0D2',
          DEFAULT: '#E1D4C0',
          dark: '#B4A999',
          darker: '#5A544C',
          darkest: '#433F39',
        },
        'outer-space': {
          lightest: '#EAEBEB',
          lighter: '#D5D7D8',
          light: '#6E7478',
          DEFAULT: '#30393F',
          dark: '#262D32',
          darker: '#131619',
          darkest: '#0E1112',
        },
      },
    },
  },
  plugins: [],
} 