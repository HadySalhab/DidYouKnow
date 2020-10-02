import React from "react";
import { Route, Switch } from "react-router-dom";

import SignupPage from "./SignupPage";

import { connect } from "react-redux";

// Util
import _ from "lodash";

const LandingPage = ({ authUser, history }) => {
	const getMainPage = (routerProps) => {
		if (_.isEmpty(authUser)) {
			return <SignupPage {...routerProps} />;
		} else {
			return <h1>authenticated</h1>;
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
	authUser: state.user.authUser,
});

export default connect(mapStateToProps, null)(LandingPage);
