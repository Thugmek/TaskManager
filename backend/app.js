var config = require("./config/config.json");
const express = require("express");
const app = express();

app.use(express.json());

console.log("Starting backend server on port " + config.port + "...");

//----------------------------------------------------------/api/taks
const TaskABL = require("./task-abl.js");
let taskAbl = new TaskABL();

app.get("/api/task/list", (req, res) => {
  taskAbl.list(req, res);
});

app.post("/api/task/create", (req, res) => {
  taskAbl.create(req, res);
});

app.post("/api/task/get", (req, res) => {
  taskAbl.get(req, res);
});

app.post("/api/task/update", (req, res) => {
  taskAbl.update(req, res);
});

app.post("/api/task/delete", (req, res) => {
  taskAbl.delete(req, res);
});

//----------------------------------------------------------/api/day
const DayABL = require("./day-abl.js");
let dayAbl = new DayABL();

app.get("/api/day/listTemplates", (req, res) => {
  dayAbl.listTemplates(req, res);
});

app.post("/api/day/createTemplate", (req, res) => {
  dayAbl.createTemplate(req, res);
});

app.post("/api/day/updateTemplate", (req, res) => {
  dayAbl.updateTemplate(req, res);
});

app.post("/api/day/deleteTemplate", (req, res) => {
  dayAbl.deleteTemplate(req, res);
});

app.post("/api/day/getDay", (req, res) => {
  dayAbl.getDay(req, res);
});
app.post("/api/day/updateDay", (req, res) => {
  dayAbl.updateDay(req, res);
});
//----------------------------------------------------------/api/*

app.all("/api/*", (req, res) => {
  res.status(404);
  res.send("Invalid api route");
});

//----------------------------------------------------------/*

app.get("/*", (req, res) => {
  res.send("Fallback page");
});

app.listen(config.port, () =>
  console.log("Listening on port " + config.port + "...")
);
