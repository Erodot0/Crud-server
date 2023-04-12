// Import modules
const express = require("express");
const router = express.Router();
const db = require("../../dbConfig/db");
const auth = require("../../auth/auth");

// Route for getting blog post by ID
router.get("/:id", auth, (req, res) => {
  // Check if user is authorized
  if (req.user.role === "Guest") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Get post ID from request parameter
  const { id } = req.params;

  // Define SQL query to get post by ID
  const sqlGetPost = "SELECT * FROM blog_db WHERE id = ?";

  // Execute query with database connection
  db.query(sqlGetPost, id, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    // Send post data as response
    res.json(result);
  });
});

// Export router
module.exports = router;
