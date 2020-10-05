import axios from "axios";
import { UPLOAD_IMAGE, UPDATE_USER_DETAILS } from "../types";

import store from "../store";

// @desc      Upload authenticated user image
// @route     POST /users/me/image
export const uploadImage = (formData) => async (dispatch) => {
	const response = await axios.post("/users/me/image", formData);
	const authUsername = store.getState().authUser.authUserData.username;

	dispatch({
		type: UPLOAD_IMAGE,
		payload: {
			username: authUsername,
			imageUrl: response.data.data,
		},
	});
};

// @desc      update authenticated user details
// @route     POST /users/me/details
export const updateUserDetails = (details) => async (dispatch) => {
	const response = await axios.post("/users/me/details", details);
	dispatch({
		type: UPDATE_USER_DETAILS,
		payload: response.data.data,
	});
};
