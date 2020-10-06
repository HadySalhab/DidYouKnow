import React from "react";

// Redux
import { addLike, removeLike } from "../../redux/actions/factsActions";
import { connect } from "react-redux";

// Components
import Like from "./Like";

const LikeContainer = ({ authUser, factId, addLike, removeLike }) => {
	const isLiked = authUser.authUserData.likes.some(
		(like) => like.fact === factId
	);
	const onFavClick = async (e) => {
		e.stopPropagation();
		if (isLiked) {
			removeLike(factId);
		} else {
			addLike(factId);
		}
	};
	return <Like onFavClick={onFavClick} isLiked={isLiked} />;
};

const mapActionsToProps = {
	addLike,
	removeLike,
};
const mapStateToProps = (state) => ({
	authUser: state.authUser,
});

export default connect(mapStateToProps, mapActionsToProps)(LikeContainer);
