// Import the StudentModel from the database model file
const StudentModel = require("../models/StudentModelDB");

// Controller to fetch all students
const getAllStudents = (req, res, next) => {
  // Set CORS header - consider moving this to a middleware for consistency
  res.set("Access-Control-Allow-Origin", "*");

  // Fetch all students from the database
  StudentModel.find()
    .then((students) => {
      // Send a 200 OK response with the fetched students
      res.status(200).json(students);
    })
    .catch((err) => {
      // Pass any errors to the next middleware (error handler)
      next(err);
    });
};

// Controller to fetch a specific student by ID
const getStudentByID = (req, res, next) => {
  // Find the student by ID using the ID from the request parameters
  StudentModel.findById(req.params.id)
    .then((student) => {
      if (!student) {
        // If no student is found, return a 404 Not Found response
        return res.status(404).send("Student Not Found");
      }
      // If student is found, send a 200 OK response with the student data
      res.status(200).json(student);
    })
    .catch((err) => {
      // Pass any errors to the next middleware (error handler)
      next(err);
    });
};

// Controller to create a new student
const createStudent = (req, res, next) => {
  const student = new StudentModel(req.body); // Create a new instance of StudentModel with request body data

  // Save the new student to the database
  student
    .save()
    .then((savedStudent) => {
      // Send a 201 Created response with the saved student data
      res.status(201).json(savedStudent);
    })
    .catch((err) => {
      // Pass any errors to the next middleware (error handler)
      next(err);
    });
};

// Controller to delete a student by ID
const deleteStudent = (req, res, next) => {
  // Find and delete the student by ID
  StudentModel.findByIdAndDelete(req.params.id)
    .then((deletedStudent) => {
      if (!deletedStudent) {
        // If no student is found to delete, return a 404 Not Found response
        return res.status(404).send("Student Not Found");
      }
      // If deletion is successful, send a 200 OK response
      res.status(200).send("Student successfully deleted");
    })
    .catch((err) => {
      // Pass any errors to the next middleware (error handler)
      next(err);
    });
};

// Controller to update a student's details
const updateStudent = (req, res, next) => {
  // Find the student by ID and update it with the data from the request body
  StudentModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedStudent) => {
      if (!updatedStudent) {
        // If no student is found, return a 404 Not Found response
        return res.status(404).send("Student Not Found");
      }
      // If update is successful, send a 200 OK response with the updated student data
      res.status(200).json(updatedStudent);
    })
    .catch((err) => {
      // Pass any errors to the next middleware (error handler)
      next(err);
    });
};

// Export all controller functions for use in other parts of the application
module.exports = {
  getAllStudents,
  getStudentByID,
  createStudent,
  deleteStudent,
  updateStudent,
};
