import {
	GET_AUTHENTICATED_USER_DETAILS,
	SET_USER_AUTHENTICATED,
	SET_USER_UNAUTHENTICATED,
	UPLOAD_IMAGE,
	UPDATE_USER_DETAILS,
	ADD_COMMENT,
	ADD_LIKE,
	REMOVE_LIKE,
	ADD_FACT,
	MARK_NOTIFICATIONS_READ,
} from "../types";
const initialState = {
	isAuthenticated: false,
	authUserData: null,
};
const authUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_AUTHENTICATED:
			return {
				...state,
				isAuthenticated: true,
			};
		case GET_AUTHENTICATED_USER_DETAILS: {
			return {
				...state,
				authUserData: {
					...action.payload,
				},
			};
		}
		case SET_USER_UNAUTHENTICATED:
			return initialState;
		case UPLOAD_IMAGE:
			return {
				...state,
				authUserData: {
					...state.authUserData,
					imageUrl: action.payload.imageUrl,
				},
			};
		case UPDATE_USER_DETAILS:
			return {
				...state,
				authUserData: {
					...state.authUserData,
					...action.payload,
				},
			};
		case ADD_COMMENT:
			return {
				...state,
				authUserData: {
					...state.authUserData,
					facts: state.authUserData.facts.map((fact) => {
						if (fact.id === action.payload.factId) {
							return {
								...fact,
								commentCount: fact.commentCount + 1,
							};
						} else {
							return fact;
						}
					}),
				},
			};
		case ADD_LIKE:
			return {
				...state,
				authUserData: {
					...state.authUserData,
					likes: [
						{
							username: state.authUserData.username,
							fact: action.payload.id,
						},
						...state.authUserData.likes,
					],
					facts: state.authUserData.facts.map((fact) => {
						if (fact.id === action.payload.id) {
							return {
								...fact,
								likeCount: fact.likeCount + 1,
							};
						} else {
							return fact;
						}
					}),
				},
			};
		case REMOVE_LIKE:
			return {
				...state,
				authUserData: {
					...state.authUserData,
					likes: state.authUserData.likes.filter(
						(like) => like.fact !== action.payload.id
					),
					facts: state.authUserData.facts.map((fact) => {
						if (fact.id === action.payload.id) {
							return {
								...fact,
								likeCount: fact.likeCount - 1,
							};
						} else {
							return fact;
						}
					}),
				},
			};
		case ADD_FACT:
			return {
				...state,
				authUserData: {
					...state.authUserData,
					facts: [action.payload, ...state.authUserData.facts],
				},
			};
		case MARK_NOTIFICATIONS_READ:
			return {
				...state,
				authUserData: {
					...state.authUserData,
					notifications: state.authUserData.notifications.map(
						(notification) => {
							if (notification.read) {
								return notification;
							} else {
								return {
									...notification,
									read: true,
								};
							}
						}
					),
				},
			};
		default:
			return state;
	}
};

export default authUserReducer;
