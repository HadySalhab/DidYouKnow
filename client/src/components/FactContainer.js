import React, { useState, useEffect } from "react";

// Util
import { getErrorMessageFromError } from "../utils/functions";

// Redux
import { getFact } from "../redux/actions/factsActions";
import { connect } from "react-redux";

const FactContainer = ({ getFact, match }) => {
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
	}, []);

	return <div></div>;
};
const mapStateToProps = (state) => ({});
const mapActionsToProps = {
	getFact,
};
export default connect(mapStateToProps, mapActionsToProps)(FactContainer);
