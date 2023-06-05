const controller = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/signup", controller.signupUser);
router.post("/signin", controller.sinInUser);

module.exports = router;
