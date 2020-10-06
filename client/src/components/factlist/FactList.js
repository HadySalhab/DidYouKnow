import React from "react";

// MUI
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Components
import FactListItem from "./FactListItem";

const useStyles = makeStyles((theme) => ({}));

const FactList = ({ facts, loading, error, onFactClick }) => {
	const classes = useStyles();
	return (
		<div>
			{loading && (
				<Box display="flex" justifyContent="center" alignItems="center">
					<CircularProgress
						color="secondary"
						size={30}
						className={classes.progress}
					/>
				</Box>
			)}
			{error && <p>error</p>}
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
