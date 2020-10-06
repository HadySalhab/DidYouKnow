import {
	GET_ALL_FACTS,
	GET_PROFILE,
	GET_FACT,
	ADD_COMMENT,
	CLEAR_ALL_FACTS,
} from "../types";
import axios from "axios";
import store from "../store";
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
	dispatch({
		type: GET_FACT,
		payload: factDetails,
	});
};

// @desc      Add comment to a fact
// @route     POST /facts/:factId/comments
export const addComment = (comment) => async (dispatch) => {
	const currentDisplayedFact = store.getState().facts.fact;
	const response = await axios.post(
		`/facts/${currentDisplayedFact.id}/comments`,
		{ body: comment }
	);
	dispatch({
		type: ADD_COMMENT,
		payload: {
			factId: currentDisplayedFact.id,
			comment: response.data.data,
		},
	});
};

export const clearAllFacts = () => ({
	type: CLEAR_ALL_FACTS,
});
