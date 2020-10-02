import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// MUI
import Container from "@material-ui/core/Container";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Utils
import themeObject from "./utils/theme";

const theme = createMuiTheme(themeObject);

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Container maxWidth="md">
							<Route exact path="/" component={HomePage} />
							<Route exact path="/login" component={LoginPage} />
						</Container>
					</Switch>
				</BrowserRouter>
			</div>
		</MuiThemeProvider>
	);
}

export default App;
