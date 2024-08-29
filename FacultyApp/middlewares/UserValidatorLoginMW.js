const validator = require("../uitl/UserValidatorLogin"); // Import the user validation function

// Helper function to format validation errors into readable messages
function showErrors(validator) {
  // Map over each validation error and format it
  return validator.errors.map((error) => {
    const field = error.instancePath.replace("/", "") || "field"; // Get the field name causing the error, default to "field"
    const allowedValues = error.params.allowedValues
      ? `: Allowed values are ${error.params.allowedValues}` // If there are allowed values, include them in the message
      : "";
    return `${field}: ${error.message}${allowedValues}`; // Construct the final error message
  });
}

// Middleware function for validating login requests
module.exports = (req, res, next) => {
  // Validate the request body using the imported validator
  if (validator(req.body)) {
    req.valid = 1; // Mark request as valid
    next(); // Proceed to the next middleware or route handler
  } else {
    // If validation fails, respond with a 400 Bad Request and the error details
    res.status(400).json({ errors: showErrors(validator) });
  }
};
