require("dotenv").config();

module.exports = {
  HOST: process.env.MYSQL_DB_HOST,
  USER: process.env.MYSQL_DB_USER,
  PASSWORD: process.env.MYSQL_DB_PASSWORD,
  DB: process.env.MYSQL_DB_DATABASE,
  PORT: process.env.MYSQL_PORT,
};
