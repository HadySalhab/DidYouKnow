import { GET_AUTHENTICATED_USER_DETAILS } from "../types";
const initialState = {
	authUser: {},
};
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_AUTHENTICATED_USER_DETAILS: {
			return {
				...state,
				authUser: action.payload,
			};
		}
		default:
			return state;
	}
};

export default userReducer;
