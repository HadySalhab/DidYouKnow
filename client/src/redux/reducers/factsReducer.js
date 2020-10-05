import {
	GET_ALL_FACTS,
	GET_PROFILE_FACTS,
	CLEAR_PROFILE_FACTS,
} from "../types";
const initalState = {
	allFacts: null,
	profileFacts: null,
};

const factsReducer = (state = initalState, action) => {
	switch (action.type) {
		case GET_ALL_FACTS:
			return {
				...state,
				allFacts: action.payload,
			};
		case GET_PROFILE_FACTS:
			return {
				...state,
				profileFacts: action.payload,
			};
		case CLEAR_PROFILE_FACTS:
			return {
				...state,
				profileFacts: null,
			};
		default:
			return state;
	}
};
export default factsReducer;
