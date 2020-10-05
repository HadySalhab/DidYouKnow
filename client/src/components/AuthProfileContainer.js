import React, { useEffect } from "react";

// Hook
import useEditProfileReducer from "../hooks/useEditProfileReducer";

// Components
import Profile from "./Profile";

// Redux
import { connect } from "react-redux";
import {
	uploadImage,
	updateUserDetails,
} from "../redux/actions/profileActions";

// Util
import _ from "lodash";
import { isValidUrl, isNullOrEmpty } from "../utils/functions";

const AuthProfileContainer = ({ authUser, uploadImage, updateUserDetails }) => {
	const {
		bio,
		website,
		location,
		error,
		isEditDialogOpen,
		openEditDialogWithState,
		closeDialog,
		setBio,
		setLocation,
		setWebsite,
		setError,
	} = useEditProfileReducer();

	const onImageChange = (e) => {
		const image = e.target.files[0];
		const formData = new FormData();
		formData.append("image", image, image.name);
		uploadImage(formData);
	};
	const onEditImageClick = (fileInput) => {
		fileInput.click();
	};

	const onEditSubmit = async () => {
		let submitError = {};
		if (!isNullOrEmpty(website)) {
			if (!isValidUrl(website)) {
				submitError.website = "Please add a valid url";
				setError(submitError);
				return;
			}
		}
		await updateUserDetails({
			bio,
			website,
			location,
		});
		closeDialog();
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
			onEditClick={() =>
				openEditDialogWithState({
					bio: authUser.authUserData.bio,
					website: authUser.authUserData.website,
					location: authUser.authUserData.location,
				})
			}
			open={isEditDialogOpen}
			onEditDialogDismiss={closeDialog}
			editData={{
				website,
				location,
				bio,
			}}
			onBioChange={setBio}
			onWebsiteChange={setWebsite}
			onLocationChange={setLocation}
			onEditSubmit={onEditSubmit}
			error={error}
		/>
	);
};
const mapActionsToProps = {
	uploadImage,
	updateUserDetails,
};

const mapStateToProps = (state) => ({
	authUser: state.authUser,
});
export default connect(
	mapStateToProps,
	mapActionsToProps
)(AuthProfileContainer);
