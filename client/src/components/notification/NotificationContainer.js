import React, { useReducer } from "react";

// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

// Components
import Notification from "./Notification";

const initialState = {
	anchorEl: null,
};
const notificationReducer = (state, action) => {
	switch (action.type) {
		case "OPEN_NOTIFICATION":
			return {
				...state,
				anchorEl: action.payload,
			};
		case "CLOSE_NOTIFICATION":
			return {
				...state,
				anchorEl: null,
			};
		default:
			return state;
	}
};

const NotificationContainer = ({ authUser, markNotificationsRead }) => {
	const [state, dispatch] = useReducer(notificationReducer, initialState);
	const notReadNotifications = authUser.authUserData.notifications.filter(
		(notification) => notification.read !== true
	);
	const onNotificationIconClick = (e) => {
		dispatch({
			type: "OPEN_NOTIFICATION",
			payload: e.target,
		});
	};
	const onMenuClose = () => {
		dispatch({
			type: "CLOSE_NOTIFICATION",
		});
	};
	const onMenuOpened = async () => {
		const notReadNotificationsIds = notReadNotifications.map(
			(notificaton) => notificaton.id
		);
		await markNotificationsRead(notReadNotificationsIds);
	};
	return (
		<Notification
			anchorEl={state.anchorEl}
			onNotificationIconClick={onNotificationIconClick}
			unreadNotificationCount={notReadNotifications.length}
			onMenuClose={onMenuClose}
			notifications={authUser.authUserData.notifications}
			onMenuOpened={onMenuOpened}
		/>
	);
};
const mapActionsToProps = {
	markNotificationsRead,
};

const mapStateToProps = (state) => ({
	authUser: state.authUser,
});
export default connect(
	mapStateToProps,
	mapActionsToProps
)(NotificationContainer);
