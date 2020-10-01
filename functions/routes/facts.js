const express = require("express");
const router = express.Router();

const { getFacts, createFact } = require("../controllers/facts");
const { protect } = require("../middlewares/auth");

router.route("/").get(getFacts).post(protect, createFact);

module.exports = router;
