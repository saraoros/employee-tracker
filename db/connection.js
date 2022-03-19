// Create connection
const mysql = require('mysql2');

require('dotenv').config();

// Connect to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

module.exports = connection;
