const validator = require("../uitl/StudentValidator");

// Helper function for formatting validation errors
function showErrors(validator) {
  // Map over each validation error to create a readable error message
  return validator.errors.map((error) => {
    // Extract the field name, defaulting to "field" if the path is empty
    const field = error.instancePath.replace("/", "") || "field";

    // Include allowed values in the message if they are specified
    const allowedValues = error.params.allowedValues
      ? `: Allowed values are ${error.params.allowedValues}`
      : "";

    // Return the formatted error message
    return `${field}: ${error.message}${allowedValues}`;
  });
}

// Middleware function for validating request body
module.exports = (req, res, next) => {
  // Validate the incoming request body
  if (validator(req.body)) {
    req.valid = 1; // Mark request as valid
    next(); // Proceed to the next middleware or route handler
  } else {
    // If validation fails, respond with a 400 Bad Request and the error details
    res.status(400).json({ errors: showErrors(validator) });
  }
};
