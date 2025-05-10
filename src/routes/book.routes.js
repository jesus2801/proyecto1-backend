const router = require("express").Router();
const { body, param } = require("express-validator");
const authMw = require("../middleware/auth");
const roles = require("../middleware/roles");
const validator = require("../middleware/validator");
const ctrl = require("../controllers/book.controller");

router.post(
  "/",
  authMw,
  roles("librarian"),
  [
    body("title").notEmpty(),
    body("author").notEmpty(),
    body("genre").notEmpty(),
    body("publisher").notEmpty(),
    body("publishedDate").isISO8601(),
    body("copies").isInt({ min: 0 }),
  ],
  validator,
  ctrl.create
);

router.get("/", ctrl.getAll);

router.get("/:id", [param("id").isMongoId()], validator, ctrl.getOne);

router.put(
  "/:id",
  authMw,
  roles("librarian"),
  [
    param("id").isMongoId(),
    body("title").optional().notEmpty(),
    body("author").optional().notEmpty(),
    body("genre").optional().notEmpty(),
    body("publisher").optional().notEmpty(),
    body("publishedDate").optional().isISO8601(),
    body("copies").optional().isInt({ min: 0 }),
  ],
  validator,
  ctrl.update
);

router.delete(
  "/:id",
  authMw,
  roles("librarian"),
  [param("id").isMongoId()],
  validator,
  ctrl.softDelete
);

module.exports = router;
