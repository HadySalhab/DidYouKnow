const express = require("express");
const router = express.Router();

const { getAllFacts, createFact, getFact } = require("../controllers/facts");
const { addLike, removeLike } = require("../controllers/likes");
const { protect } = require("../middlewares/auth");
const commentsRouter = require("./comments");

router.use("/:factId/comments", commentsRouter);
router.route("/").get(getAllFacts).post(protect, createFact);
router.route("/:factId").get(getFact);
router.route("/:factId/like").get(protect, addLike);
router.route("/:factId/unlike").get(protect, removeLike);
module.exports = router;
