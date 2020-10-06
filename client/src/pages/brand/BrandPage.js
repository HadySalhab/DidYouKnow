import React from "react";

import landingImage from "../../assets/landing-image.png";

// MUI
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

import ReactAnimatedEllipsis from "react-animated-ellipsis";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	image: {
		display: "block",
		width: "40rem",
		margin: "0 auto",

		[theme.breakpoints.down("sm")]: {
			width: "25rem",
		},
	},
	loading: {
		fontSize: "2rem",
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.5rem",
		},
	},
}));

const BrandPage = () => {
	const classes = useStyles();
	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			className={classes.centerFlex}
		>
			<img alt="logo" className={classes.image} src={landingImage} />
			<Typography
				align="center"
				color="textSecondary"
				variant="h2"
				className={classes.loading}
			>
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
		</Box>
	);
};

export default BrandPage;
