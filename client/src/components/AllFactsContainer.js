import React, { useEffect, useState } from "react";

// Components
import FactList from "./FactList";

// Util
import { getErrorMessageFromError } from "../utils/functions";

// Redux
import { getAllFacts, clearAllFacts } from "../redux/actions/factsActions";
import { connect } from "react-redux";

const AllFactsContainer = ({
	getAllFacts,
	allFacts,
	history,
	clearAllFacts,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchAllFacts = async () => {
			setLoading(true);
			setError(null);
			try {
				await getAllFacts();
				setLoading(false);
			} catch (getAllFactsError) {
				setLoading(false);
				setError(getErrorMessageFromError(getAllFactsError));
			}
		};
		fetchAllFacts();
		return () => {
			clearAllFacts();
		};
	}, []);

	const onFactClick = (fact) => {
		history.push(`/facts/${fact.id}`);
	};

	return (
		<FactList
			facts={allFacts}
			loading={loading}
			error={error}
			onFactClick={onFactClick}
		/>
	);
};

const mapStateToProps = (state) => ({
	allFacts: state.facts.allFacts,
});
const mapActionsToProps = {
	getAllFacts,
	clearAllFacts,
};

export default connect(mapStateToProps, mapActionsToProps)(AllFactsContainer);
