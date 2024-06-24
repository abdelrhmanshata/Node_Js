const { validationResult } = require("express-validator");
// let { courses } = require("../data/courses");

const Course = require("../models/course.model");

const getAllCourses = async (req, res) => {
  // get all courses from the database using the Course model
  const courses = await Course.find();
  console.log(courses);
  res.json(courses);
};

const getCourse = async (req, res) => {
  // const courseID = +req.params.courseID;
  // const course = courses.find((course) => course.id === courseID);

  Course.findById(req.params.courseID)
    .then((course) => {
      if (!course) {
        return res.status(404).json({
          msg: "Course not found",
        });
      }
      return res.json(course);
    })
    .catch((err) => {
      console.log("Error : ", err);
      return res.status(400).json({
        msg: "Invalid Object ID",
      });
    });
};

const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  // const course = { id: courses.length + 1, ...req.body };
  // courses.push(course);

  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
};

const updateCousre = async (req, res) => {
  const courseID = req.body.courseID;
  try {
    const updateCourse = await Course.updateOne(
      { _id: courseID },
      {
        $set: { ...req.body },
      }
    );
    return res.status(200).json(updateCourse);
  } catch (err) {
    return res.status(400).json({ "Error : ": err });
  }

  // const courseID = +req.params.courseID;
  // let course = courses.find((course) => course.id == courseID);
  // if (!course) {
  //   return res.status(404).json({
  //     msg: "Course not found",
  //   });
  // }
  // course = { ...course, ...req.body };
  // res.json(course);
};

const deleteCousre = async (req, res) => {
  const result = await Course.deleteOne({ _id: req.params.courseID });
  res.status(200).json({ success: true, msg: result });

  // const courseID = +req.params.courseID;
  // courses = courses.filter((course) => course.id !== courseID);
  // res.status(200).json({ success: true, msg: "Course deleted" });
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCousre,
  deleteCousre,
};
