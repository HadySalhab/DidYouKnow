import React, { useEffect } from "react";

// Page
import DataPageLayout from "./DataPageLayout";

// Hooks
import useUIReducer from "../../hooks/useUIReducer";

// Components
import FactListContainer from "../../components/factlist/FactListContainer";
import ProfileContainer from "../../components/profile/ProfileContainer";
import Loading from "../../components/loading/Loading";
// Redux
import { connect } from "react-redux";
import { getProfile, clearProfile } from "../../redux/actions/profileActions";
import { clearFacts } from "../../redux/actions/factsActions";

// Util
import { getErrorMessageFromError } from "../../utils/functions";

const AllFactsPageContainer = ({ getProfile, match, history, clearFacts }) => {
	const { loading, error, setLoading, setError, reset } = useUIReducer();

	useEffect(() => {
		const fetchProfile = async (username) => {
			try {
				setLoading();
				await getProfile(username);
				reset();
			} catch (error) {
				setError(getErrorMessageFromError(error));
			}
		};
		fetchProfile(match.params.username);
		return () => {
			clearFacts();
			clearProfile();
		};
		//eslint-disable-next-line
	}, [match.params.username]);

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
	getProfile,
	clearFacts,
	clearProfile,
};
export default connect(null, mapActionsToProps)(AllFactsPageContainer);
