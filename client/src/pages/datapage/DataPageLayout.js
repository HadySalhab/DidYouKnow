import React from "react";

// MUI
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const DataPageLayout = ({ factComponent, profileComponent }) => {
	const smallerThanMediumScreen = useMediaQuery((theme) =>
		theme.breakpoints.down("sm")
	);
	return (
		<Grid
			fullwidth="true"
			container
			spacing={2}
			direction={smallerThanMediumScreen ? "column-reverse" : "row"}
		>
			<Grid item xs={12} md={7}>
				{factComponent}
			</Grid>
			<Grid item xs={12} md={5}>
				{profileComponent}
			</Grid>
		</Grid>
	);
};

export default DataPageLayout;
