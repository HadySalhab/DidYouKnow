import React, { useEffect, useState } from "react";

// Components
import FactList from "./FactList";

// Util
import { getErrorMessageFromError } from "../utils/functions";

// Redux
import { getProfile } from "../redux/actions/userActions";
import { connect } from "react-redux";

const ProfileFactsContainer = ({ profileFacts, getProfile, match }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProfile = async (username) => {
			setLoading(true);
			setError(null);
			try {
				await getProfile(username);
				setLoading(false);
			} catch (getProfileError) {
				setLoading(false);
				setError(getErrorMessageFromError(getProfileError));
			}
		};
		fetchProfile(match.params.username);
	}, []);
	return <FactList facts={profileFacts} loading={loading} error={error} />;
};

const mapStateToProps = (state) => ({
	profileFacts: state.facts.profileFacts,
	authUser: state.authUser,
});
const mapActionsToProps = {
	getProfile,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(ProfileFactsContainer);
