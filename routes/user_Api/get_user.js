const express = require("express");
const router = express.Router();
const db = require("../../dbConfig/db");
const auth = require("../../auth/auth");

//get all the users present in the db
router.get("/get", auth, (req, res) => {
  // Retrieve user role from request object
  const role = req.user.role;

  // Check if user is authorized to access the resource
  if (req.user.role === "Guest") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Query to retrieve all user data from database
  const sqlGet = "SELECT * FROM user_db";
  db.query(sqlGet, (error, result) => {
    // Handle database error
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Send response with user data and role
    res.send({ result, role });
  });
});

module.exports = router;
