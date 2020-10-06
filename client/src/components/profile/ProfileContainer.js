import React, { Fragment, useEffect } from "react";

// Redux
import { connect } from "react-redux";

// Components
import Profile from "./Profile";

const ProfileContainer = ({ authUser, profile }) => {
	const withEdit =
		profile && profile.username === authUser.authUserData.username;

	return (
		<Fragment>
			{profile && <Profile withEdit={withEdit} user={profile} />}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	authUser: state.authUser,
});

export default connect(mapStateToProps, null)(ProfileContainer);
