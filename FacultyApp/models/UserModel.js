// require Mongoose
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const config = require("config");

// create schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must not least 3 characters"],
    maxlength: [50, "Name must not exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please fill a valid email address",
    ],
    validate: {
      validator: (val) => {
        return validator.isEmail(val);
      },
      message: "{VALUE} is not valid email",
    },
  },
  isAdmin: {
    type: Boolean,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
});

//
userSchema.method("genAuthToken", function () {
  const payload = { userID: this._id, adminRole: this.isAdmin };
  const jwtSecret = config.get("secKey");
  const token = jwt.sign(
    payload,
    jwtSecret
    //  { expiresIn: "1h" }
  );
  return token;
});

//4) create model         name of collection    schema
const User = mongoose.model("User", userSchema);

// CRUD operations
module.exports = User;
