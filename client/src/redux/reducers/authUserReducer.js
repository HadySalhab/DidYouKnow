import {
	GET_AUTHENTICATED_USER_DETAILS,
	SET_USER_AUTHENTICATED,
	SET_USER_UNAUTHENTICATED,
	UPLOAD_IMAGE,
	UPDATE_USER_DETAILS,
} from "../types";
const initialState = {
	isAuthenticated: false,
	authUserData: {
		// email: "hadysalhab1@gmail.com",
	},
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
		default:
			return state;
	}
};

export default authUserReducer;
