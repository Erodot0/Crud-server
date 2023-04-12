const express = require("express");
const router = express.Router();
const db = require("../../dbConfig/db");
const jwt = require("jsonwebtoken");

// Handle login request
router.post("/", (req, res) => {
  // Retrieve email and password from request body
  const { email, password } = req.body;
  
  // Define SQL query to find user with matching email and password
  const sqlQuery = "SELECT * FROM user_db WHERE email = ? AND password = ?";
  
  // Execute query with user-supplied values for email and password
  db.query(sqlQuery, [email, password], (error, result) => {
    // Handle database query error
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    } else {
      // If no matching user is found, send an "Invalid credentials" error response
      if (result.length === 0) {
        res.status(401).json({ message: "Invalid credentials" });
      } else {
        // If a matching user is found, create a JWT with the user's ID and role
        const user = result[0];
        const token = jwt.sign({ id: user.Id, role: user.user_role }, "secret_code");
        // Send the token back as a response
        res.json({ token });
      }
    }
  });
});

module.exports = router;
