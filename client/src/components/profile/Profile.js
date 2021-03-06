import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Components
import EditProfileContainer from "../editProfile/EditProfileContainer";
import EditImageContainer from "../editImage/EditImageContainer";
// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Box from "@material-ui/core/Box";

// Util
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	cardProfile: {
		maxWidth: "600px",
		margin: "0 auto",
	},
}));

const Profile = ({ user, withEdit, onImageChange, onEditImageClick }) => {
	const { imageUrl, website, location, bio, username, createdAt } = user;
	const classes = useStyles();

	dayjs.extend(relativeTime);

	return (
		<Card variant="outlined" className={classes.cardProfile}>
			<Box p={2}>
				<div className={classes.profile}>
					<div className="image-wrapper">
						<img src={imageUrl} alt="profile" className="profile-image" />
						{withEdit && <EditImageContainer />}
					</div>
					<hr />
					<div className="profile-details">
						<MuiLink
							component={Link}
							to={`/profile/${username}`}
							color="secondary"
							variant="h5"
						>
							@{username}
						</MuiLink>
						<hr />
						{bio && <Typography variant="body2">{bio}</Typography>}
						<hr />
						{location && (
							<Fragment>
								<LocationOn color="primary" /> <span>{location}</span>
								<hr />
							</Fragment>
						)}
						{website && (
							<Fragment>
								<LinkIcon color="primary" />
								<a
									href={website}
									target="_blank"
									rel="noopener noreferrer"
									style={{ marginLeft: "4px" }}
								>
									{website}
								</a>
								<hr />
							</Fragment>
						)}
						<CalendarToday color="primary" />{" "}
						<span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
					</div>
				</div>
				{withEdit && <EditProfileContainer />}
			</Box>
		</Card>
	);
};

export default Profile;
