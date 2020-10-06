import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";

const Notification = () => {
	return (
		<IconButton aria-label="show 11 new notifications" color="primary">
			<Badge badgeContent={11} color="secondary">
				<NotificationsIcon />
			</Badge>
		</IconButton>
	);
};

export default Notification;
