import axios from "axios";
import { UPLOAD_IMAGE, UPDATE_USER_DETAILS } from "../types";

import store from "../store";

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

export const updateUserDetails = (details) => async (dispatch) => {
	const response = await axios.post("/users/me/details", details);
	dispatch({
		type: UPDATE_USER_DETAILS,
		payload: response.data.data,
	});
};
