import axios from "axios";
import {
	GET_AUTHENTICATED_USER_DETAILS,
	SET_USER_AUTHENTICATED,
	SET_USER_UNAUTHENTICATED,
	GET_AUTHENTICATED_USER_DETAILS_LOADING,
	GET_AUTHENTICATED_USER_DETAILS_ERROR,
	MARK_NOTIFICATIONS_READ,
} from "../types";
import { getErrorMessageFromError } from "../../utils/functions";
import { LOCALSTORAGE_TOKEN_KEY } from "../../utils/constants";

// @desc      Login user
// @route     POST /auth/login
export const loginUser = (loginFormData) => async (dispatch) => {
	const response = await axios.post("/auth/login", loginFormData);
	setAuthorizationHeader(response.data.data);
	dispatch({
		type: SET_USER_AUTHENTICATED,
	});
};

// @desc      Signup user
// @route     POST /auth/signup
export const signupUser = (signupFormData) => async (dispatch) => {
	const response = await axios.post("/auth/signup", signupFormData);
	setAuthorizationHeader(response.data.data);
	dispatch({
		type: SET_USER_AUTHENTICATED,
	});
};

// @desc      Get authenticated user details
// @route     GET /users/me/details
export const getAuthenticatedUserDetails = () => async (dispatch) => {
	dispatch({
		type: GET_AUTHENTICATED_USER_DETAILS_LOADING,
	});
	try {
		const response = await axios.get("/users/me/details");
		dispatch({
			type: GET_AUTHENTICATED_USER_DETAILS,
			payload: response.data.data,
		});
	} catch (error) {
		dispatch({
			type: GET_AUTHENTICATED_USER_DETAILS_ERROR,
			payload: getErrorMessageFromError(error),
		});
	}
};

// @desc      Mark notifications read
// @route     POST /users/me/notifications
export const markNotificationsRead = (notificationIds) => async (dispatch) => {
	await axios.post(`users/me/notifications`, notificationIds);
	dispatch({
		type: MARK_NOTIFICATIONS_READ,
	});
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
	delete axios.defaults.headers.common["Authorization"];
	dispatch({ type: SET_USER_UNAUTHENTICATED });
};

export const setUserAuthenticated = () => ({
	type: SET_USER_AUTHENTICATED,
});

const setAuthorizationHeader = (token) => {
	const DYKtoken = `Bearer ${token}`;
	localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, DYKtoken);
	axios.defaults.headers.common["Authorization"] = DYKtoken;
};
