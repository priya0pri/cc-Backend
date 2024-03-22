
const { Router } = require("express");
const authController = require("../../controller/authController");

const router = Router();

router.post("/register", authController.sign_up);
router.post("/login", authController.login);
router.get("/signed-user", authController.users);

module.exports = router;
