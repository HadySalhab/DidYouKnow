import React, { Fragment } from "react";

// Redux
import { connect } from "react-redux";
import AuthProfileContainer from "./AuthProfileContainer";

// Components
import Profile from "./Profile";

const UserProfileContainer = ({ authUser, profile, match }) => {
	const isAuthUser = match.params.username === authUser.authUserData.username;

	return (
		<Fragment>
			{isAuthUser ? (
				<AuthProfileContainer />
			) : (
				profile && <Profile user={profile} />
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	authUser: state.authUser,
});

export default connect(mapStateToProps, null)(UserProfileContainer);
