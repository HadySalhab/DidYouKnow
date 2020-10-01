const express = require("express");
const router = express.Router();

const {
	uploadAuthenticatedUserImage,
	updateAuthenticatedUserDetails,
	getAuthenticatedUserDetails,
} = require("../controllers/users");
const { protect } = require("../middlewares/auth");

router.get("/me/details", protect, getAuthenticatedUserDetails);
router.post("/me/image", protect, uploadAuthenticatedUserImage);
router.post("/me/details", protect, updateAuthenticatedUserDetails);
module.exports = router;
