const express = require("express");
const router = express.Router();
const db = require("../../dbConfig/db");
const auth = require("../../auth/auth");

/*
 * This route is responsible for getting a user by id.
 */
router.get("/:id", auth, (req, res) => {
  // Check if user is authorized
  if (req.user.role === "Guest" || req.user.role === "Admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;
  const sqlGet = "SELECT * FROM user_db WHERE id = ?";

  // Query the database for the user with the specified id
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      // Handle database error
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
    res.send(result);
  });
});

module.exports = router;
