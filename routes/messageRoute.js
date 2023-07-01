const messageController = require("../controllers/messageController");
const express = require("express");
const router = express.Router();

router.get("/", messageController.getAllUserMessages);
router.post("/", messageController.postUserMessage);
router.delete("/:messageId", messageController.deleteUserMessage);

module.exports = router;
