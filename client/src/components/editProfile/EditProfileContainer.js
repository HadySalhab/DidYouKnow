import React from "react";

// Components
import EditProfile from "./EditProfile";

// Hook
import useEditProfileReducer from "../../hooks/useEditProfileReducer";

// Util
import { isValidUrl, isNullOrEmpty } from "../../utils/functions";

// Redux
import { updateUserDetails } from "../../redux/actions/profileActions";
import { connect } from "react-redux";

const EditProfileContainer = ({ authUser, updateUserDetails }) => {
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
		<EditProfile
			editData={{
				website,
				location,
				bio,
			}}
			open={isEditDialogOpen}
			onEditClick={() =>
				openEditDialogWithState({
					bio: authUser.authUserData.bio,
					website: authUser.authUserData.website,
					location: authUser.authUserData.location,
				})
			}
			onEditDialogDismiss={closeDialog}
			onBioChange={setBio}
			onWebsiteChange={setWebsite}
			onLocationChange={setLocation}
			onEditSubmit={onEditSubmit}
			error={error}
		/>
	);
};

const mapStateToProps = (state) => ({
	authUser: state.authUser,
});
const mapActionsToProps = {
	updateUserDetails,
};
export default connect(
	mapStateToProps,
	mapActionsToProps
)(EditProfileContainer);
