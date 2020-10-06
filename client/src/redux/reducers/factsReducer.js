import {
	GET_FACTS,
	GET_FACT,
	CLEAR_FACTS,
	CLEAR_FACT,
	UPLOAD_IMAGE,
	ADD_COMMENT,
	ADD_LIKE,
	REMOVE_LIKE,
} from "../types";

const initalState = {
	facts: null,
	fact: null,
};

const factsReducer = (state = initalState, action) => {
	switch (action.type) {
		case GET_FACTS:
			return {
				...state,
				facts: action.payload,
			};

		case UPLOAD_IMAGE:
			return {
				...state,
				facts:
					state.facts &&
					state.facts.map((fact) => {
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
				facts:
					state.facts &&
					state.facts.map((fact) => {
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
			};
		case REMOVE_LIKE:
			return {
				...state,
				facts:
					state.facts &&
					state.facts.map((fact) => {
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
			};
		case CLEAR_FACTS:
			return {
				...state,
				facts: null,
			};
		case CLEAR_FACT:
			return {
				...state,
				fact: null,
			};
		default:
			return state;
	}
};
export default factsReducer;
