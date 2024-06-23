const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
let controller = require("../controllers/controller");
const {validationSchema} = require("../middleware/validationSchema");

router
  .route("/")
  .get(controller.getAllCourses)
  .post(validationSchema(), controller.createCourse);

router
  .route("/:courseID")
  .get(controller.getCourse)
  .patch(controller.updateCousre)
  .delete(controller.deleteCousre);

module.exports = router;
