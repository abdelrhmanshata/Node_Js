const validator = require("validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required"],
    unique: true,
    validate: [validator.isEmail, "filed must be a valid email address"],
  },
  password: {
    type: String,
    required: [true, "password Is Required"],
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
