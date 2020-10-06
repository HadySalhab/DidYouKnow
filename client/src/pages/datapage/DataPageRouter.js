import React, { Fragment, useEffect } from "react";

import { Switch, Route } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { getAuthenticatedUserDetails } from "../../redux/actions/userActions";

// Pages
import AllFactsPageContainer from "./AllFactsPageContainer";
import ProfilePageContainer from "./ProfilePageContainer";
import SingleFactPageContainer from "./SingleFactPageContainer";

const DataPageContainer = ({
	getAuthenticatedUserDetails,
	authUser,
	history,
}) => {
	useEffect(() => {
		if (authUser.isAuthenticated) {
			getAuthenticatedUserDetails();
		} else {
			history.push("/");
		}
		// eslint-disable-next-line
	}, [authUser.isAuthenticated]);

	return (
		<Fragment>
			{authUser.authUserData && (
				<Switch>
					<Route exact path="/" component={AllFactsPageContainer} />
					<Route
						exact
						path="/profile/:username"
						component={ProfilePageContainer}
					/>
					<Route
						exact
						path="/facts/:factId"
						component={SingleFactPageContainer}
					/>
				</Switch>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	authUser: state.authUser,
});

const mapActionsToProps = {
	getAuthenticatedUserDetails,
};

export default connect(mapStateToProps, mapActionsToProps)(DataPageContainer);
