import { GET_ALL_FACTS, GET_PROFILE } from "../types";
import axios from "axios";
import _ from "lodash";
// @desc      Get all facts
// @route     GET /facts
export const getAllFacts = () => async (dispatch) => {
	const response = await axios.get("/facts");
	dispatch({
		type: GET_ALL_FACTS,
		payload: response.data.data,
	});
};

// @desc      Get a single fact
// @route     GET /facts/:factId
export const getFact = (factId) => async (dispatch) => {
	const response = await axios.get(`/facts/${factId}`);
	const factDetails = response.data.data;
	const { username } = _.pick(factDetails, ["username"]);
	dispatch({
		type: GET_PROFILE,
		payload: username,
	});
};
