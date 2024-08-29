// Error-handling middleware function
module.exports = (err, req, res, next) => {
  // Check if there are validation errors in the error object
  if (err.errors) {
    // Loop through each error and log the error message to the console
    for (let e in err.errors) {
      console.log(err.errors[e].message);
    }
    // Respond with a 500 Internal Server Error and return the error details as JSON
    return res.status(500).json({ errors: err.errors });
  }

  // If no specific errors are found, send a generic 500 response
  res.status(500).send("Internal Server Error");
};
