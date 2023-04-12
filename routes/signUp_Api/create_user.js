const express = require("express");
const router = express.Router();
const db = require("../../dbConfig/db");
const jwt = require("jsonwebtoken");

// Handle user registration
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  const user_role = "Guest";

  // Check if email already exists in the database
  const sqlSelect = "SELECT COUNT(*) as count FROM user_db WHERE email = ?";
  db.query(sqlSelect, [email], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" }); // handle database error
    }
    if (result[0].count > 0) {
      return res.status(400).json({ message: "Email already exists" }); // email already exists
    }

    // If email doesn't exist, insert new record into the database
    const sqlInsert =
      "INSERT INTO user_db (name, email, password, user_role) VALUES (?,?,?,?)";
    db.query(sqlInsert, [name, email, password, user_role], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" }); // handle database error
      }
      const token = jwt.sign(
        { id: result.insertId, role: user_role },
        "secret_code"
      ); // generate JWT
      res.json({ token }); // send JWT in the response
    });
  });
});

module.exports = router;
