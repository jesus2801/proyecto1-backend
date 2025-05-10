const router = require("express").Router();
const { body, param } = require("express-validator");
const authMw = require("../middleware/auth");
const validator = require("../middleware/validator");
const ctrl = require("../controllers/user.controller");

router.get("/me", authMw, ctrl.getProfile);

router.put(
  "/:id",
  authMw,
  [
    param("id").isMongoId().withMessage("Invalid user ID"),
    body("email").optional().isEmail().withMessage("Valid email required"),
    body("name").optional().notEmpty(),
    body("roles").optional().isArray(),
  ],
  validator,
  ctrl.update
);

router.delete(
  "/:id",
  authMw,
  [param("id").isMongoId().withMessage("Invalid user ID")],
  validator,
  ctrl.softDelete
);

module.exports = router;
