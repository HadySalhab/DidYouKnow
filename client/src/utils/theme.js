const primaryMainColor = "#323330";
const primaryLightColor = "#5b5b59";
const secondaryLightColor = "#e6bc3b";
const secondaryMainColor = "#e0ac0a ";
const secondaryDarkColor = "#e09a0c ";

export default {
	palette: {
		primary: {
			light: primaryLightColor,
			main: primaryMainColor,
			contrastText: "#fff",
		},
		secondary: {
			light: secondaryLightColor,
			main: secondaryMainColor,
			dark: secondaryDarkColor,
			contrastText: "#fff",
		},
	},
	// https://stackoverflow.com/questions/56897838/getting-a-error-typeerror-color-charat-is-not-a-function-in-c-node-modul
	spreadThis: {
		appBar: {
			backgroundColor: "#fff",
			marginBottom: "1rem",
		},
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
		profile: {
			marginBottom: "16px",
			"& .image-wrapper": {
				textAlign: "center",
				position: "relative",
				"& button": {
					position: "absolute",
					top: "80%",
					left: "70%",
				},
			},
			"& .profile-image": {
				width: 150,
				height: 150,
				objectFit: "cover",
				maxWidth: "100%",
				borderRadius: "50%",
			},
			"& .profile-details": {
				textAlign: "center",
				"& span, svg": {
					verticalAlign: "middle",
				},
			},
			"& hr": {
				border: "none",
				margin: "0 0 10px 0",
			},
			"& svg.button": {
				"&:hover": {
					cursor: "pointer",
				},
			},
		},
	},
};
