const express = require("express");

const router = express.Router();
const StudentController = require("../controllers/StudentControllerBD");

// Middleware
const StudentValidator = require("../middlewares/StudentValidatorMW");
const Auth = require("../middlewares/AuthMWPermission");

// validation of parameter middleware
router.param("id", (req, res, next, val) => {
  // validation of parameters
  if (/^[0-9a-fA-F]{24}$/.test(val)) {
    // add parameter as prop for req
    req.id = val;
    next();
  } else {
    res.send("Invalid parameter ID");
  }
});

router
  .route("/")
  // Request all students
  .get(StudentController.getAllStudents)
  // Create new Student
  .post(StudentValidator, Auth, StudentController.createStudent);

// Request student by id
// passing data from client to server via url parameters
router
  .route("/:id")
  .get(StudentController.getStudentByID)
  // update Student
  .put(StudentValidator, Auth, StudentController.updateStudent)
  // Delete Student
  // Request student by id
  .delete(Auth, StudentController.deleteStudent);

module.exports = router;