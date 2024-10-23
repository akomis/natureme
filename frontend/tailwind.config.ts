import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        jasmine: "#F4E8E1",
        nescafeBoi: "#FFECD2",
      },
      fontFamily: {
        serif: ["Mynerve", "cursive"],
        sans: ["LXGW WenKai TC", "sans-serif"],
      },
      animation: {
        "fade-in": "fade-in 1s ease-in-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: { themes: ["pastel"] },
};

export default config;
