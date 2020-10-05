import React, { Fragment } from "react";

// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import makeStyles from "@material-ui/core/styles/makeStyles";
// Icons
import EditIcon from "@material-ui/icons/Edit";
const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
}));

const EditProfile = ({
	open,
	onEditClick,
	onEditDialogDismiss,
	editData = {},
	onBioChange,
	onWebsiteChange,
	onLocationChange,
	onEditSubmit,
	error = {},
}) => {
	const { bio, location, website } = editData;
	const classes = useStyles();
	return (
		<Fragment>
			<Button
				variant="contained"
				color="secondary"
				className={classes.formSubmit}
				fullWidth
				onClick={onEditClick}
			>
				Edit Profile
			</Button>
			<Dialog open={open} fullWidth maxWidth="sm">
				<DialogTitle>Edit your details</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							name="bio"
							tpye="text"
							label="Bio"
							multiline
							rows="3"
							value={bio}
							onChange={onBioChange}
							placeholder="A short bio about yourself"
							className={classes.textField}
							error={error.bio ? true : false}
							helperText={error.bio}
							fullWidth
						/>
						<TextField
							name="website"
							tpye="text"
							label="Website"
							value={website}
							onChange={onWebsiteChange}
							placeholder="Your personal/professinal website"
							className={classes.textField}
							error={error.website ? true : false}
							helperText={error.website}
							fullWidth
						/>
						<TextField
							name="location"
							tpye="text"
							label="Location"
							value={location}
							onChange={onLocationChange}
							placeholder="Where you live"
							className={classes.textField}
							error={error.location ? true : false}
							helperText={error.location}
							fullWidth
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={onEditDialogDismiss} color="primary">
						Cancel
					</Button>
					<Button onClick={onEditSubmit} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

export default EditProfile;
