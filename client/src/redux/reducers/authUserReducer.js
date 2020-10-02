import {
	GET_AUTHENTICATED_USER_DETAILS,
	SET_USER_AUTHENTICATED,
	SET_USER_UNAUTHENTICATED,
} from "../types";
const initialState = {
	isAuthenticated: false,
	authUserData: {},
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
		default:
			return state;
	}
};

export default authUserReducer;
