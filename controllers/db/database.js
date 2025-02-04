//Mysql Tietokanta yhteyteen liittyvä moduuli
const mysql = require('mysql2');
const dotenv=require('dotenv');
dotenv.config();
var connection;
//const myConnectionString = "mysql://netuser:netpass@localhost:3306/netdb";
console.log('PORT from env ' + process.env.PORT);
console.log('before create pool sql ' + process.env.MYSQL_SERVER);
connection = mysql.createPool(process.env.MYSQL_SERVER);
if (!connection) {
    throw new Error('MYSQL_SERVER environment variable is not defined');
  }
  
  console.log('Using MySQL connection string:', connection);

  connection.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Successfully connected to the database');
    connection.release();
  });
  
  module.exports = connection;