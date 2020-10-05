import { GET_PROFILE, CLEAR_PROFILE } from "../types";
const initialState = null;
const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE:
			return action.payload;
		case CLEAR_PROFILE: {
			return null;
		}
		default:
			return state;
	}
};

export default profileReducer;
