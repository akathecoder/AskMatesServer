const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  waitForConnections: true,
  connectionLimit: 3,
  queueLimit: 0,
});

// open the MySQL connection
pool.getConnection((err, conn) => {
  if (err) throw err;
  console.log("Successfully connected to the database.");
});

module.exports = pool;
