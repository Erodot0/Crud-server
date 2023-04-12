const express = require("express");
const router = express.Router();
const db = require("../../dbConfig/db");
const auth = require("../../auth/auth");

// POST request to create a new blog post
router.post("/", auth, (req, res) => {
  // Check if the user is authorized to create a new blog post
  if (req.user.role == "Guest") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Get the blog post title and description from the request body
  const { blog_title, blog_desc } = req.body;

  // SQL query to insert the new blog post into the database
  const sqlInsert = "INSERT INTO blog_db (blog_title, blog_desc) VALUES (?,?)";
  db.query(sqlInsert, [blog_title, blog_desc], (error, result) => {
    if (error) {
      console.log(error);
      // Return an error response if there was a problem inserting the new blog post
      return res.status(500).json({ message: "Failed to create blog post" });
    }
    // Return a success response if the new blog post was created successfully
    return res.status(200).json({ message: "Blog post created successfully" });
  });
});

module.exports = router;
