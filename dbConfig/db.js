const mysql = require("mysql2");

// Create a database connection pool
const db = mysql.createPool({
  host: "",
  // MySQL user ID
  user: "", 
  // MySQL user password
  password: "",
  // Name of the MySQL database
  database: "",
});

module.exports = db;
