const express = require("express");
const router = express.Router();

const { getFacts, createFact } = require("../controllers/facts");

router.route("/").get(getFacts).post(createFact);

module.exports = router;
