import React from "react";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	appBar: {
		backgroundColor: "#fff",
	},
}));
const Navbar = () => {
	const classes = useStyles();
	return (
		<AppBar className={classes.appBar} position="fixed">
			<Toolbar>
				<Container maxWidth="md"></Container>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
