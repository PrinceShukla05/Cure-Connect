/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // Main red shade for primary
        'primary': '#C82333',
        // Optionally, add a lighter and darker variant for hover/focus
        'primary-light': '#e74c3c',
        'primary-dark': '#a71d2a',
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },
  },
  plugins: [],
}