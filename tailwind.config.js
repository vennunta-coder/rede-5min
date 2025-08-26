/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#7c2d12",
          900: "#451a03",
        }
      },
      boxShadow: { brand: "0 6px 0 #7c2d12" },
      borderRadius: { '2xl': '1.25rem' }
    },
  },
  plugins: [],
};
