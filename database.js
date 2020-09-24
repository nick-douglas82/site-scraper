const mysql = require('mysql');
require('dotenv').config();
const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE } = require('./config');

function createConnection() {
  const con = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE
  });

  con.connect((err) => {
    if(err){
      console.log('Error connecting to Db', err);
      return;
    }
  });

  return con;
}

function insertCareer(career) {
  const con = createConnection();
  con.query('INSERT INTO careers SET ?', career, (err, res) => {
    if(err) throw err;
  });

  con.end((err) => {
    console.log("connection closed");
  });
}

function truncateDatabase () {
  const con = createConnection();

  con.query('TRUNCATE TABLE careers', [], (err, res) => {
    if(err) throw err;
  });

  con.end((err) => {
    console.log("connection closed");
  });
}

module.exports = {
  truncateDatabase,
  insertCareer
}
