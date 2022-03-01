const express = require("express");
const router = express.Router();
const usersController = require("../controllers/UsersController");

const usersValidators = require("../validators/usersValidators");

router.post(
  "/registerUser",
  usersValidators.createUser,
  usersController.registerUser
);
router.post("/loginUser", usersValidators.loginUser, usersController.loginUser);

module.exports = router;
