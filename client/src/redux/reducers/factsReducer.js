import { GET_ALL_FACTS } from "../types";
const initalState = {
	allFacts: null,
};

const factsReducer = (state = initalState, action) => {
	switch (action.type) {
		case GET_ALL_FACTS:
			return {
				...state,
				allFacts: action.payload,
			};
		default:
			return state;
	}
};
export default factsReducer;
