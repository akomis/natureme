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
		fontFamily: { serif: ["Mynerve", "cursive"] },
		extend: {
			colors: {
				jasmine: "#F4E8E1",
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: { themes: ["pastel"] },
};
export default config;
