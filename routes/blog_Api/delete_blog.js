const express = require("express");
const router = express.Router();
const db = require("../../dbConfig/db");
const auth = require("../../auth/auth");

// Delete blog by id
router.delete("/:id", auth, (req, res) => {
  // Check if the user is authorized to perform this action
  if (req.user.role == "Guest") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;
  const sqlRemove = "DELETE FROM blog_db WHERE id = ? ";

  // Delete blog from database
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Check if the blog was deleted successfully
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Blog deleted successfully" });
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  });
});

module.exports = router;
