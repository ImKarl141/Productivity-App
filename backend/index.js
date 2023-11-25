import express from "express";
import mysql2 from "mysql2";
import cors from "cors";


const app = express();

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "imkarl141",
  database: "todo"
})

app.use(express.json())

app.use(cors())

app.get("/", (req, resp) => {
  resp.json("Hello from the backend of todo!")
});

app.post("/task-current", (req, resp) => {
  const q = "INSERT INTO task (`title`, `desc`, `taskDate`, `taskTag`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.taskDate,
    req.body.taskTag,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return resp.json(err);
    } return resp.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to the server!");
})