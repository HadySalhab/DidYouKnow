import axios from "axios";
import _ from "lodash";
import {
	GET_AUTHENTICATED_USER_DETAILS,
	SET_USER_AUTHENTICATED,
	SET_USER_UNAUTHENTICATED,
	GET_AUTHENTICATED_USER_DETAILS_LOADING,
	GET_AUTHENTICATED_USER_DETAILS_ERROR,
	GET_PROFILE_FACTS,
	GET_PROFILE,
} from "../types";
import { getErrorMessageFromError } from "../../utils/functions";
import { LOCALSTORAGE_TOKEN_KEY } from "../../utils/constants";

export const loginUser = (loginFormData) => async (dispatch) => {
	const response = await axios.post("/auth/login", loginFormData);
	setAuthorizationHeader(response.data.data);
	dispatch({
		type: SET_USER_AUTHENTICATED,
	});
};

export const signupUser = (signupFormData) => async (dispatch) => {
	const response = await axios.post("/auth/signup", signupFormData);
	setAuthorizationHeader(response.data.data);
	dispatch({
		type: SET_USER_AUTHENTICATED,
	});
};

export const getAuthenticatedUserDetails = () => async (dispatch) => {
	dispatch({
		type: GET_AUTHENTICATED_USER_DETAILS_LOADING,
	});
	try {
		const response = await axios.get("/users/me/details");
		setTimeout(() => {
			dispatch({
				type: GET_AUTHENTICATED_USER_DETAILS,
				payload: response.data.data,
			});
		}, [1000]);
	} catch (error) {
		dispatch({
			type: GET_AUTHENTICATED_USER_DETAILS_ERROR,
			payload: getErrorMessageFromError(error),
		});
	}
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
	delete axios.defaults.headers.common["Authorization"];
	dispatch({ type: SET_USER_UNAUTHENTICATED });
};

export const setUserAuthenticated = () => ({
	type: SET_USER_AUTHENTICATED,
});

export const getProfile = (username) => async (dispatch) => {
	const response = await axios.get(`/users/${username}`);
	const profile = _.omit(response.data.data, ["facts"]);
	const { facts } = _.pick(response.data.data, ["facts"]);
	dispatch({
		type: GET_PROFILE,
		payload: profile,
	});
	dispatch({
		type: GET_PROFILE_FACTS,
		payload: facts.map((fact) => ({
			...fact,
			username: profile,
		})),
	});
};

const setAuthorizationHeader = (token) => {
	const DYKtoken = `Bearer ${token}`;
	localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, DYKtoken);
	axios.defaults.headers.common["Authorization"] = DYKtoken;
};
