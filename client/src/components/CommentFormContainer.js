import React, { useState } from "react";

// Redux
import { connect } from "react-redux";
import { addComment } from "../redux/actions/factsActions";

// Componnets
import CommentForm from "./CommentForm";

// Utils
import { useInputSetter } from "../utils/functions";

const CommentFormContainer = ({ authUser, addComment }) => {
	const [comment, setComment] = useState("");

	const onCommentChange = useInputSetter(setComment);
	const onSubmit = async (event) => {
		try {
			event.preventDefault();
			await addComment(comment);
			setComment("");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<CommentForm
			user={authUser.authUserData}
			comment={comment}
			onCommentChange={onCommentChange}
			onSubmit={onSubmit}
		/>
	);
};
const mapActionsToProps = {
	addComment,
};
const mapStateToProps = (state) => ({
	authUser: state.authUser,
});
export default connect(
	mapStateToProps,
	mapActionsToProps
)(CommentFormContainer);
