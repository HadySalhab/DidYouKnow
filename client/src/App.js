import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// MUI
import Container from "@material-ui/core/Container";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Components
import Navbar from "./components/navbar/Navbar";

// Pages
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import BrandPage from "./pages/brand/BrandPage";
import ErrorPage from "./pages/error/ErrorPage";
import NotFound from "./pages/notfound/NotFound";

// Utils
import themeObject from "./utils/theme";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {
	API_BASE_URL,
	NETWORK_TIME_OUT,
	LOCALSTORAGE_TOKEN_KEY,
} from "./utils/constants";
import _ from "lodash";

// Redux
import { connect } from "react-redux";
import { logoutUser, setUserAuthenticated } from "./redux/actions/userActions";
import store from "./redux/store";

const theme = createMuiTheme(themeObject);
axios.defaults.timeout = NETWORK_TIME_OUT;
axios.defaults.baseURL = API_BASE_URL;

const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = "/login";
		// setUserAuthenticated();
	} else {
		store.dispatch(setUserAuthenticated());
		axios.defaults.headers.common["Authorization"] = token;
	}
}

function App({ authUser, ui }) {
	const shouldRenderNavbar = () =>
		authUser.isAuthenticated && !_.isEmpty(authUser.authUserData);
	return (
		<MuiThemeProvider theme={theme}>
			<Fragment>
				{ui.loading && <BrandPage />}
				{ui.error && <ErrorPage />}
				<BrowserRouter>
					{shouldRenderNavbar() && <Navbar />}
					<Container maxWidth="md">
						<Switch>
							<Route
								exact
								path={["/", "/facts/:factId", "/profile/:username"]}
								component={HomePage}
							/>
							<Route exact path="/login" component={LoginPage} />
							<Route component={NotFound} />
						</Switch>
					</Container>
				</BrowserRouter>
			</Fragment>
		</MuiThemeProvider>
	);
}

const mapStateToProps = (state) => ({
	authUser: state.authUser,
	ui: state.ui,
});

export default connect(mapStateToProps, null)(App);
