export default {
	up() {},
	down(size) {
		const sizes = {
			xs: "0px",
			sm: "600px",
			md: "960px",
			lg: "1280px",
			xl: "1920px",
		};
		return `@media (max-width: ${sizes[size]})`;
	},
};
