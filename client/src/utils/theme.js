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
		authError: {
			color: "red",
			fontSize: "0.8rem",
			marginTop: 10,
		},
		centerFlex: {
			position: "absolute",
			top: "0%",
			left: "0%",
			width: "100%",
			height: "100vh",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		},
	},
};
