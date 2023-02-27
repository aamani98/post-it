const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/authController");
const {
  registerInputValidation,
  loginInputValidation,
} = require("../middlewares/authInputValidation");

router.post("/register", registerInputValidation, registerUser);

router.post("/login", loginInputValidation, loginUser);

module.exports = router;
