const express = require("express");
const router = express.Router();
const generateInterviewQuestions = require("../controllers/interviewController");
router.post("/generate",generateInterviewQuestions);
module.exports = router;