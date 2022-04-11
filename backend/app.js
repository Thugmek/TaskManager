var config = require("./config/config.json");
const express = require("express");
const app = express();
app.use(express.json());

const TaskABL = require("./task-abl.js");
let taskAbl = new TaskABL();

console.log("Starting backend server on port " + config.port + "...");

app.get("/task/list", (req, res) => {
  taskAbl.list(req, res);
});

app.post("/task/create", (req, res) => {
  taskAbl.create(req, res);
});

app.post("/task/get", (req, res) => {
  taskAbl.get(req, res);
});

app.post("/task/update", (req, res) => {
  taskAbl.update(req, res);
});

app.post("/task/delete", (req, res) => {
  taskAbl.delete(req, res);
});

app.listen(config.port, () =>
  console.log("Listening on port " + config.port + "...")
);
