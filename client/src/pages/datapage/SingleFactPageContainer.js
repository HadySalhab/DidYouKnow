import React, { useEffect } from "react";

// Page
import DataPageLayout from "./DataPageLayout";

// Components
import FactDetailsContainer from "../../components/details/FactDetailsContainer";
import ProfileContainer from "../../components/profile/ProfileContainer";

// Redux
import { connect } from "react-redux";
import { getFact, clearFact } from "../../redux/actions/factsActions";
import { clearProfile } from "../../redux/actions/profileActions";

const SinglePageContainer = ({ getFact, match, clearProfile, clearFact }) => {
	useEffect(() => {
		getFact(match.params.factId);
		return () => {
			clearFact();
			clearProfile();
		};
	}, []);
	return (
		<DataPageLayout
			factComponent={<FactDetailsContainer />}
			profileComponent={<ProfileContainer />}
		/>
	);
};
const mapActionsToProps = {
	getFact,
	clearFact,
	clearProfile,
};
export default connect(null, mapActionsToProps)(SinglePageContainer);
