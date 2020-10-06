import React, { useState, useEffect } from "react";

// Components
import FactDetails from "./FactDetails";

// Util
import { getErrorMessageFromError } from "../utils/functions";

// Redux
import { getFact, clearFact } from "../redux/actions/factsActions";
import { connect } from "react-redux";

const FactContainer = ({ getFact, match, fact, clearFact }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchFact = async () => {
			setLoading(true);
			setError(null);
			try {
				await getFact(match.params.factId);
				setLoading(false);
			} catch (getSingleFactError) {
				setLoading(false);
				setError(getErrorMessageFromError(getSingleFactError));
			}
		};
		fetchFact();
		return () => {
			clearFact();
		};
	}, []);

	return <FactDetails fact={fact} />;
};
const mapStateToProps = (state) => ({
	fact: state.facts.fact,
});
const mapActionsToProps = {
	getFact,
	clearFact,
};
export default connect(mapStateToProps, mapActionsToProps)(FactContainer);
