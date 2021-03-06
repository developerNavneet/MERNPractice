const express = require("express");

const router = express.Router();
const bookControllers = require("../controllers/BookController");
const fileUpload = require("../middleware/fileUpload");
const bookValidator = require("../validators/bookValidators");

router.post(
  "/createBook",

  fileUpload.imageUpload.single("profile_pic"),
  bookValidator.createBook,
  bookControllers.insertBook
);
router.get("/deleteBook", bookValidator.deleteBook, bookControllers.removeBook);
router.get("/viewAll", bookControllers.viewAll);
router.get("/searchBook", bookControllers.searchBook);
router.delete(
  "/deleteBook",
  bookValidator.deleteBooks,
  bookControllers.deleteBook
);
router.put("/updateBook", bookControllers.updateBook);

module.exports = router;
