// Import necessary modules and setup router
const express = require("express");
const router = express.Router();
const auth = require("../../auth/auth");
const db = require("../../dbConfig/db");

// Get user information
router.get("/", auth, (req, res) => {
  // Extract user ID from authenticated request
  const { id } = req.user;

  // Define SQL query to get user information
  const sqlSelect = "SELECT * FROM user_db WHERE Id = ?";

  // Query the database to get user information
  db.query(sqlSelect, [id], (error, result) => {
    if (error) {
      // Handle database errors
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    } else if (!result || !result[0]) {
      // Handle case where user is not found
      return res.status(404).json({ message: "User Not Found" });
    } else {
      // Send user information back to client
      return res.status(200).json(result[0]);
    }
  });
});

module.exports = router;
