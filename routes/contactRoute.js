const contactController = require("../controllers/contactController");
const express = require("express");

const router = express.Router();

router.post("/", contactController.addContact);
router.get("/:userId", contactController.getAllContacts);
router.delete("/:contactId", contactController.deleteUserChat);

module.exports = router;
