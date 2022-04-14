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

  update(req, res) {
    console.log("opdate: ", req.body);

    let querry = {
      _id: new this.mongo.ObjectId(req.body._id),
    };

    this.database.update("tasks", querry, req.body, (a) => {
      res.send(a);
      console.log("Database response: ", a);
    });
  }

  get(req, res) {
    console.log("Get task", req.body);
    let querry = {
      _id: new this.mongo.ObjectId(req.body._id),
    };
    this.database.get("tasks", querry, (a) => {
      res.send(a);
      console.log("Database get result: ", a);
    });
  }

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
