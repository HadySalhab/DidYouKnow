import React from "react";

// Components
import FactDetails from "./FactDetails";

// Redux
import { getFact, clearFact } from "../../redux/actions/factsActions";
import { connect } from "react-redux";

const FactContainer = ({ fact }) => {
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
