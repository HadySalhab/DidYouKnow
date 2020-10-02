import React from "react";
import { Route, Switch } from "react-router-dom";

import SignupPage from "./SignupPage";

import { connect } from "react-redux";

const LandingPage = ({ isAuthenticated, history }) => {
	const getMainPage = (routerProps) => {
		if (isAuthenticated) {
			return <h1>authenticated</h1>;
		} else {
			return <SignupPage {...routerProps} />;
		}
	};

	return (
		<Switch>
			<Route
				exact
				path="/"
				render={(routerProps) => getMainPage(routerProps)}
			/>
		</Switch>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.authUser.isAuthenticated,
});

export default connect(mapStateToProps, null)(LandingPage);
