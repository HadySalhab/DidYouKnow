import React from "react";
import { connect } from "react-redux";

// Components
import EditImage from "./EditImage";

// Redux
import { uploadImage } from "../../redux/actions/profileActions";

const EditImageContainer = ({ uploadImage }) => {
	const onEditImageClick = (fileInput) => {
		fileInput.click();
	};
	const onImageChange = (e) => {
		const image = e.target.files[0];
		const formData = new FormData();
		formData.append("image", image, image.name);
		uploadImage(formData);
	};
	return (
		<EditImage
			onImageChange={onImageChange}
			onEditImageClick={onEditImageClick}
		/>
	);
};
const mapActionsToProps = {
	uploadImage,
};

export default connect(null, mapActionsToProps)(EditImageContainer);
