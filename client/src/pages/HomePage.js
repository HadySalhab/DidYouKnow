import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

// Page
import SignupPage from "./SignupPage";
import DataPage from "./DataPage";

import { connect } from "react-redux";

const HomePage = ({ isAuthenticated, history }) => {
	const getHomePage = (routerProps) => {
		if (isAuthenticated) {
			return <DataPage {...routerProps} />;
		} else {
			return <SignupPage {...routerProps} />;
		}
	};

	return (
		<Fragment>
			<Switch>
				<Route
					exact
					path="/"
					render={(routerProps) => getHomePage(routerProps)}
				/>
			</Switch>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.authUser.isAuthenticated,
});

export default connect(mapStateToProps, null)(HomePage);
