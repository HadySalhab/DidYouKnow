import React, { Fragment } from "react";

// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
}));

const AddFact = ({
	question,
	answer,
	onAddClick,
	onQuestionChange,
	onAnswerChange,
	onDismiss,
	onSubmit,
	error = {},
	open,
}) => {
	const classes = useStyles();
	return (
		<Fragment>
			<Box
				fullwidth="true"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<IconButton color="default" onClick={onAddClick}>
					<AddCircleOutlineIcon fontSize="large" />
				</IconButton>
			</Box>

			<Dialog open={open} fullwidth="true" maxWidth="sm">
				<DialogTitle>Add New Fact</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							name="question"
							type="text"
							label="Question"
							value={question}
							onChange={onQuestionChange}
							placeholder="Fact Question"
							className={classes.textField}
							error={error.question ? true : false}
							helperText={error.question}
							fullWidth
						/>
						<TextField
							name="answer"
							type="text"
							label="Answer"
							value={answer}
							onChange={onAnswerChange}
							placeholder="Fact Answer"
							className={classes.textField}
							error={error.answer ? true : false}
							helperText={error.answer}
							fullWidth
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={onDismiss} color="primary">
						Cancel
					</Button>
					<Button onClick={onSubmit} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

export default AddFact;
