import React, { useEffect } from "react";

// Hooks
import useUIReducer from "../../hooks/useUIReducer";

// Page
import DataPageLayout from "./DataPageLayout";

// Components
import FactListContainer from "../../components/factlist/FactListContainer";
import ProfileContainer from "../../components/profile/ProfileContainer";
import Loading from "../../components/loading/Loading";

// Redux
import { connect } from "react-redux";
import {
	showAuthenticatedUserProfile,
	clearProfile,
} from "../../redux/actions/profileActions";
import { clearFacts, getAllFacts } from "../../redux/actions/factsActions";

// Util
import { getErrorMessageFromError } from "../../utils/functions";

const AllFactsPageContainer = ({
	showAuthenticatedUserProfile,
	getAllFacts,
	clearProfile,
	clearFacts,
	history,
}) => {
	const { loading, error, setLoading, setError, reset } = useUIReducer();

	useEffect(() => {
		const fetchAllFacts = async () => {
			try {
				setLoading();
				showAuthenticatedUserProfile();
				await getAllFacts();
				reset();
			} catch (error) {
				setError(getErrorMessageFromError(error));
			}
		};
		fetchAllFacts();
		return () => {
			clearFacts();
			clearProfile();
		};
	}, []);

	const getFactComponent = () => {
		if (loading) {
			return <Loading />;
		}
		if (error) {
			return <div>Error</div>;
		}
		return <FactListContainer history={history} />;
	};

	return (
		<DataPageLayout
			factComponent={getFactComponent()}
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
