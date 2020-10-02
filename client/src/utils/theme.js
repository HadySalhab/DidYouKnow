const primaryMainColor = "#323330";
const secondaryMainColor = "#e0ac0a ";
const secondaryDarkColor = "#e09a0c ";

export default {
	palette: {
		primary: {
			main: primaryMainColor,
			contrastText: "#fff",
		},
		secondary: {
			main: secondaryMainColor,
			dark: secondaryDarkColor,
			contrastText: "#fff",
		},
	},
	// https://stackoverflow.com/questions/56897838/getting-a-error-typeerror-color-charat-is-not-a-function-in-c-node-modul
	spreadThis: {
		textField: {
			margin: "10px auto",
		},
		formSubmit: {
			textAlign: "center",
		},
		progress: {
			position: "absolute",
		},
	},
};
