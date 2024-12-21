/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/admin/**/*.{html,js}",
    "./src/admin/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [],
}