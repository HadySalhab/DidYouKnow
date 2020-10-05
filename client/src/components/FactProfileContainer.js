import React, { Fragment } from "react";

// Redux
import { connect } from "react-redux";

// Components
import AuthProfileContainer from "./AuthProfileContainer";
import Profile from "./Profile";

const FactProfileContainer = ({ profile, authUser }) => {
	const isAuthUser =
		profile && profile.username === authUser.authUserData.username;

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
export default connect(mapStateToProps)(FactProfileContainer);
