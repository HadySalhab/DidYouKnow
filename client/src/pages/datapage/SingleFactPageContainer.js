import React, { useEffect } from "react";

// Hooks
import useUIReducer from "../../hooks/useUIReducer";

// Page
import DataPageLayout from "./DataPageLayout";

// Components
import FactDetailsContainer from "../../components/details/FactDetailsContainer";
import ProfileContainer from "../../components/profile/ProfileContainer";
import Loading from "../../components/loading/Loading";
// Redux
import { connect } from "react-redux";
import { getFact, clearFact } from "../../redux/actions/factsActions";
import { clearProfile } from "../../redux/actions/profileActions";

// Util
import { getErrorMessageFromError } from "../../utils/functions";

const SinglePageContainer = ({ getFact, match, clearProfile, clearFact }) => {
	const { loading, error, setLoading, setError, reset } = useUIReducer();

	useEffect(() => {
		const fetchFact = async (factId) => {
			try {
				setLoading();
				await getFact(factId);
				reset();
			} catch (error) {
				setError(getErrorMessageFromError(error));
			}
		};
		fetchFact(match.params.factId);
		return () => {
			clearFact();
			clearProfile();
		};
		//eslint-disable-next-line
	}, []);
	const getFactComponent = () => {
		if (loading) {
			return <Loading />;
		}
		if (error) {
			return <div>Error</div>;
		}
		return <FactDetailsContainer />;
	};
	return (
		<DataPageLayout
			factComponent={getFactComponent()}
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
