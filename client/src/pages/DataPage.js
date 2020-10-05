import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// MUI
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Utils
import _ from "lodash";

// Component
import AllFactsContainer from "../components/AllFactsContainer";
import AuthProfileContainer from "../components/AuthProfileContainer";

import UserFactsContainer from "../components/UserFactsContainer";
import UserProfileContainer from "../components/UserProfileContainer";

import FactProfileContainer from "../components/FactProfileContainer";
import FactContainer from "../components/FactContainer";

// Redux
import { connect } from "react-redux";
import { getAuthenticatedUserDetails } from "../redux/actions/userActions";

const DataPage = ({ getAuthenticatedUserDetails, authUser, history }) => {
	const smallerThanMediumScreen = useMediaQuery((theme) =>
		theme.breakpoints.down("sm")
	);
	useEffect(() => {
		if (authUser.isAuthenticated) {
			getAuthenticatedUserDetails();
		} else {
			history.push("/");
		}
		// eslint-disable-next-line
	}, [authUser.isAuthenticated]);

	const render = () => {
		if (!_.isEmpty(authUser.authUserData)) {
			return (
				<Grid
					fullwidth="true"
					container
					spacing={2}
					direction={smallerThanMediumScreen ? "column-reverse" : "row"}
				>
					<Grid item xs={12} md={7}>
						<Switch>
							<Route exact path="/" component={AllFactsContainer} />
							<Route exact path="/facts/:factId" component={FactContainer} />
							<Route
								exact
								path="/profile/:username"
								component={UserFactsContainer}
							/>
						</Switch>
					</Grid>
					<Grid item xs={12} md={5}>
						<Switch>
							<Route exact path="/" component={AuthProfileContainer} />
							<Route
								exact
								path="/facts/:factId"
								component={FactProfileContainer}
							/>
							<Route
								exact
								path="/profile/:username"
								component={UserProfileContainer}
							/>
						</Switch>
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
