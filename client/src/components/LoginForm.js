import React from "react";
import { Link } from "react-router-dom";

// MUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	formHeader: {
		fontSize: "2.5rem",
		fontWeight: "Bold",
		textAlign: "center",
		marginBottom: "2rem",
	},
	formPaper: {
		maxWidth: "25rem",
		margin: "0 auto",
	},
	link: {
		fontWeight: "bold",
		color: theme.palette.secondary.dark,
	},
}));

const LoginForm = ({
	email,
	password,
	loading,
	error,
	onEmailChange,
	onPasswordChange,
	onSubmit,
}) => {
	const classes = useStyles();

	return (
		<div>
			<Box style={{ marginBottom: "1rem" }}>
				<Paper variant="outlined" square className={classes.formPaper}>
					<Box p={4}>
						<Typography variant="h1" className={classes.formHeader}>
							Did You{" "}
							<Box component="span" className="secondary-txt-color">
								Know
							</Box>
							?
						</Typography>
						<form
							noValidate
							autoComplete="off"
							onSubmit={(e) => {
								e.preventDefault();
								onSubmit();
							}}
						>
							<TextField
								className={classes.textField}
								fullWidth
								id="email"
								name="email"
								type="email"
								label="Email Address"
								variant="outlined"
								value={email}
								error={error.email ? true : false}
								helperText={error.email}
								onChange={onEmailChange}
							/>
							<TextField
								className={classes.textField}
								fullWidth
								id="password"
								name="password"
								type="password"
								label="Password"
								variant="outlined"
								error={error.password ? true : false}
								helperText={error.password}
								value={password}
								onChange={onPasswordChange}
							/>
							<Box my="1rem">
								<Button
									type="submit"
									variant="contained"
									color="secondary"
									disabled={loading}
									className={classes.formSubmit}
									fullWidth
								>
									Login
									{loading && (
										<CircularProgress
											color="secondary"
											size={30}
											className={classes.progress}
										/>
									)}
								</Button>
							</Box>
						</form>
					</Box>
				</Paper>
			</Box>
			<Paper variant="outlined" square className={classes.formPaper}>
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

export default LoginForm;
