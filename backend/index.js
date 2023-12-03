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
app.post("/TaskCurrent", (req, resp) => {
  const q = "INSERT INTO `TaskCurrent` (`task_title`, `task_desc`, `task_date`, `task_project`, `task_tag`) VALUES (?)";
  const values = [
    req.body.task_title,
    req.body.task_desc,
    req.body.task_date,
    req.body.task_project,
    req.body.task_tag,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return resp.json(err);
    } return resp.json(data);
  });
});

app.post("/ProjectList", (req, resp) => {
  const q = "INSERT INTO `ProjectList` (`project_name`, `project_color`) VALUES (?)";
  const values = [
    req.body.project_name,
    req.body.project_color,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return resp.json(err);
    return resp.json("Project added successfully")
  })
})

app.post("/TagList", (req, resp) => {
  const q = "INSERT INTO `TagList` (`tag_name`, `tag_color`) VALUES (?)"
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
  const q = "SELECT t.id, t.task_title, t.task_desc, t.task_date, p.project_name, p.project_color, tg.tag_name, tg.tag_color FROM `TaskCurrent` t LEFT JOIN `ProjectList` p ON t.task_project = p.id LEFT JOIN `TagList` tg ON t.task_tag = tg.id";
  db.query(q, (err, data) => {
    if (err) {
      return resp.json(err);
    } return resp.json(data);
  })
})
////////////////////////////////////////////////////////////////////////

//Update

app.put("/TaskCurrent/:id", (req, resp) => {
  const taskId = req.params.id;
  const q = "UPDATE TaskCurrent SET `task_title` = ?, `task_desc` = ?, `task_date` = ?, `task_project` = ?, `task_tag` = ? WHERE id = ?"
  const values = [
    req.body.task_title,
    req.body.task_desc,
    req.body.task_date,
    req.body.task_project,
    req.body.task_tag,
  ];

  db.query(q, [...values, taskId], (err, data) => {
    if (err) return resp.json(err);
    return resp.json("Task updated successfully");
  })
})

app.put("/ProjectList/:id", (req, resp) => {
  const projectId = req.params.id;
  const q = "UPDATE ProjectList SET `project_name` = ?, `project_color` = ? WHERE id = ?"
  const values = [
    req.body.project_name,
    req.body.project_color
  ];

  db.query(q, [...values, projectId], (err, data) => {
    if (err) return resp.json(err);
    return resp.json("Project updated successfully");
  })
})

app.put("/TagList/:id", (req, resp) => {
  const tagId = req.params.id;
  const q = "UPDATE TagList SET `tag_name` = ?, `tag_color` = ? WHERE id = ?"
  const values = [
    req.body.tag_name,
    req.body.tag_color
  ]

  db.query(q, [...values, tagId], (err, data) => {
    if (err) return resp.json(err);
    return resp.json("Tag updated successfully");
  })
})


//Delete

app.delete("/ProjectList/:id", (req, resp) => {
  const projectId = req.params.id;
  const q = "DELETE FROM ProjectList WHERE id = ?";

  db.query(q, [projectId], (err, data) => {
    if (err) return resp.json(err);
    return resp.json("Project deleted successfully");
  });
})

app.delete("/TagList/:id", (req, resp) => {
  const tagId = req.params.id;
  const q = "DELETE FROM TagList WHERE id = ?";

  db.query(q, [tagId], (err, data) => {
    if (err) return resp.json(err);
    return resp.json("Tag deleted successfully");
  })
})

app.delete("/TaskCurrent/:id", (req, resp) => {
  const taskId = req.params.id;
  const q = "DELETE FROM TaskCurrent WHERE id = ?";

  db.query(q, [taskId], (err, data) => {
    if (err) return resp.json(err);
    return resp.json("Task deleted successfully");
  })
})

////////////////////////////////////////////////////////////////////////

app.listen(8800, () => {
  console.log("Connected to the server!");
})