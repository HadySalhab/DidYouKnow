import React from "react";
import { Route, Switch } from "react-router-dom";

// Page
import SignupPage from "./SignupPage";
import DataPage from "./DataPage";

import { connect } from "react-redux";

const LandingPage = ({ isAuthenticated, history }) => {
	const getMainPage = (routerProps) => {
		if (isAuthenticated) {
			return <DataPage {...routerProps} />;
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
