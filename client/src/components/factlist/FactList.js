import React from "react";

// MUI
import Box from "@material-ui/core/Box";

// Components
import FactListItem from "./FactListItem";

const FactList = ({ facts, onFactClick }) => {
	return (
		<div>
			{facts &&
				facts.map((fact) => (
					<Box key={fact.id} mb={1}>
						<FactListItem fact={fact} onFactClick={onFactClick} />
					</Box>
				))}
		</div>
	);
};

export default FactList;
