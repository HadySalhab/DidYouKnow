import React, { useReducer } from "react";

// Components
import AddFact from "./AddFact";

// Util
import { useInputSetter } from "../../utils/functions";
import { isNullOrEmpty } from "../../utils/functions";
import _ from "lodash";

// Redux
import { connect } from "react-redux";
import { addFact } from "../../redux/actions/factsActions";

const initialState = {
	open: false,
	question: "",
	answer: "",
	error: null,
};

// Reducer
const addReducer = (state, action) => {
	switch (action.type) {
		case "OPEN_DIALOG":
			return {
				...state,
				open: true,
			};
		case "CLOSE_DIALOG":
			return {
				...state,
				open: false,
			};
		case "SET_QUESTION":
			return {
				...state,
				question: action.payload,
			};
		case "SET_ANSWER":
			return {
				...state,
				answer: action.payload,
			};
		case "SET_ERROR":
			return {
				...state,
				error: action.payload,
			};
		case "RESET":
			return initialState;
	}
};
const AddFactContainer = ({ addFact }) => {
	const [state, dispatch] = useReducer(addReducer, initialState);
	const onAddClick = () => {
		dispatch({
			type: "OPEN_DIALOG",
		});
	};
	const onDismiss = () => {
		dispatch({
			type: "CLOSE_DIALOG",
		});
	};
	const onQuestionChange = useInputSetter((question) => {
		dispatch({
			type: "SET_QUESTION",
			payload: question,
		});
	});
	const onAnswerChange = useInputSetter((answer) => {
		dispatch({
			type: "SET_ANSWER",
			payload: answer,
		});
	});
	const onSubmit = async () => {
		let error = {};
		if (isNullOrEmpty(state.question.trim())) {
			error.question = "Please add a question";
		}
		if (isNullOrEmpty(state.answer.trim())) {
			error.answer = "Please add an answer";
		}

		if (!_.isEmpty(error)) {
			dispatch({
				type: "SET_ERROR",
				payload: error,
			});
		} else {
			try {
				await addFact({
					question: state.question,
					answer: state.answer,
				});
				dispatch({
					type: "RESET",
				});
			} catch (error) {}
		}
	};
	return (
		<AddFact
			open={state.open}
			onQuestionChange={onQuestionChange}
			onAnswerChange={onAnswerChange}
			onAddClick={onAddClick}
			onDismiss={onDismiss}
			question={state.question}
			answer={state.answer}
			onSubmit={onSubmit}
		/>
	);
};

const mapActionsToProps = {
	addFact,
};

export default connect(null, mapActionsToProps)(AddFactContainer);
