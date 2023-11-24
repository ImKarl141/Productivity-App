import express from "express";
import mysql2 from "mysql2";

const app = express();

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "imkarl141",
  database: "todo"
})

app.get("/", (req, resp) => {
  resp.json("Hello from the backend of todo!")
})

app.listen(8800, () => {
  console.log("Connected to the server!");
})