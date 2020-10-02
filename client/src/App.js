import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// MUI
import Container from "@material-ui/core/Container";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

// Utils
import themeObject from "./utils/theme";
import axios from "axios";
import { API_BASE_URL, NETWORK_TIME_OUT } from "./utils/constants";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

const theme = createMuiTheme(themeObject);
axios.defaults.timeout = NETWORK_TIME_OUT;
axios.defaults.baseURL = API_BASE_URL;

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<BrowserRouter>
					<Container maxWidth="md">
						<Switch>
							<Route exact path="/" component={LandingPage} />
							<Route exact path="/login" component={LoginPage} />
						</Switch>
					</Container>
				</BrowserRouter>
			</Provider>
		</MuiThemeProvider>
	);
}

export default App;
