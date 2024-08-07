// Connect to the database
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'psql',
  // Your MySQL password
  password: 'Kingjayce21!',
  database: 'employee_db'
});

module.exports = db;