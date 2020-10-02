import React from "react";
import { Link } from "react-router-dom";

// MUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	formHeader: {
		fontSize: "2.5rem",
		fontWeight: "Bold",
		textAlign: "center",
		marginBottom: "2rem",
	},
	signupFormPaper: {
		maxWidth: "25rem",
		margin: "0 auto",
	},
	link: {
		fontWeight: "bold",
		color: theme.palette.secondary.dark,
	},
}));

const SignupForm = () => {
	const classes = useStyles();
	return (
		<div>
			<Box style={{ marginBottom: "1rem" }}>
				<Paper variant="outlined" square className={classes.signupFormPaper}>
					<Box p={4}>
						<Typography variant="h1" className={classes.formHeader}>
							Did You{" "}
							<Box component="span" className="secondary-txt-color">
								Know
							</Box>
							?
						</Typography>
						<form noValidate autoComplete="off">
							<TextField
								className={classes.textField}
								fullWidth
								id="email"
								label="Email Address"
								variant="outlined"
							/>
							<TextField
								className={classes.textField}
								fullWidth
								id="password"
								label="Password"
								variant="outlined"
							/>
							<Box my="1rem">
								<Button
									type="submit"
									variant="contained"
									color="secondary"
									className={classes.formSubmit}
									fullWidth
								>
									SignUp
								</Button>
							</Box>
						</form>
					</Box>
				</Paper>
			</Box>
			<Paper variant="outlined" square className={classes.signupFormPaper}>
				<Box p={2}>
					<Typography align="center" color="textSecondary" component="p">
						Don't have an account?{" "}
						<Link className={classes.link} to="/">
							Signup
						</Link>
					</Typography>
				</Box>
			</Paper>
		</div>
	);
};

export default SignupForm;
