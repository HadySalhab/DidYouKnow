import React from "react";

// Redux
import { connect } from "react-redux";

// Componnets
import CommentForm from "./CommentForm";

const CommentFormContainer = ({ authUser }) => {
	return <CommentForm user={authUser.authUserData} />;
};
const mapStateToProps = (state) => ({
	authUser: state.authUser,
});
export default connect(mapStateToProps)(CommentFormContainer);
