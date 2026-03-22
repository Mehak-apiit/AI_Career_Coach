const express = require("express");
const router = express.Router();
const analyzeSkillGap = require("../controllers/skillGapController");
router.post("/analyze",analyzeSkillGap);
module.exports = router;