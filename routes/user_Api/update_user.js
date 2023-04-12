const express = require("express");
const router = express.Router();
const db = require("../../dbConfig/db");
const auth = require("../../auth/auth");

// Update user by ID
router.put("/:id", auth, (req, res) => {
  // Check user role
  if (req.user.role === "Guest" || req.user.role === "Admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Get ID from request parameters
  const { id } = req.params;

  // Get user data from request body
  const { name, email, password, user_role } = req.body;

  // Define SQL query to update user
  const sqlUpdate =
    "UPDATE user_db SET name = ?, email = ?, password = ?, user_role = ? WHERE id = ? ";

  // Execute SQL query with user data
  db.query(
    sqlUpdate,
    [name, email, password, user_role, id],
    (error, result) => {
      if (error) {
        // Handle database errors
        console.log(error);
        return res.status(500).json({ message: "Database error" });
      }
      // Send updated user data to client
      res.send(result);
    }
  );
});

module.exports = router;
