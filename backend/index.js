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
  const q = "INSERT INTO TaskCurrent (`task_title`, `task_desc`, `taskDate`, `task_project`, `task_tag`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.taskDate,
    req.body.taskProject,
    req.body.taskTag,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return resp.json(err);
    } return resp.json(data);
  });
});

app.post("/projects_list", (req, resp) => {
  const q = "INSERT INTO ProjectList (`project_name`, `project_color`) VALUES (?)";
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
  const q = "INSERT INTO TagList (`tag_name`, `tag_color`) VALUES (?)"
  const values = [
    req.body.tag_name,
    req.body.tag_color,
  ]
  db.query(q, [values], (err, data) => {
    if (err) return resp.json(err);
    return resp.json("Tag added successfully");
  })
})

////////////////////////////////////////////////////////////////////////

//Read
app.get("/", (req, resp) => {
  resp.json("Hello from the backend of todo!")
});

app.get("/ProjectList", (req, resp) => {
  const q = "SELECT * FROM ProjectList";
  db.query(q, (err, data) => {
    if (err) {
      return resp.json(err);
    } return resp.json(data);
  })
})

app.get("/TagList", (req, resp) => {
  const q = "SELECT * FROM TagList";
  db.query(q, (err, data) => {
    if (err) {
      return resp.json(err);
    } return resp.json(data);
  })
})

app.get("/TaskCurrent", (req, resp) => {
  // const q = "SELECT t.id, t.task_title, t.task_desc, t.task_date, p.project_name, p.project_color, t.task_tag FROM `ProjectList` p RIGHT JOIN `TaskCurrent` t ON p.id = t.task_project";

  const q = "SELECT t.id, t.task_title, t.task_desc, t.task_date, p.project_name, p.project_color, tg.tag_name, tg.tag_color FROM `TaskCurrent` t LEFT JOIN `ProjectList` p ON t.task_project = p.id LEFT JOIN `TagList` tg ON t.task_tag = tg.id";
  db.query(q, (err, data) => {
    if (err) {
      return resp.json(err);
    } return resp.json(data);
  })
})
////////////////////////////////////////////////////////////////////////

//Update


//Delete


app.listen(8800, () => {
  console.log("Connected to the server!");
})