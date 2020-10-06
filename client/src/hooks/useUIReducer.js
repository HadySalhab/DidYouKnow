import { useReducer } from "react";
const initialState = {
	loading: false,
	error: null,
};
const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOADING":
			return {
				loading: true,
				error: null,
			};
		case "ERROR":
			return {
				loading: false,
				error: action.payload,
			};
		case "RESET":
			return initialState;
		default:
			return state;
	}
};
const useUIReducer = () => {
	const [state, dispatch] = useReducer(uiReducer, initialState);
	const setLoading = () => {
		dispatch({
			type: "LOADING",
		});
	};
	const setError = (error) => {
		dispatch({
			type: "ERROR",
			payload: error,
		});
	};
	const reset = () => {
		dispatch({
			type: "RESET",
		});
	};
	return {
		...state,
		setLoading,
		setError,
		reset,
	};
};

export default useUIReducer;
