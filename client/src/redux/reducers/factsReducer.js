import {
	GET_ALL_FACTS,
	GET_PROFILE_FACTS,
	CLEAR_PROFILE_FACTS,
	UPLOAD_IMAGE,
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
		case UPLOAD_IMAGE:
			return {
				...state,
				allFacts:
					state.allFacts &&
					state.allFacts.map((fact) => {
						if (fact.username.username === action.payload.username) {
							return {
								...fact,
								username: {
									...fact.username,
									imageUrl: action.payload.imageUrl,
								},
							};
						} else {
							return fact;
						}
					}),
				profileFacts:
					state.profileFacts &&
					state.profileFacts.map((fact) => {
						return {
							...fact,
							username: {
								...fact.username,
								imageUrl: action.payload.imageUrl,
							},
						};
					}),
			};
		default:
			return state;
	}
};
export default factsReducer;
