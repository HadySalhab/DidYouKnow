import axios from "axios";
import { GET_AUTHENTICATED_USER_DETAILS } from "../types";
import { LOCALSTORAGE_TOKEN_KEY } from "../../utils/constants";

export const loginUser = (loginFormData) => async (dispatch) => {
	const response = await axios.post("/auth/login", loginFormData);
	setAuthorizationHeader(response.data.data);
	await dispatch(getAuthenticatedUserDetails());
};

export const signupUser = (signupFormData) => async (dispatch) => {
	const response = await axios.post("/auth/signup", signupFormData);
	setAuthorizationHeader(response.data.data);
	await dispatch(getAuthenticatedUserDetails());
};

export const getAuthenticatedUserDetails = () => async (dispatch) => {
	const response = await axios.get("/users/me/details");
	dispatch({
		type: GET_AUTHENTICATED_USER_DETAILS,
		payload: response.data.data,
	});
};

const setAuthorizationHeader = (token) => {
	const DYKtoken = `Bearer ${token}`;
	localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, DYKtoken);
	axios.defaults.headers.common["Authorization"] = DYKtoken;
};