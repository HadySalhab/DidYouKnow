import React from "react";

// MUI
import Box from "@material-ui/core/Box";

// Components
import FactListItem from "./FactListItem";

const FactList = ({ facts }) => {
	return (
		<div>
			{facts.map((fact) => (
				<Box mb={1}>
					<FactListItem />
				</Box>
			))}
		</div>
	);
};

export default FactList;
