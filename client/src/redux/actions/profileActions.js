import axios from "axios";
import {
	UPLOAD_IMAGE,
	UPDATE_USER_DETAILS,
	GET_PROFILE,
	GET_FACTS,
	CLEAR_PROFILE,
} from "../types";
import _ from "lodash";
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

// @desc      Get a single user
// @route     GET /users/:username
export const getProfile = (username) => async (dispatch) => {
	const response = await axios.get(`/users/${username}`);
	const profile = _.omit(response.data.data, ["facts"]);
	const { facts } = _.pick(response.data.data, ["facts"]);
	dispatch({
		type: GET_PROFILE,
		payload: profile,
	});
	dispatch({
		type: GET_FACTS,
		payload: facts.map((fact) => ({
			...fact,
			username: profile,
		})),
	});
};

export const showAuthenticatedUserProfile = () => (dispatch) => {
	const authUser = store.getState().authUser;
	const profile = _.omit(authUser.authUserData, ["facts,notifications,likes"]);
	dispatch({
		type: GET_PROFILE,
		payload: profile,
	});
};

export const clearProfile = () => ({
	type: CLEAR_PROFILE,
});
