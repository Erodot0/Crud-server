const jwt = require("jsonwebtoken");

// Middleware function to check if the user is authenticated
const auth = (req, res, next) => {
  // Get the token from the authorization header
  const token = req.headers.authorization;

  // If there's no token, return an unauthorized error message
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    // If there is a token, extract it from the authorization header and verify it
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, "secret_code");

      // If the token is valid, set the user object on the request and call next to continue processing
      req.user = decoded;
      next();
    } catch (err) {
      console.error(err);
      // If there's an error with the token, return a server error message
      res.status(500).json({ message: token });
    }
  }
};

module.exports = auth;
