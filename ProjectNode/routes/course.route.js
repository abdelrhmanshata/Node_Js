const express = require("express");
const router = express.Router();
let controller = require("../controllers/course.controller");
const { validationSchema } = require("../middleware/validationSchema");
const verifyToken = require("../middleware/verifyToken");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middleware/allowedTo");

router
  .route("/")
  .get(controller.getAllCourses)
  .post(validationSchema(), controller.createCourse);

router
  .route("/:courseID")
  .get(controller.getCourse)
  .patch(controller.updateCousre)
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANGER),
    controller.deleteCousre
  );

module.exports = router;
