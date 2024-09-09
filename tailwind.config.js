/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#001f3f', // Custom dark blue color
      },
      backgroundImage: {
        'dark-3d-gradient': 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5))',
      },
    },
  },
  plugins: [],
}
