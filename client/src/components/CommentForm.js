import React from "react";

// MUI
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	form: {
		flexGrow: "1",
	},
	input: {},
	submit: {},
}));

const CommentForm = ({ user, comment, onCommentChange, error = {} }) => {
	const classes = useStyles();
	return (
		<Card className={classes.comment} variant="outlined">
			<Box p={2}>
				<Box display="flex">
					<Box mt={2}>
						<Avatar alt={user.username} src={user.imageUrl} />
					</Box>
					<form className={classes.form}>
						<Box flexDirection="column" ml={2}>
							<Box mb={1}>
								<TextField
									className={classes.input}
									fullWidth
									id="comment"
									name="comment"
									type="text"
									label="Comment"
									multiline
									rows="3"
									error={error.comment ? true : false}
									helperText={error.comment}
									value={comment}
									onChange={onCommentChange}
								/>
							</Box>
							<Box display="flex" flexDirection="row-reverse" flexGrow="1">
								<Button
									disabled={!comment}
									className={classes.submit}
									type="submit"
								>
									Submit
								</Button>
							</Box>
						</Box>
					</form>
				</Box>
			</Box>
		</Card>
	);
};

export default CommentForm;
