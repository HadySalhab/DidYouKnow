import React, { Fragment } from "react";

// Redux
import { connect } from "react-redux";
import { uploadImage } from "../redux/actions/profileActions";

// Components
import Profile from "./Profile";

const UserProfileContainer = ({ authUser, uploadImage, profile, match }) => {
	const isAuthUser = match.params.username === authUser.authUserData.username;
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
		<Fragment>
			{profile && (
				<Profile
					withEdit={isAuthUser}
					user={profile}
					onEditImageClick={onEditImageClick}
					onImageChange={onImageChange}
				/>
			)}
		</Fragment>
	);
};
const mapActionsToProps = {
	uploadImage,
};
const mapStateToProps = (state) => ({
	profile: state.profile,
	authUser: state.authUser,
});

export default connect(
	mapStateToProps,
	mapActionsToProps
)(UserProfileContainer);
