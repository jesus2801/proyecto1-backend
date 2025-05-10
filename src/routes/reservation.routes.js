const router = require("express").Router();
const { body, param } = require("express-validator");
const authMw = require("../middleware/auth");
const validator = require("../middleware/validator");
const ctrl = require("../controllers/reservation.controller");

router.post(
  "/",
  authMw,
  [body("book").isMongoId().withMessage("Valid book ID required")],
  validator,
  ctrl.reserve
);

router.get(
  "/user/:id",
  authMw,
  [param("id").isMongoId().withMessage("Valid user ID required")],
  validator,
  ctrl.getUserHistory
);

router.get(
  "/book/:id",
  authMw,
  [param("id").isMongoId().withMessage("Valid book ID required")],
  validator,
  ctrl.getBookHistory
);

module.exports = router;
