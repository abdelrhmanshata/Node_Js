require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const httpStatus = require("./utils/httpStatusText");

const mongoose = require("mongoose");
const url = process.env.MangoDB_Url;
mongoose
  .connect(url)
  .then((res) => {
    console.log("Connected to MongoDB Successfully");
  })
  .catch((err) => {
    console.log("Error : ", err);
  });

const coursesRouter = require("./routes/route");
app.use("/api/courses", coursesRouter); // localhost / => /api/courses   routes

// global middleware for not found router
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: httpStatus.ERROR,
    message: "this resource is not available",
    code: 404,
  });
});

// global error handler
app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatus.ERROR,
    code: error.statusCode || 500,
    message: error.message,
    data: null,
  });
});

app.listen(process.env.PORT, () => {
  console.log("Example app listening on port 5000!");
});
