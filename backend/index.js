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


//Create 
app.post("/task_list", (req, resp) => {
  const q = "INSERT INTO task_list (`title`, `desc`, `taskDate`, `taskTag`) VALUES (?)";
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

app.post("/projects_list", (req, resp) => {
  const q = "INSERT INTO projects_list (`project_name`, `project_color`) VALUES (?)";
  const values = [
    req.body.project_name,
    req.body.project_color,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return resp.json(err);
    return resp.json("Project added successfully")
  })
})

app.post("/tags_list", (req, resp) => {
  const q = "INSERT INTO tags_list (`tag_name`, `tag_color`) VALUES (?)"
  const values = [
    req.body.tag_name,
    req.body.tag_color,
  ]
  db.query(q, [values], (err, data) => {
    if (err) return resp.json(err);
    return resp.json("Tag added successfully");
  })
})


//Read
app.get("/", (req, resp) => {
  resp.json("Hello from the backend of todo!")
});


//Update


//Delete


app.listen(8800, () => {
  console.log("Connected to the server!");
})