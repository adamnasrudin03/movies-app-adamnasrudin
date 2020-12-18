const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const controllers = require("../controllers/Movies");

router.post(
  "/movies",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Incorrect title input, min 5 characters "),
  ],
  controllers.create
);
router.get("/movies", controllers.getAll);
router.get("/movies/:id", controllers.getById);

module.exports = router;
