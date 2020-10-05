import {
	GET_PROFILE,
	CLEAR_PROFILE,
	UPLOAD_IMAGE,
	UPDATE_USER_DETAILS,
} from "../types";
const initialState = null;
const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE:
			return action.payload;
		case UPLOAD_IMAGE: {
			if (state) {
				return {
					...state,
					imageUrl: action.payload.imageUrl,
				};
			} else {
				return state;
			}
		}
		case CLEAR_PROFILE: {
			return null;
		}
		case UPDATE_USER_DETAILS: {
			if (state) {
				return {
					...state,
					...action.payload,
				};
			} else {
				return state;
			}
		}
		default:
			return state;
	}
};

export default profileReducer;
