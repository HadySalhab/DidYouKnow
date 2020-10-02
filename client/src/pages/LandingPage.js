import React, { useEffect, useRef } from "react";
import { Route, Switch } from "react-router-dom";

import SignupPage from "./SignupPage";

import { connect } from "react-redux";

// Util
import _ from "lodash";

const LandingPage = ({ user, history }) => {
	const getMainPage = (routerProps) => {
		if (_.isEmpty(user)) {
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
	user: state.user,
});

export default connect(mapStateToProps, null)(LandingPage);
