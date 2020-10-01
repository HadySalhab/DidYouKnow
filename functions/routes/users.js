const express = require("express");
const router = express.Router();

const {
	markNotificationsRead,
	getUserDetails,
	uploadAuthenticatedUserImage,
	updateAuthenticatedUserDetails,
	getAuthenticatedUserDetails,
} = require("../controllers/users");
const { protect } = require("../middlewares/auth");

router.get("/:username", getUserDetails);
router.get("/me/details", protect, getAuthenticatedUserDetails);
router.post("/me/image", protect, uploadAuthenticatedUserImage);
router.post("/me/details", protect, updateAuthenticatedUserDetails);
router.post("/me/notifications", protect, markNotificationsRead);

module.exports = router;
