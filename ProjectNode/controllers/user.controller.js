const httpStatus = require("../utils/httpStatusText");
const User = require("../models/user.model");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/generateJWT");

const getAllUser = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;

  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip((page - 1) * limit);
  res.status(200).json({ status: httpStatus.SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    const error = appError.create(
      "User is already exists",
      400,
      httpStatus.FAIL
    );
    return next(error);
  }

  // password Hash
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  // generate token
  const token = await generateJWT({ email: newUser.email, id: newUser._id });
  newUser.token = token;

  await newUser.save();
  res.status(201).json({ status: httpStatus.SUCCESS, data: { user: newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    const error = appError.create(
      "Email and password are required",
      400,
      httpStatus.FAIL
    );
    return next(error);
  }

  try {
    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = appError.create("User not found", 400, httpStatus.FAIL);
      return next(error);
    }

    // Compare provided password with stored password
    const matchedPassword = await bcrypt.compare(password, user.password);
    console.log(matchedPassword); // Debugging purpose

    // Check if password matches
    if (matchedPassword) {
      // generate token
      const token = await generateJWT({ email: user.email, id: user._id });
      user.token = token;

      return res.status(200).json({
        status: httpStatus.SUCCESS,
        data: { token: user.token },
      });
    } else {
      const error = appError.create("Invalid password", 400, httpStatus.FAIL);
      return next(error);
    }
  } catch (error) {
    // Handle unexpected errors
    const serverError = appError.create(
      "Something went wrong " + error,
      500,
      httpStatus.ERROR
    );
    return next(serverError);
  }
});

module.exports = {
  getAllUser,
  register,
  login,
};
