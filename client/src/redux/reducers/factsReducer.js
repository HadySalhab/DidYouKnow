import {
	GET_ALL_FACTS,
	GET_PROFILE_FACTS,
	CLEAR_PROFILE_FACTS,
	UPLOAD_IMAGE,
	GET_FACT,
	ADD_COMMENT,
	CLEAR_ALL_FACTS,
	CLEAR_FACT,
	ADD_LIKE,
	REMOVE_LIKE,
} from "../types";

const initalState = {
	allFacts: null,
	profileFacts: null,
	fact: null,
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
				fact: state.fact && {
					...state.fact,
					username: {
						...state.fact.username,
						imageUrl: action.payload.imageUrl,
					},
					comments: state.fact.comments.map((comment) => {
						if (comment.username.username === action.payload.username) {
							return {
								...comment,
								username: {
									...comment.username,
									imageUrl: action.payload.imageUrl,
								},
							};
						} else {
							return comment;
						}
					}),
				},
			};
		case GET_FACT:
			return {
				...state,
				fact: action.payload,
			};
		case ADD_COMMENT:
			return {
				...state,
				fact: {
					...state.fact,
					commentCount: state.fact.commentCount + 1,
					comments: [action.payload.comment, ...state.fact.comments],
				},
			};
		case ADD_LIKE:
			return {
				...state,
				allFacts:
					state.allFacts &&
					state.allFacts.map((fact) => {
						if (fact.id === action.payload.id) {
							return {
								...fact,
								likeCount: fact.likeCount + 1,
							};
						} else {
							return fact;
						}
					}),
				fact: state.fact &&
					state.fact.id === action.payload.id && {
						...state.fact,
						likeCount: state.fact.likeCount + 1,
					},
				profileFacts:
					state.profileFacts &&
					state.profileFacts.map((fact) => {
						if (fact.id === action.payload.id) {
							return {
								...fact,
								likeCount: fact.likeCount + 1,
							};
						} else {
							return fact;
						}
					}),
			};
		case REMOVE_LIKE:
			return {
				...state,
				allFacts:
					state.allFacts &&
					state.allFacts.map((fact) => {
						if (fact.id === action.payload.id) {
							return {
								...fact,
								likeCount: fact.likeCount - 1,
							};
						} else {
							return fact;
						}
					}),
				fact: state.fact &&
					state.fact.id === action.payload.id && {
						...state.fact,
						likeCount: state.fact.likeCount - 1,
					},
				profileFacts:
					state.profileFacts &&
					state.profileFacts.map((fact) => {
						if (fact.id === action.payload.id) {
							return {
								...fact,
								likeCount: fact.likeCount - 1,
							};
						} else {
							return fact;
						}
					}),
			};
		case CLEAR_ALL_FACTS:
			return {
				...state,
				allFacts: null,
			};
		case CLEAR_FACT:
			return {
				...state,
				fact: null,
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
