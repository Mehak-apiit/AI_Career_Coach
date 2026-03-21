const express = require("express");
const router = express.Router();
const multer = require("multer");
const analyzeResume = require("../controllers/resumeController");
const upload = multer({dest:
    "uploads/"});
router.post("/upload",
upload.single("resume"),
analyzeResume
);
module.exports = router;