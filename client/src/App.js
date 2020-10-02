import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// MUI
import Container from "@material-ui/core/Container";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Pages
import LandingPage from "./pages/LandingPage";

// Utils
import themeObject from "./utils/theme";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

const theme = createMuiTheme(themeObject);

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<BrowserRouter>
					<Container maxWidth="md">
						<Switch>
							<Route exact path={["/", "/login"]} component={LandingPage} />
						</Switch>
					</Container>
				</BrowserRouter>
			</Provider>
		</MuiThemeProvider>
	);
}

export default App;
