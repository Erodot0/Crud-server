const express = require("express");
const router = express.Router();
const db = require("../../dbConfig/db");
const auth = require("../../auth/auth");

/**
 * DELETE user by ID endpoint
 * Requires authenticated user with Admin role
 */
router.delete("/:id", auth, (req, res) => {
  // Only allow Admin users to delete users
  if (req.user.role === "Guest" || req.user.role === "Admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;
  const sqlRemove = "DELETE FROM user_db WHERE id = ? ";

  // Attempt to remove user from database
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    // If successful, return success message
    res.json({ message: `User deleted successfully` });
  });
});

module.exports = router;
