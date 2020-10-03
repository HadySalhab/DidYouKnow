import { GET_ALL_FACTS } from "../types";
import axios from "axios";
// Get all facts
export const getAllFacts = () => async (dispatch) => {
	const response = await axios.get("/facts");
	dispatch({
		type: GET_ALL_FACTS,
		payload: response.data.data,
	});
};
