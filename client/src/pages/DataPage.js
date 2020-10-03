import React from "react";

// MUI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// Component
import FactListContainer from "../components/FactListContainer";

const DataPage = () => {
	return (
		<Grid container spacing={4}>
			<Grid item xs={12} md={8}>
				<FactListContainer />
			</Grid>
			<Grid item xs="auto" md={4}>
				<Hidden only={["xs", "sm"]}>Profile</Hidden>
			</Grid>
		</Grid>
	);
};

export default DataPage;
