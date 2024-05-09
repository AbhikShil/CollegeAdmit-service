const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const { upload, remove } = require("../controllers/imageupload");

router.post("/uploadimages", authCheck, authCheck, upload);
router.post("/removeimage", authCheck, authCheck, remove);

module.exports = router;
