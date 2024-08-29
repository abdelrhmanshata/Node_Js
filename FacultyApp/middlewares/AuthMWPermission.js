// Import required modules
const jwt = require("jsonwebtoken");
const config = require("config");

// Middleware function to authenticate and authorize requests
module.exports = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("x-auth-token");

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).send("Access Denied: No token provided.");
  }

  try {
    // Retrieve the JWT secret key from the configuration
    const jwtSecret = config.get("secKey");

    // Verify the token using the secret key
    const decodedPayload = jwt.verify(token, jwtSecret);

    // Check if the decoded payload contains the admin role
    if (!decodedPayload.adminRole) {
      return res.status(401).send("Access Denied: Insufficient permissions.");
    }

    // If token is valid and user has admin role, proceed to the next middleware
    next();
  } catch (err) {
    // If token verification fails, return a 400 Bad Request response
    res.status(400).send("Invalid Token: Authentication failed.");
  }
};
