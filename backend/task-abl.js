let Validator = require("./validator");

const schemaCreate = {
  name: Validator.string({}),
  description: Validator.string({ optional: true }),
  date: Validator.date({ optional: true }),
  time: Validator.time({ optional: true }),
};

const schemaDelete = {
  _id: Validator.string({}),
};

const schemaGet = {
  _id: Validator.string({}),
};

const schemaUpdate = {
  _id: Validator.string({}),
  name: Validator.string({}),
  description: Validator.string({ optional: true }),
  date: Validator.date({ optional: true }),
  time: Validator.time({ optional: true }),
};

class TaskABL {
  constructor() {
    const Database = require("./database.js");
    this.database = new Database();
    this.validator = require("./task-validator.js");
    this.mongo = require("mongodb");
  }

  list(req, res) {
    this.database.list("tasks", (a) => {
      a.map((element) => {
        element.date = element.date.toISOString().split("T")[0];
        return element;
      });
      res.send(a);
    });
  }

  create(req, res) {
    let valRes = Validator.validate(req.body, schemaCreate);
    if (valRes.valid) {
      req.body.date = new Date(req.body.date);
      this.database.insert("tasks", req.body, () => {
        res.send("ok" + valRes.msg);
      });
    } else {
      res.status(400);
      res.send(valRes.msg);
    }
  }

  update(req, res) {
    let valRes = Validator.validate(req.body, schemaUpdate);
    if (valRes.valid) {
      req.body.date = new Date(req.body.date);
      let querry = {
        _id: new this.mongo.ObjectId(req.body._id),
      };

      this.database.update("tasks", querry, req.body, (a) => {
        res.send(a);
      });
    } else {
      res.status(400);
      res.send(valRes.msg);
    }
  }

  get(req, res) {
    let valRes = Validator.validate(req.body, schemaGet);
    if (valRes.valid) {
      let querry = {
        _id: new this.mongo.ObjectId(req.body._id),
      };
      this.database.get("tasks", querry, (a) => {
        a.date = a.date.toISOString().split("T")[0];
        res.send(a);
      });
    } else {
      res.status(400);
      res.send(valRes.msg);
    }
  }

  delete(req, res) {
    let valRes = Validator.validate(req.body, schemaDelete);
    if (valRes.valid) {
      let querry = {
        _id: new this.mongo.ObjectId(req.body._id),
      };
      this.database.delete("tasks", querry, (a) => {
        if (a.deletedCount === 0) res.status(410);
        res.send(a);
      });
    } else {
      res.status(400);
      res.send(valRes.msg);
    }
  }
}

module.exports = TaskABL; // Export class
