const httpStatus = require("../utils/httpStatusText");
const appError = require("../utils/appError");
module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(
        appError.create(
          "User is not authorized to delete",
          401,
          httpStatus.FAIL
        )
      );
    }
    next();
  };
};
