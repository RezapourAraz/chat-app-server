const chatController = require("../controllers/chatController");
const express = require("express");

const router = express.Router();

router.post("/", chatController.createOrGetChat);
router.get("/:userId", chatController.getAllUserChat);
router.delete("/:chatId", chatController.deleteUserChat);

module.exports = router;
