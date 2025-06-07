/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-lora)", "Georgia", "serif"],
        heading: ["var(--font-coustard)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "780px",
      },
    },
  },
  plugins: [],
};
