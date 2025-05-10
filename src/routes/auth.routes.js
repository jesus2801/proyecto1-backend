const router = require("express").Router();
const { body } = require("express-validator");
const validator = require("../middleware/validator");
const auth = require("../controllers/auth.controller");

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
  ],
  validator,
  auth.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validator,
  auth.login
);

module.exports = router;
