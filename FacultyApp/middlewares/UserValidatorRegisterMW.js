const validator = require("../uitl/UserValidatorRegister"); // Import the user registration validator

// Helper function to format validation errors into readable messages
function showErrors(validator) {
  // Map over each validation error and format it
  return validator.errors.map((error) => {
    const field = error.instancePath.replace("/", "") || "field"; // Extract the field name from the error, default to "field" if not available
    const allowedValues = error.params.allowedValues
      ? `: Allowed values are ${error.params.allowedValues}` // Include allowed values if they are specified in the error
      : "";
    return `${field}: ${error.message}${allowedValues}`; // Construct the final error message
  });
}

// Middleware function for validating user registration requests
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
