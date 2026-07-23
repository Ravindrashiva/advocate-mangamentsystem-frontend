/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#2563EB",
        purple: "#7C3AED",
        gold: "#FBBF24",
        emerald: "#10B981",
        cyan: "#06B6D4",
        orange: "#F97316",
        pink: "#EC4899",
        danger: "#EF4444",
        bgsoft: "#F4F7FE",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Segoe UI'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(30,58,138,0.08)",
      },
    },
  },
  plugins: [],
};
