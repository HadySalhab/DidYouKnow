import React, { useEffect, useState } from "react";

// Components
import FactList from "./FactList";

// Util
import { getErrorMessageFromError } from "../utils/functions";

// Redux
import { getAllFacts } from "../redux/actions/factsActions";
import { connect } from "react-redux";

const AllFactsContainer = ({ getAllFacts, allFacts }) => {
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
	}, []);
	return <FactList facts={allFacts} loading={loading} error={error} />;
};

const mapStateToProps = (state) => ({
	allFacts: state.facts.allFacts,
});
const mapActionsToProps = {
	getAllFacts,
};

export default connect(mapStateToProps, mapActionsToProps)(AllFactsContainer);
