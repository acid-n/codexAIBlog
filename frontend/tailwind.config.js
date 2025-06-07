/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "serif"],
        decorative: ["var(--font-decorative)", "serif"],
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
