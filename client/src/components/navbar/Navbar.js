import React from "react";
import { withRouter } from "react-router-dom";
// Redux
import { logoutUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";

// MUI
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import HomeIcon from "@material-ui/icons/Home";
import MoreIcon from "@material-ui/icons/MoreVert";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import { Box } from "@material-ui/core";

// Components
import NotificationContainer from "../notification/NotificationContainer";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		fontSize: "1rem",
		[theme.breakpoints.up("sm")]: {
			display: "block",
			fontSize: "1.25rem",
		},
	},

	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		marginLeft: "auto",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

function PrimarySearchAppBar({ authUser, logoutUser, history }) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleSignout = () => {
		logoutUser();
		handleMenuClose();
	};
	const handleHome = () => {
		history.push("/");
		handleMenuClose();
	};

	const handleProfile = () => {
		history.push(`/profile/${authUser.authUserData.username}`);
		handleMenuClose();
	};

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleProfile}>Profile</MenuItem>
			<MenuItem onClick={handleSignout}>Logout</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem onClick={handleHome}>
				<IconButton aria-label="show 4 new mails" color="inherit">
					<HomeIcon />
				</IconButton>
				<p>Home</p>
			</MenuItem>
			<MenuItem>
				<NotificationContainer />
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<Avatar
						src={authUser.authUserData.imageUrl}
						alt={authUser.authUserData.username}
					/>
				</IconButton>
				<p>{authUser.authUserData.username}</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar variant="outlined" position="static" className={classes.appBar}>
				<Toolbar>
					<Container maxWidth="md">
						<Box
							className="w-full"
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Typography
								color="primary"
								className={classes.title}
								variant="h6"
								noWrap
							>
								DidYou
								<Box component="span" className="secondary-txt-color">
									Know
								</Box>
							</Typography>

							<div className={classes.sectionDesktop}>
								<IconButton
									onClick={handleHome}
									aria-label="main page"
									color="primary"
								>
									<HomeIcon />
								</IconButton>
								<NotificationContainer />
								<IconButton
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="primary"
								>
									<Avatar
										src={authUser.authUserData.imageUrl}
										alt={authUser.authUserData.username}
									/>
								</IconButton>
							</div>
							<div className={classes.sectionMobile}>
								<IconButton
									aria-label="show more"
									aria-controls={mobileMenuId}
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="primary"
								>
									<MoreIcon />
								</IconButton>
							</div>
						</Box>
					</Container>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}
const mapStateToProps = (state) => ({
	authUser: state.authUser,
});
const mapActionsToProps = {
	logoutUser,
};
export default withRouter(
	connect(mapStateToProps, mapActionsToProps)(PrimarySearchAppBar)
);
