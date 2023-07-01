const messageController = require("../controllers/messageController");
const express = require("express");
const router = express.Router();

router.get("/", messageController.getAllUserMessages);
router.post("/", messageController.postUserMessage);

module.exports = router;
