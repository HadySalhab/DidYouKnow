import React from "react";

// Components
import Profile from "./Profile";

// Redux
import { connect } from "react-redux";
import { uploadImage } from "../redux/actions/profileActions";

// Util
import _ from "lodash";

const AuthProfileContainer = ({ authUser, uploadImage }) => {
	const onImageChange = (e) => {
		const image = e.target.files[0];
		const formData = new FormData();
		formData.append("image", image, image.name);
		uploadImage(formData);
	};
	const onEditImageClick = (fileInput) => {
		fileInput.click();
	};
	return (
		<Profile
			user={_.pick(authUser.authUserData, [
				"website",
				"username",
				"location",
				"bio",
				"imageUrl",
				"createdAt",
			])}
			onImageChange={onImageChange}
			onEditImageClick={onEditImageClick}
			withEdit
		/>
	);
};
const mapActionsToProps = {
	uploadImage,
};

const mapStateToProps = (state) => ({
	authUser: state.authUser,
});
export default connect(
	mapStateToProps,
	mapActionsToProps
)(AuthProfileContainer);
