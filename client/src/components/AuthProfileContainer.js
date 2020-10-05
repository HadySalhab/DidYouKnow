import React from "react";

// Components
import Profile from "./Profile";

// Redux
import { connect } from "react-redux";

import _ from "lodash";

const AuthProfileContainer = ({ authUser }) => {
	return (
		<Profile
			user={_.pick(authUser.authUserData, [
				"website",
				"username",
				"location",
				"bio",
				"imageUrl",
				"createdAt",
			])}
		/>
	);
};

const mapStateToProps = (state) => ({
	authUser: state.authUser,
});
export default connect(mapStateToProps, null)(AuthProfileContainer);
