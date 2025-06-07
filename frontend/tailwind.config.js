/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Georgia", "serif"],
        decorative: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        text: "#222",
      },
      maxWidth: {
        content: "800px",
      },
    },
  },
  plugins: [],
};
