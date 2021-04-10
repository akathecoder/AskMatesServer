const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const pool = await mysql.createPool({
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
pool.connect(error => {
	if (error) throw error;
	console.log("Successfully connected to the database.");
});

module.exports = pool;
