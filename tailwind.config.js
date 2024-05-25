/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			outfit: ["Outfit"],
			sans: ["Euclid Circular A", "-apple-system", "BlinkMacSystemFont"],
			serif: ["Euclid Circular A", "Georgia", "Cambria", "serif"],
			mono: ["Euclid Circular A", "SFMono-Regular", "Menlo", "mono"],
			body: ["Euclid Circular A", "sans-serif"],
		},
		extend: {
			colors: {
				primary: "#16A887",
				primaryBtn: "#00EE16",
				secondary: "#5630FF",
				darkGray: "#333333",

				blue: {
					cool: "#e6ebff",
					cool2: "#e0e7ff",
					navy: "#061938",
					ink: "#242582",
					ocean: "#F8FAFB",
					offBlue: "#8798AD",
					bodyLighter: "#778CA2",
				},
				grey: {
					offWhite: "#F2F2F2",
					lightGray: "#B4BAC3",
					graySuit: "#6A7588",
					dark: "#333333",
					title: "#2B3A4B",
					another: "#F4F6F9",
				},
			},
			fontSize: {
				xs: "0.75rem",
				sm: "0.875rem",
				base: "1rem",
				lg: "1.125rem",
				xl: "1.5rem",
				"2xl": "2.5rem",
				"4xl": "4rem",
			},
			boxShadow: {
				primaryBtnShadow: "0 5px #00a69b",
				card: "0px 4px 200px #F4F6F9",
			},
			backgroundImage: {
				bg: 'url(/src/assets/images/svg/bg.svg)',
				bgLeft: 'url(/src/assets/images/svg/bg-left.svg)',
				bgRight: 'url(/src/assets/images/svg/bg-right.svg)',
				chevronDown: `url(/src/assets/svg/chevron-down.svg)`,
				blob: `url(/src/assets/svg/home/blob.svg)`,
			},
			backgroundPosition: {
				"right-95": "95%",
			},
			borderRadius: {
				8: "8px",
			},
			maxWidth: {
				default: "1078px",
				760: "760px",
				670: "670px",
				544: "544px",
				530: "530px",
				508: "508px",
				473: "473px",
				462: "462px",
				450: "450px",
				249: "249px",
			},
		},
	},
	plugins: [],
};
