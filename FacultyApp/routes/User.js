const express = require("express");
const router = express.Router();
// const StudentController = require("../controllers/StudentControllerBD");
const bcrypt = require("bcrypt");
// Middleware
const UserRegisterValidator = require("../middlewares/UserValidatorRegisterMW");
const UserLoginValidator = require("../middlewares/UserValidatorLoginMW");
const User = require("../models/UserModel");

// Registration
router.post("/register", UserRegisterValidator, (req, res, next) => {
  // check if the user exists
  User.findOne({ email: req.body.email })
    .exec()
    .then(async (val) => {
      if (val) {
        return res
          .status(409)
          .json({ errors: { email: "User already exists" } });
      }
      // create a new user in the database
      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      console.log(req.body);
      const user = new User(req.body);
      user
        .save()
        .then((val) => {
          // GenAuthToke
          const token = user.genAuthToken();
          // return Token
          res.header("x-auth-token", token);
          res.status(200).json({ name: val.name, email: val.email });
        })
        .catch((err) => {
          next(err);
          // return res.status(500).json({ errors: err.errors });
        });
    });
});

router.post("/login", UserLoginValidator, (req, res, next) => {
  // check if the user exists
  User.findOne({ email: req.body.email })
    .exec()
    .then(async (user) => {
      if (!user) {
        return res.status(400).json({ errors: { email: "User Not exists" } });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res
          .status(400)
          .json({ errors: { password: "Invalid Password" } });
      }

      const token = user.genAuthToken();
      // return Token
      res.header("x-auth-token", token);
      res.cookie("token", token);
      res.status(200).json({ message: "logged-in successfully" });

      // get user token from cookies
      // console.log(req.cookies.token);
    })
    .catch((err) => {
      next(err);
      // return res.status(404).json({ errors: err.errors });
    });
});

router.get("/logout", (req, res, next) => {
  // get user token from cookies
  try {
    token = req.cookies.token;
    // Clear the cookie
    res.clearCookie("token");
    res.status(200).json({ message: "logged-out successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
