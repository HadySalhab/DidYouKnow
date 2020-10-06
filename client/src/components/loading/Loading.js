import React from "react";
// MUI
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
const Loading = () => {
	return (
		<Box fullWith display="flex" justifyContent="center" alignItems="center">
			<CircularProgress color="secondary" />
		</Box>
	);
};

export default Loading;
