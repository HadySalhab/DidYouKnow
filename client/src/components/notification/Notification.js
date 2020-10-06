import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// MUI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Util
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Notification = ({
	unreadNotificationCount,
	anchorEl,
	onNotificationIconClick,
	onMenuClose,
	notifications,
	onMenuOpened,
}) => {
	dayjs.extend(relativeTime);
	const smallerThanMedium = useMediaQuery((theme) =>
		theme.breakpoints.down("md")
	);

	const render = () => {
		return (
			<Fragment>
				<IconButton
					onClick={onNotificationIconClick}
					aria-label="show 11 new notifications"
					color="primary"
				>
					<Badge badgeContent={unreadNotificationCount} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				{smallerThanMedium && (
					<p onClick={onNotificationIconClick}>Notifications</p>
				)}
				<Menu
					onClose={onMenuClose}
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onEntered={onMenuOpened}
				>
					{getMenuItemContent()}
				</Menu>
			</Fragment>
		);
	};

	const getMenuItemContent = () => {
		if (notifications.length === 0) {
			return <MenuItem>No notifications yet</MenuItem>;
		} else {
			return (
				<Box
					fullWidth
					display="flex"
					flexDirection="column"
					justifyContent="center"
				>
					{notifications.map((notification) => {
						const verb =
							notification.type === "like" ? "liked" : "commented on";
						const time = dayjs(notification.createdAt).fromNow();
						const iconColor = notification.read ? "primary" : "secondary";
						return (
							<MenuItem key={notification.id}>
								{notification.type === "like" ? (
									<FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
								) : (
									<ChatIcon color={iconColor} style={{ marginRight: 10 }} />
								)}
								<Typography
									component={Link}
									color="primary"
									variant="body1"
									to={`/facts/${notification.fact}`}
								>
									{notification.sender} {verb} your fact {time}
								</Typography>
							</MenuItem>
						);
					})}
				</Box>
			);
		}
	};

	return (
		<Fragment>
			{smallerThanMedium ? <MenuItem>{render()}</MenuItem> : render()}
		</Fragment>
	);
};

export default Notification;
