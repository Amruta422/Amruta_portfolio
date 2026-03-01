/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        serif: ["Fraunces", "serif"],
      },
      keyframes: {
        fadeUp: {
          to: { opacity: "1", transform: "translateY(0)" },
        },
        floatA: {
          "0%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(8px, -6px, 0) scale(1.05)" },
          "100%": { transform: "translate3d(2px, 4px, 0) scale(0.98)" },
        },
        floatB: {
          "0%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(-6px, 6px, 0) scale(1.04)" },
          "100%": { transform: "translate3d(-2px, -4px, 0) scale(0.98)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 650ms cubic-bezier(0.2, 0.65, 0.25, 1) forwards",
        floatA: "floatA 10s ease-in-out infinite",
        floatB: "floatB 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
