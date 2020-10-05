import { useReducer } from "react";
// Util
import { useInputSetter } from "../utils/functions";

const OPEN_EDIT_DIALOG = "OPEN_EDIT_DIALOG";
const CLOSE_EDIT_DIALOG = "CLOSE_EDIT_DIALOG";
const SET_BIO = "SET_BIO";
const SET_WEBSITE = "SET_WEBSITE";
const SET_LOCATION = "SET_LOCATION";
const SET_ERROR = "SET_ERROR";

// Schema
const initialState = {
	isEditDialogOpen: false,
	bio: "",
	website: "",
	location: "",
	error: null,
	loading: false,
};

const editProfileReducer = (state, action) => {
	switch (action.type) {
		case OPEN_EDIT_DIALOG:
			return {
				...state,
				isEditDialogOpen: true,
				bio: action.payload.bio ? action.payload.bio : "",
				website: action.payload.website ? action.payload.website : "",
				location: action.payload.location ? action.payload.location : "",
			};
		case CLOSE_EDIT_DIALOG:
			return {
				...state,
				isEditDialogOpen: false,
			};
		case SET_WEBSITE:
			return {
				...state,
				website: action.payload,
			};
		case SET_BIO:
			return {
				...state,
				bio: action.payload,
			};
		case SET_LOCATION:
			return {
				...state,
				location: action.payload,
			};
		case SET_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};
const useEditProfileReducer = (initState = {}) => {
	const [state, dispatch] = useReducer(editProfileReducer, initState);
	const openEditDialogWithState = (state) => {
		dispatch({
			type: OPEN_EDIT_DIALOG,
			payload: state,
		});
	};
	const closeDialog = () => {
		dispatch({
			type: CLOSE_EDIT_DIALOG,
		});
	};
	const setError = (error) => {
		dispatch({
			type: SET_ERROR,
			payload: error,
		});
	};

	const setBio = useInputSetter((bio) => {
		dispatch({
			type: SET_BIO,
			payload: bio,
		});
	});
	const setWebsite = useInputSetter((website) => {
		dispatch({
			type: SET_WEBSITE,
			payload: website,
		});
	});
	const setLocation = useInputSetter((location) => {
		dispatch({
			type: SET_LOCATION,
			payload: location,
		});
	});

	return {
		...state,
		openEditDialogWithState,
		closeDialog,
		setBio,
		setLocation,
		setWebsite,
		setError,
	};
};
export default useEditProfileReducer;
