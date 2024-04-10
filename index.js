const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var mysql = require("mysql");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 8000;
// Setup your MySQL connection
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_URL,
});

connection.connect();

app.post("/api/saveTransaction", (req, res) => {
  console.log(req);
  const { sender, value, chainName, transactionHash } = req.body;

  const query =
    "INSERT INTO trx (sender, value, chainName, transactionHash) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [sender, value, chainName, transactionHash],
    (error, results, fields) => {
      if (error) throw error;
      res.send({
        success: true,
        message: "Data saved successfully",
        id: results.insertId,
      });
    }
  );
});

app.get("/", (req, res) => {
  return res.status(200).send(`<h1>Server Start at home route on port ${PORT}</h1>`);
});

// Your routes and database connection setup

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
