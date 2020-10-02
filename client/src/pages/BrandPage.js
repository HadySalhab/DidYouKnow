import React from "react";

import landingImage from "../assets/landing-image.png";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

import ReactAnimatedEllipsis from "react-animated-ellipsis";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	image: {
		display: "block",
		width: "50rem",
		margin: "0 auto",
	},
}));

const BrandPage = () => {
	const classes = useStyles();
	return (
		<Grid
			container
			spacing={0}
			alignItems="center"
			justify="center"
			style={{ height: "100%" }}
		>
			<Grid item xs={12}>
				<img alt="logo" className={classes.image} src={landingImage} />

				<Typography align="center" color="textSecondary" variant="h2">
					Loading
					<ReactAnimatedEllipsis
						fontSize="inherit"
						marginLeft="5px"
						spacing="0.3rem"
						style={{
							color: "#e0ac0a",
						}}
					/>
				</Typography>
			</Grid>
		</Grid>
	);
};

export default BrandPage;
