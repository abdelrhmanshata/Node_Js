// require Mongoose
const mongoose = require("mongoose");

// create schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    uppercase: true,
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [1, "Age must be at least 1"],
    max: [100, "Age must not exceed 100"],
  },
  grade: {
    type: String,
    required: [true, "Grade is required"],
    enum: {
      values: [
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "D-",
        "F",
      ],
      message: "{VALUE} is not a valid grade",
    },
    minlength: [1, "Grade must have at least 1 character"],
    maxlength: [2, "Grade must not exceed 2 characters"],
    validate: {
      validator: function (v) {
        return /^(A|A-|B\+|B|B-|C\+|C|C-|D\+|D|D-|F)$/.test(v);
      },
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please fill a valid email address",
    ],
  },
});

//4) create model         name of collection    schema
const Student = mongoose.model("Students", studentSchema);

// CRUD operations
module.exports = Student;
