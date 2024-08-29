const express = require("express");
const route = express.Router();

const StudentController = require("../controllers/StudentController");

// Middleware
route.all("/", (req, res, next) => {
  console.log("request received on students Collections...");
  next();
});
// validation of parameter middleware
route.param("id", (req, res, next, val) => {
  // validation of parameters
  if (Number(val)) {
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
route.post("/", StudentController.createStudent);

// Delete Student
// Request student by id
route.delete("/:id", StudentController.deleteStudent);

// update Student
route.put("/:id", StudentController.updateStudent);

module.exports = route;
