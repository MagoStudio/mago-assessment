module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				dark: { 500: "#0D0D0DE5", 400: "#1A1A1A", 300: "#575757" },
				primary: "#4C3095",
				light: "#D1D1C9",
			},
		},
	},
	plugins: [],
};
