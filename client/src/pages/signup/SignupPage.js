import React from "react";

// MUI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Image
import landingImage from "../../assets/landing-image.png";

// Component
import SignupFormContainer from "../../components/signup/SignupFormContainer";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	image: {
		width: "100%",
		height: "100%",
	},
}));

const SignupPage = () => {
	const classes = useStyles();

	return (
		<Grid
			container
			spacing={0}
			alignItems="center"
			justify="center"
			style={{ minHeight: "100vh" }}
		>
			<Grid item xs="auto" md={6}>
				<Hidden only={["xs", "sm"]}>
					<img
						alt="Question Mark"
						className={classes.image}
						src={landingImage}
					/>
				</Hidden>
			</Grid>

			<Grid item xs={12} md={6}>
				<SignupFormContainer />
			</Grid>
		</Grid>
	);
};

export default SignupPage;
