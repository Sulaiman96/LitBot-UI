/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          richnavy: '#0A0E2A',
          cyberteal: '#0FF6E1',
          oceanblue: '#126DFF',
          frostwhite: '#F1F5F9',
          dimgrey: '#64748B',
          charcoalBlue: '#1E293B',
          indigobold: '#312E81',
          slate: '#475569',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          heading: ['Space Grotesk', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };