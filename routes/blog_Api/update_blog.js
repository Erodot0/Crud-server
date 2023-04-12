const express = require("express");
const router = express.Router();
const db = require("../../dbConfig/db");
const auth = require("../../auth/auth");

// Route to update a blog post
router.put("/:id", auth, (req, res) => {
  // Check if user is authorized
  if (req.user.role === "Guest") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Get blog post ID from request parameters
  const { id } = req.params;

  // Get blog post title and description from request body
  const { blog_title, blog_desc } = req.body;

  // SQL query to update the blog post
  const sqlUpdate =
    "UPDATE blog_db SET blog_title = ?, blog_desc = ? WHERE id = ? ";

  // Execute the SQL query with the blog post data
  db.query(sqlUpdate, [blog_title, blog_desc, id], (error, result) => {
    if (error) {
      // Handle database errors by sending an error response to the client
      console.log(error);
      res.status(500).json({ message: "Database error" });
    } else {
      // Send the updated blog post as the response
      res.send(result);
    }
  });
});

module.exports = router;
