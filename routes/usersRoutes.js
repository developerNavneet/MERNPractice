const express = require("express");
const router = express.Router();
const auths = require("../middleware/Auth");
const usersController = require("../controllers/UsersController");
const bookControllers = require("../controllers/BookController");
const usersValidators = require("../validators/usersValidators");

router.post(
    "/registerUser",
    usersValidators.createUser,
    usersController.registerUser
);
router.post("/loginUser", usersValidators.loginUser, usersController.loginUser);
router.get("/viewAll", auths, bookControllers.viewAll);
module.exports = router;