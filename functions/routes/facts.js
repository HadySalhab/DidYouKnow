const express = require("express");
const router = express.Router();

const { getAllFacts, createFact, getFact } = require("../controllers/facts");
const { protect } = require("../middlewares/auth");
const commentsRouter = require("./comments");

router.use("/:factId/comments", commentsRouter);
router.route("/").get(getAllFacts).post(protect, createFact);
router.route("/:factId").get(getFact);
module.exports = router;
