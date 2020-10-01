const express = require("express");
const { protect } = require("../middlewares/auth");

const { addComment } = require("../controllers/comments");

const router = express.Router({ mergeParams: true });

router.route("/").post(protect, addComment);
module.exports = router;
