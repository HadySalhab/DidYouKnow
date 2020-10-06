import React from "react";

// Redux
import { connect } from "react-redux";
import FactList from "./FactList";

const FactListContainer = ({ facts, history }) => {
	const onFactClick = (fact) => {
		history.push(`/facts/${fact.id}`);
	};
	return <FactList onFactClick={onFactClick} facts={facts.facts || []} />;
};

const mapStateToProps = (state) => ({
	facts: state.facts,
});
export default connect(mapStateToProps)(FactListContainer);
