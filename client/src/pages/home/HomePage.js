import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

// Page
import SignupPage from "../signup/SignupPage";
import DataPageRouter from "../datapage/DataPageRouter";

// Redux
import { connect } from "react-redux";

const HomePage = ({ isAuthenticated, history }) => {
	const getComponent = (routerProps) => {
		if (routerProps.location.pathname === "/") {
			if (isAuthenticated) {
				return <DataPageRouter {...routerProps} />;
			} else {
				return <SignupPage {...routerProps} />;
			}
		} else {
			return <DataPageRouter {...routerProps} />;
		}
	};

	return (
		<Fragment>
			<Switch>
				<Route
					exact
					path={["/", "/facts/:factId", "/profile/:username"]}
					render={(routerProps) => getComponent(routerProps)}
				/>
			</Switch>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.authUser.isAuthenticated,
});

export default connect(mapStateToProps, null)(HomePage);
