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
      },
      fontFamily: { serif: ["Mynerve", "cursive"] },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: { themes: ["pastel"] },
};
export default config;
