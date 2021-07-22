const mysql = require("mysql");

const connection = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'ar_db',
  });
  
  // open the MySQL connection
  connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
  
  module.exports = connection;