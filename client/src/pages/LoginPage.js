import React from "react";

// MUI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Image
import landingImage from "../assets/landing-image.png";

// Page
import LoginFormContainer from "../components/LoginFormContainer";

// Redux
import { connect } from "react-redux";

// Util
import _ from "lodash";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	image: {
		width: "100%",
		height: "100%",
	},
}));

const LoginPage = ({ authUser, history }) => {
	const classes = useStyles();

	useEffect(() => {
		if (!_.isEmpty(authUser)) {
			history.push("/");
		}
		// eslint-disable-next-line
	}, [authUser]);

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
				<LoginFormContainer />
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	authUser: state.user.authUser,
});

export default connect(mapStateToProps, null)(LoginPage);
