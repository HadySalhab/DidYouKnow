const express = require("express");
const router = express.Router();

const { uploadImage, updateUserDetails } = require("../controllers/users");
const { protect } = require("../middlewares/auth");

router.post("/me/image", protect, uploadImage);
router.post("/me/details", protect, updateUserDetails);
module.exports = router;
