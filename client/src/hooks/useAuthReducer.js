import { useReducer } from "react";

import { useInputSetter } from "../utils/functions";

const initialState = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	loading: false,
	error: "",
};

function authReducer(state, action) {
	switch (action.type) {
		case "SET_USERNAME":
			return { ...state, username: action.payload };
		case "SET_EMAIL":
			return { ...state, email: action.payload };
		case "SET_PASSWORD":
			return { ...state, password: action.payload };
		case "SET_CONFIRM_PASSWORD":
			return { ...state, confirmPassword: action.payload };
		case "LOADING":
			return { ...state, loading: true, error: "" };
		case "ERROR":
			return { ...state, loading: false, error: action.payload };
		case "RESET":
			return initialState;
		default:
			return state;
	}
}

const useAuthReducer = () => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const setUsername = useInputSetter((username) => {
		dispatch({
			type: "SET_USERNAME",
			payload: username,
		});
	});

	const setEmail = useInputSetter((email) => {
		dispatch({
			type: "SET_EMAIL",
			payload: email,
		});
	});
	const setPassword = useInputSetter((password) => {
		dispatch({
			type: "SET_PASSWORD",
			payload: password,
		});
	});
	const setConfirmPassword = useInputSetter((confirmPassword) => {
		dispatch({
			type: "SET_CONFIRM_PASSWORD",
			payload: confirmPassword,
		});
	});
	const setLoading = () => dispatch({ type: "LOADING" });
	const setError = (error) => dispatch({ type: "ERROR", payload: error });
	const setReset = () => dispatch({ type: "RESET" });

	return {
		...state,
		setUsername,
		setEmail,
		setPassword,
		setConfirmPassword,
		setLoading,
		setError,
		setReset,
	};
};
export default useAuthReducer;
