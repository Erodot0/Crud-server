// Import dependencies
const express = require("express");
const router = express.Router();
const db = require("../../dbConfig/db");
const auth = require("../../auth/auth");

// Define route handler for GET requests to "/get/"
router.get("/get/", auth, (req, res) => {
  // Get user role from request object
  const role = req.user.role;

  // Construct SQL query to get all data from "blog_db" table
  const sqlGet = "SELECT * FROM blog_db";

  // Execute SQL query and send response with result and user role
  db.query(sqlGet, (error, result) => {
    // Handle database errors
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Send response with data and user role
    res.send({ result, role });
  });
});

// Export router
module.exports = router;
