import React, { useEffect } from "react";

// Page
import DataPageLayout from "./DataPageLayout";

// Components
import FactListContainer from "../../components/factlist/FactListContainer";
import ProfileContainer from "../../components/profile/ProfileContainer";

// Redux
import { connect } from "react-redux";
import {
	showAuthenticatedUserProfile,
	clearProfile,
} from "../../redux/actions/profileActions";
import { clearFacts, getAllFacts } from "../../redux/actions/factsActions";

const AllFactsPageContainer = ({
	showAuthenticatedUserProfile,
	getAllFacts,
	clearProfile,
	clearFacts,
	history,
}) => {
	useEffect(() => {
		showAuthenticatedUserProfile();
		getAllFacts();
		return () => {
			clearFacts();
			clearProfile();
		};
	}, []);
	return (
		<DataPageLayout
			factComponent={<FactListContainer history={history} />}
			profileComponent={<ProfileContainer />}
		/>
	);
};
const mapActionsToProps = {
	showAuthenticatedUserProfile,
	getAllFacts,
	clearFacts,
	clearProfile,
};
export default connect(null, mapActionsToProps)(AllFactsPageContainer);
