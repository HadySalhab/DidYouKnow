import React, { Fragment, useRef } from "react";

// MUI
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const EditImage = ({ onImageChange, onEditImageClick }) => {
	const fileInput = useRef();
	return (
		<Fragment>
			<input
				accept="image/gif, image/jpeg, image/png"
				ref={fileInput}
				type="file"
				hidden="hidden"
				onChange={onImageChange}
			/>
			<IconButton
				tip="Edit profile picture"
				onClick={() => onEditImageClick(fileInput.current)}
			>
				<EditIcon color="primary" />
			</IconButton>
		</Fragment>
	);
};

export default EditImage;
