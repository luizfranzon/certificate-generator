/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      backgroundImage: {
        app: "url(/background.png)"
      },
      colors: {
        blue: {
          200: "#6AC9FF",
          500: "#00A3FF"
        },
        gray: {
          200: "#C4C4CC",
          500: "#202024",
          800: "#121214"
        }
      }
    },
  },
  plugins: [],
}
