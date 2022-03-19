const mysql = require(mysql);
const util = require(util);

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

db.connect();

db.query = util.promisify(db.query);

module.exports = db;
