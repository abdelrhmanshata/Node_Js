const express = require("express");
const route = express.Router();

const StudentController = require("../controllers/StudentControllerBD");

// Middleware
const StudentValidator = require("../middlewares/StudentValidatorMW");
const Auth = require("../middlewares/AuthMWPermission");

// validation of parameter middleware
route.param("id", (req, res, next, val) => {
  // validation of parameters
  if (/^[0-9a-fA-F]{24}$/.test(val)) {
    // add parameter as prop for req
    req.id = val;
    next();
  } else {
    res.send("Invalid parameter ID");
  }
});

// Request all students
route.get("/", StudentController.getAllStudents);

// Request student by id
// passing data from client to server via url parameters
route.get("/:id", StudentController.getStudentByID);

// Create new Student
route.post("/", StudentValidator, Auth, StudentController.createStudent);

// Delete Student
// Request student by id
route.delete("/:id", Auth, StudentController.deleteStudent);

// update Student
route.put("/:id", StudentValidator, Auth, StudentController.updateStudent);

module.exports = route;
