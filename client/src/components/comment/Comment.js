import React from "react";
import { Link } from "react-router-dom";

// Util
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	comment: {
		maxWidth: "600px",
		margin: "0 auto",
	},
	date: {
		fontStyle: "italic",
		marginLeft: "auto",
	},
}));

const Comment = ({ comment }) => {
	const classes = useStyles();
	dayjs.extend(relativeTime);
	return (
		<Card className={classes.comment} variant="outlined">
			<Box p={2}>
				<Box display="flex">
					<MuiLink
						onClick={(e) => e.stopPropagation()}
						component={Link}
						to={`/profile/${comment.username.username}`}
					>
						<Avatar
							alt={comment.username.username}
							src={comment.username.imageUrl}
						/>
					</MuiLink>
					<Box flexDirection="column" ml={2} flexGrow="1">
						<Box mb={1}>
							<Box display="flex">
								<MuiLink
									onClick={(e) => e.stopPropagation()}
									component={Link}
									to={`/profile/${comment.username.username}`}
									color="secondary"
									variant="subtitle1"
								>
									@{comment.username.username}
								</MuiLink>
								<Typography component="p" className={classes.date}>
									{dayjs(comment.createdAt).fromNow()}
								</Typography>
							</Box>
						</Box>
						<Box mb={1}>
							{/* <Box display="flex">
								<Typography variant="subtitle2" component="p">
									{fact.question}
								</Typography>
							</Box> */}
							<Typography variant="body2" component="p">
								{comment.body}
							</Typography>
						</Box>
						{/*  */}
					</Box>
				</Box>
			</Box>
		</Card>
	);
};

export default Comment;
