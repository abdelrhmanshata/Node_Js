require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const config = require("config");

const errorMW = require("./middlewares/ErrorMW");

const studentRoutes = require("./routes/Students");
const studentDBRoutes = require("./routes/StudentsDB");
const userRoutes = require("./routes/User");
const adminRoutes = require("./routes/Admin");

const port = process.env.PORT || 3000;

// Handle Errors
process.on("uncaughtException", (exception) => {
  console.log("uncaught Exception");
  process.exit(1);
});

process.on("unhandleRejection", (exception) => {
  console.log("Promise Exception");
  process.exit(1);
});

if (!config.get("secKey")) {
  console.log("secKey not Found");
  process.exit(1);
}

// set connection
mongoose
  .connect("mongodb://localhost:27017/iti")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log({ err });
  });

// parse body of request with json payload
app.use(express.json());
// So read the data in the Post Method
app.use(express.urlencoded({ extended: true }));
//server files
app.use(express.static("public"));
// parser cookies
app.use(cookieParser());
// security headers api
app.use(helmet());

// User routes students
app.use("/api/students", studentRoutes);
app.use("/api/db/students", studentDBRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Handling Errors
app.use(errorMW);

app.listen(port, () => {
  console.log(`listening on ${port}!!!`);
});
