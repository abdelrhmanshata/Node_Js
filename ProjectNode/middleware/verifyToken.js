const jwt = require("jsonwebtoken");
const httpStatus = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader) {
    const error = appError.create("token is required", 401, httpStatus.ERROR);
    return next(error);
  }

  const token = authHeader && authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);
    next();
  } catch (err) {
    const error = appError.create("invalid token" + err, 401, httpStatus.ERROR);
    return next(error);
  }
};

module.exports = verifyToken;
