/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#ffffff',
          card: '#f5f5f5',
          nested: '#fafafa',
        },
      },
    },
  },
  plugins: [],
};
