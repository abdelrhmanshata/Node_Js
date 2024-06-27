const { validationResult } = require("express-validator");
const httpStatus = require("../utils/httpStatusText");

const Course = require("../models/course.model");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");

// Get All Course
const getAllCourses = asyncWrapper(async (req, res) => {
  // get all courses from the database using the Course model
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;

  const courses = await Course.find({}, { __v: false })
    .limit(limit)
    .skip((page - 1) * limit);
  res.status(200).json({ status: httpStatus.SUCCESS, data: { courses } });
});

// Get Course
const getCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.courseID);
  if (!course) {
    const error = appError.create("Course not found", 404, httpStatus.FAIL);
    return next(error);
  }
  return res.status(200).json({ status: httpStatus.SUCCESS, data: { course } });
});

// Create Course
const createCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  return res
    .status(200)
    .json({ status: httpStatus.SUCCESS, data: { course: newCourse } });
});

// Update Course
const updateCousre = asyncWrapper(async (req, res, next) => {
  const courseID = req.params.courseID;
  if (!courseID) {
    const error = appError.create(
      "Course ID is required",
      400,
      httpStatus.ERROR
    );
    return next(error);
  }

  const updateData = { ...req.body };
  const updatedCourse = await Course.findByIdAndUpdate(
    courseID,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedCourse) {
    const error = appError.create("Course not found", 404, httpStatus.ERROR);
    return next(error);
  }

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { course: updatedCourse },
  });
});

// Delete Course
const deleteCousre = asyncWrapper(async (req, res) => {
  const course = await Course.deleteOne({ _id: req.params.courseID });
  if (!course) {
    const error = appError.create("Course not found", 404, httpStatus.ERROR);
    return next(error);
  }

  return res.status(200).json({ status: httpStatus.SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCousre,
  deleteCousre,
};
