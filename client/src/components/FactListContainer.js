import React, { useEffect } from "react";

// Components
import FactList from "./FactList";

// Redux
import { getAllFacts } from "../redux/actions/factsActions";
import { connect } from "react-redux";

const FactListContainer = ({ getAllFacts, allFacts }) => {
	useEffect(() => {
		const fetchAllFacts = async () => {
			try {
				await getAllFacts();
			} catch (getAllFactsError) {
				console.log(getAllFactsError);
			}
		};
		fetchAllFacts();
	}, []);
	return <FactList facts={allFacts} />;
};

const mapStateToProps = (state) => ({
	allFacts: state.facts.allFacts,
});
const mapActionsToProps = {
	getAllFacts,
};

export default connect(mapStateToProps, mapActionsToProps)(FactListContainer);
