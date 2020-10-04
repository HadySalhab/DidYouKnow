import {
	GET_AUTHENTICATED_USER_DETAILS_LOADING,
	GET_AUTHENTICATED_USER_DETAILS_ERROR,
	GET_AUTHENTICATED_USER_DETAILS,
} from "../types";
const initialState = {
	loading: false,
	error: null,
};
const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_AUTHENTICATED_USER_DETAILS_LOADING:
			return {
				loading: true,
				error: null,
			};
		case GET_AUTHENTICATED_USER_DETAILS_ERROR:
			return {
				loading: false,
				error: action.payload,
			};
		case GET_AUTHENTICATED_USER_DETAILS:
			return initialState;
		default:
			return state;
	}
};

export default uiReducer;
