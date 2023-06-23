const express = require("express");
const {
  login,
  register,
  addProfile,
  getProfile,
  logInWithGoogle,
} = require("../contollers/userContollers");
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logInWithGoogle", logInWithGoogle);
router.post("/addProfile/:id", authUser, addProfile);
router.get("/getProfile/:id", authUser, getProfile);

module.exports = router;
