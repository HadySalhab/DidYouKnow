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
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MuiLink from "@material-ui/core/Link";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	fact: {
		maxWidth: "600px",
		margin: "0 auto",
		"&:hover": {
			cursor: "pointer",
		},
	},
	date: {
		fontStyle: "italic",
		marginLeft: "auto",
	},
	iconButton: {
		padding: 0,
		marginLeft: "5px",
	},
	username: {
		"&:hover": {
			textDecoration: "underline",
		},
	},
}));

const FactListItem = ({ fact, onFactClick }) => {
	const classes = useStyles();
	dayjs.extend(relativeTime);
	return (
		<Card
			className={classes.fact}
			variant="outlined"
			onClick={() => onFactClick(fact)}
		>
			<Box p={2}>
				<Box display="flex">
					<MuiLink
						onClick={(e) => e.stopPropagation()}
						component={Link}
						to={`/profile/${fact.username.username}`}
					>
						<Avatar alt={fact.username.username} src={fact.username.imageUrl} />
					</MuiLink>
					<Box flexDirection="column" ml={2} flexGrow="1">
						<Box mb={1}>
							<Box display="flex">
								<MuiLink
									onClick={(e) => e.stopPropagation()}
									component={Link}
									to={`/profile/${fact.username.username}`}
									color="secondary"
									variant="subtitle1"
								>
									@{fact.username.username}
								</MuiLink>
								<Typography component="p" className={classes.date}>
									{dayjs(fact.createdAt).fromNow()}
								</Typography>
							</Box>
						</Box>
						<Box mb={1}>
							<Box display="flex">
								<Typography variant="subtitle2" component="p">
									{fact.question}
								</Typography>
							</Box>
							<Typography variant="body2" component="p">
								{fact.answer}
							</Typography>
						</Box>
						{/*  */}
						<Box display="flex">
							<Box>
								<Typography variant="body2" component="span">
									{fact.likeCount}
								</Typography>
								<IconButton
									className={classes.iconButton}
									onClick={(e) => {
										e.stopPropagation();
									}}
								>
									<FavoriteIcon />
								</IconButton>
							</Box>

							<Box ml={1}>
								<Typography variant="body2" component="span">
									{fact.commentCount}
								</Typography>
								<IconButton className={classes.iconButton}>
									<ChatIcon />
								</IconButton>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Card>
	);
};

export default FactListItem;
