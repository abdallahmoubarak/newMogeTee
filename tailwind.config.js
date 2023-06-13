/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-out": {
          "0%": { opacity: 0, zIndex: 1 },
          "100%": { opacity: 1, zIndex: -10 },
        },
      },
      animation: {
        "fade-out": "fade-out 2s ease-in-out",
      },
    },
  },
  plugins: [],
};
