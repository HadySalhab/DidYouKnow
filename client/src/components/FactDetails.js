import React, { Fragment } from "react";

// MUI
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

// Components
import FactListItem from "./FactListItem";
import CommentFormContainer from "./CommentFormContainer";
import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	commentBanner: {
		backgroundColor: theme.palette.secondary.main,
		color: "white",
		padding: "4px",
		maxWidth: "600px",
		margin: "0 auto",
	},
}));
const FactDetails = ({ fact }) => {
	const classes = useStyles();
	return (
		<Fragment>
			{fact && (
				<Fragment>
					<Box mb={2}>
						<FactListItem fact={fact} onFactClick={() => {}} />
					</Box>
					<Box mb={1}>
						<Typography
							align="center"
							variant="subtitle1"
							className={classes.commentBanner}
						>
							Comments{" "}
						</Typography>
					</Box>
					<Box mb={2}>
						<CommentFormContainer />
					</Box>
					{fact.comments.map((comment) => (
						<Box key={comment.id} mb={1}>
							<Comment comment={comment} />
						</Box>
					))}
				</Fragment>
			)}
		</Fragment>
	);
};

export default FactDetails;
