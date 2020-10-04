import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// MUI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// Utils
import _ from "lodash";

// Component
import FactListContainer from "../components/FactListContainer";

// Redux
import { connect } from "react-redux";
import { getAuthenticatedUserDetails } from "../redux/actions/userActions";

const DataPage = ({ getAuthenticatedUserDetails, authUser, history }) => {
	useEffect(() => {
		if (authUser.isAuthenticated) {
			getAuthenticatedUserDetails();
		} else {
			history.push("/");
		}
		// eslint-disable-next-line
	}, []);

	const render = () => {
		if (!_.isEmpty(authUser.authUserData)) {
			return (
				<Grid container spacing={4}>
					<Grid item xs={12} md={8}>
						<Switch>
							<Route exact path="/" component={FactListContainer} />
							<Route
								exact
								path="/facts/:factId"
								render={() => <div>Single Fact</div>}
							/>
							<Route
								exact
								path="/profile/:username"
								render={() => <div>Single Profile</div>}
							/>
						</Switch>
					</Grid>
					<Grid item xs="auto" md={4}>
						<Hidden only={["xs", "sm"]}>Profile</Hidden>
					</Grid>
				</Grid>
			);
		} else {
			return <Fragment />;
		}
	};

	return render();
};

const mapStateToProps = (state) => ({
	authUser: state.authUser,
});

const mapActionsToProps = {
	getAuthenticatedUserDetails,
};

export default connect(mapStateToProps, mapActionsToProps)(DataPage);
