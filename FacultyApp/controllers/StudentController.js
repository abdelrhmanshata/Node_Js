// Import the StudentValidator module and StudentModel class
let validator = require("../uitl/StudentValidator");
const StudentModel = require("../models/StudentModel");

// Controller to fetch all students
const getAllStudents = (req, res) => {
  // Set CORS header to allow requests from any origin
  res.set("Access-Control-Allow-Origin", "*");
  // Fetch all students using the StudentModel and send as JSON response
  res.json(StudentModel.fetchAllStudents());
};

// Controller to fetch a specific student by ID
const getStudentByID = (req, res) => {
  // Retrieve student using the ID from request parameters
  let student = StudentModel.fetchStudentByID(req.params.id);

  // Send response based on whether the student exists
  if (student) {
    res.status(200).json(student); // 200 OK if found
  } else {
    res.status(404).send("Student not found."); // 404 Not Found if not found
  }
};

// Controller to create a new student
const createStudent = (req, res) => {
  // Validate the incoming student data using the validator
  let valid = validator(req.body);

  // If the data is valid, create and save the new student
  if (valid) {
    let std = new StudentModel(req.body);
    std.SaveStudent();
    res.send(std); // Send the created student object as the response
  } else {
    // If validation fails, collect errors and send a 403 Forbidden response
    let errors = showErrors(validator);
    return res.status(403).json({ errors });
  }
};

// Controller to delete a student by ID
const deleteStudent = (req, res) => {
  // Attempt to delete the student using the ID from request parameters
  const deleteStudent = StudentModel.deleteStudentByID(req.params.id);

  // Send response based on whether the deletion was successful
  res.send(deleteStudent ? "one element affected" : "one element not found");
};

// Controller to update an existing student's details
const updateStudent = (req, res) => {
  // Validate the incoming student data using the validator
  let valid = validator(req.body);

  // If the data is valid, update the student's details
  if (valid) {
    let value = StudentModel.UpdateStudent(req.params.id, req.body);
    res.json(value); // Send the updated student object as the response
  } else {
    // If validation fails, collect errors and send a 403 Forbidden response
    let errors = showErrors(validator);
    return res.status(403).json({ errors });
  }
};

// Function to display validation errors in a readable format
function showErrors(validator) {
  // Map through the errors and format each error message
  let errors = validator.errors.map((e) => {
    console.log(e); // Log each error for debugging
    if (e.params.allowedValues) {
      // Return a formatted message for errors with allowed values
      return `${e.instancePath.toString().replace("/", "")} : ${e.message} : ${
        e.params.allowedValues
      }`;
    }
    // Return a formatted message for general errors
    return `${e.instancePath.toString().replace("/", "")} : ${e.message}`;
  });
  return errors; // Return the formatted errors
}

// Export the controller functions for use in other files
module.exports = {
  getAllStudents,
  getStudentByID,
  createStudent,
  deleteStudent,
  updateStudent,
};
