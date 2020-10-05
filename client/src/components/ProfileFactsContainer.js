import React, { useEffect, useState } from "react";

// Components
import FactList from "./FactList";

// Util
import { getErrorMessageFromError } from "../utils/functions";

// Redux
import {
	getProfile,
	showAuthenticatedUserProfile,
	clearProfile,
} from "../redux/actions/userActions";
import { connect } from "react-redux";

const ProfileFactsContainer = ({
	authUser,
	profileFacts,
	getProfile,
	clearProfile,
	showAuthenticatedUserProfile,
	match,
	history,
}) => {
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
		if (match.params.username === authUser.authUserData.username) {
			showAuthenticatedUserProfile();
		} else {
			fetchProfile(match.params.username);
		}
		return () => {
			clearProfile();
		};
	}, [match.params.username]);

	const onFactClick = (fact) => {
		history.push(`/facts/${fact.id}`);
	};

	return (
		<FactList
			facts={profileFacts}
			loading={loading}
			error={error}
			onFactClick={onFactClick}
		/>
	);
};

const mapStateToProps = (state) => ({
	profileFacts: state.facts.profileFacts,
	authUser: state.authUser,
});
const mapActionsToProps = {
	getProfile,
	showAuthenticatedUserProfile,
	clearProfile,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(ProfileFactsContainer);
