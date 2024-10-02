/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
      },
      keyframes: {
        rotate: {
          "0%, 100%": { backgroundColor: "#F09" },
          "50%": { backgroundColor: "rgba(255,255,255,.075)" },
        },
        spinning: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spinDelay: "rotate 2.5s ease infinite",
        rotate: "spinning 8s linear infinite",
      },
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};
