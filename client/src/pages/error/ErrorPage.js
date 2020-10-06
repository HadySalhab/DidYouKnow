import React from "react";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const ErrorPage = () => {
	return (
		<Grid
			container
			spacing={0}
			alignItems="center"
			justify="center"
			style={{ minHeight: "100vh" }}
		>
			<Grid item xs={12}>
				<Typography color="textSecondary" component="p">
					Did You
					<Box component="span" className="secondary-txt-color">
						Error
					</Box>
					?
				</Typography>
			</Grid>
		</Grid>
	);
};

export default ErrorPage;
