/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        title: "#dD847E",
      },
      keyframes: {
        "fade-out": {
          "0%": { opacity: 1, zIndex: 1 },
          "90%": { opacity: 1, zIndex: 1 },
          "100%": { opacity: 0, zIndex: -1 },
        },
      },
      animation: {
        "fade-out": "fade-out 3s",
      },
    },
  },
  plugins: [],
};
