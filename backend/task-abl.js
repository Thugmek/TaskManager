class TaskABL {
  constructor() {
    const Database = require("./database.js");
    this.database = new Database();
    this.validator = require("./task-validator.js");
    this.mongo = require("mongodb");
  }

  list(req, res) {
    this.database.list("tasks", (a) => res.send(a));
  }

  create(req, res) {
    if (this.validator.create(req)) {
      this.database.insert("tasks", req.body, () => {
        res.send("ok");
      });
    } else {
      res.send("invalid");
    }
  }

  update(req, res) {}

  get(req, res) {}

  delete(req, res) {
    console.log(req.body);
    console.log(req.body._id);
    let querry = {
      _id: new this.mongo.ObjectId(req.body._id),
    };
    this.database.delete("tasks", querry, (a) => {
      res.send(a);
      console.log(a);
    });
  }
}

module.exports = TaskABL; // Export class
