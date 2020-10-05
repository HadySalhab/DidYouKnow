import React, { Fragment } from "react";

// Redux
import { connect } from "react-redux";

// Components
import Profile from "./Profile";

const UserProfileContainer = ({ profile }) => {
	return <Fragment>{profile && <Profile user={profile} />}</Fragment>;
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps)(UserProfileContainer);
