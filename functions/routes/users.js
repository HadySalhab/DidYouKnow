const express = require("express");
const router = express.Router();

const { uploadImage } = require("../controllers/users");
const { protect } = require("../middlewares/auth");

router.post("/me/image", protect, uploadImage);

module.exports = router;
