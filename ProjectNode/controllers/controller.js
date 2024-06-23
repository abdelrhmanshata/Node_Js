const { validationResult } = require("express-validator");
let { courses } = require("../data/courses");

const getAllCourses = (req, res) => {
  res.json(courses);
};

const getCourse = (req, res) => {
  const courseID = +req.params.courseID;
  const course = courses.find((course) => course.id === courseID);
  if (!course) {
    return res.status(404).json({
      msg: "Course not found",
    });
  }
  res.json(course);
};

const createCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const course = { id: courses.length + 1, ...req.body };
  courses.push(course);
  res.status(201).json(course);
};

const updateCousre = (req, res) => {
  const courseID = +req.params.courseID;
  let course = courses.find((course) => course.id == courseID);
  if (!course) {
    return res.status(404).json({
      msg: "Course not found",
    });
  }
  course = { ...course, ...req.body };
  res.json(course);
};

const deleteCousre = (req, res) => {
  const courseID = +req.params.courseID;
  courses = courses.filter((course) => course.id !== courseID);
  res.status(200).json({ success: true, msg: "Course deleted" });
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCousre,
  deleteCousre,
};
