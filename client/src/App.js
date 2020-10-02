import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// MUI
import Container from "@material-ui/core/Container";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import BrandPage from "./pages/BrandPage";
import ErrorPage from "./pages/ErrorPage";

// Utils
import themeObject from "./utils/theme";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {
	API_BASE_URL,
	NETWORK_TIME_OUT,
	LOCALSTORAGE_TOKEN_KEY,
} from "./utils/constants";
import { getErrorMessageFromError } from "./utils/functions";

// Redux
import { connect } from "react-redux";
import {
	logoutUser,
	getAuthenticatedUserDetails,
	setUserAuthenticated,
} from "./redux/actions/userActions";

const theme = createMuiTheme(themeObject);
axios.defaults.timeout = NETWORK_TIME_OUT;
axios.defaults.baseURL = API_BASE_URL;

function App({
	authUser,
	logoutUser,
	getAuthenticatedUserDetails,
	setUserAuthenticated,
}) {
	const [isGettingUserDetailsLoading, setGettingUserDetailsLoading] = useState(
		false
	);
	const [gettinUserDetailsError, setGettingUserDetailsError] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
		if (token) {
			const decodedToken = jwtDecode(token);
			if (decodedToken.exp * 1000 < Date.now()) {
				logoutUser();
				window.location.href = "/login";
			} else {
				setUserAuthenticated();
				axios.defaults.headers.common["Authorization"] = token;
			}
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const fetchAuthUserDetails = async () => {
			setGettingUserDetailsError(null);
			setGettingUserDetailsLoading(true);
			try {
				await getAuthenticatedUserDetails();
				setTimeout(() => {
					setGettingUserDetailsLoading(false);
				}, [1000]);
			} catch (error) {
				setGettingUserDetailsLoading(false);
				setGettingUserDetailsError(getErrorMessageFromError(error));
			}
		};
		if (authUser.isAuthenticated) {
			fetchAuthUserDetails();
		}

		// eslint-disable-next-line
	}, [authUser.isAuthenticated]);

	const render = () => {
		if (isGettingUserDetailsLoading) {
			return <BrandPage />;
		}
		if (gettinUserDetailsError) {
			return <ErrorPage />;
		} else {
			return (
				<BrowserRouter>
					<Container maxWidth="md">
						<Switch>
							<Route exact path="/" component={LandingPage} />
							<Route exact path="/login" component={LoginPage} />
						</Switch>
					</Container>
				</BrowserRouter>
			);
		}
	};

	return <MuiThemeProvider theme={theme}>{render()}</MuiThemeProvider>;
}

const mapStateToProps = (state) => ({
	authUser: state.authUser,
});

const mapActionsToProps = {
	logoutUser,
	getAuthenticatedUserDetails,
	setUserAuthenticated,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
