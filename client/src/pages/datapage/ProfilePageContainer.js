import React, { useEffect } from "react";

// Page
import DataPageLayout from "./DataPageLayout";

// Components
import FactListContainer from "../../components/factlist/FactListContainer";
import ProfileContainer from "../../components/profile/ProfileContainer";

// Redux
import { connect } from "react-redux";
import { getProfile, clearProfile } from "../../redux/actions/profileActions";
import { clearFacts } from "../../redux/actions/factsActions";

const AllFactsPageContainer = ({ getProfile, match, history, clearFacts }) => {
	useEffect(() => {
		getProfile(match.params.username);
		return () => {
			clearFacts();
			clearProfile();
		};
	}, [match.params.username]);
	return (
		<DataPageLayout
			factComponent={<FactListContainer history={history} />}
			profileComponent={<ProfileContainer />}
		/>
	);
};
const mapActionsToProps = {
	getProfile,
	clearFacts,
	clearProfile,
};
export default connect(null, mapActionsToProps)(AllFactsPageContainer);
