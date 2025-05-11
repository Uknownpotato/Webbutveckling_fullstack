const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abc123",
  database: "webshop",
});

db.connect((err) => {
  if (err) {
    console.error("Kunde inte ansluta till databasen:", err);
  } else {
    console.log("Ansluten till MySQL-databasen");
  }
});

module.exports = db;
