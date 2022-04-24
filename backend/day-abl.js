let Validator = require("./validator");

const schemaCreateTemplate = {
  name: Validator.string({}),
  description: Validator.string({ optional: true }),
  day: Validator.array(
    {},
    Validator.object(
      {},
      {
        from: Validator.time({}),
        to: Validator.time({}),
        name: Validator.string({}),
      }
    )
  ),
};

const schemaUpdateTemplate = {
  _id: Validator.string({}),
  name: Validator.string({}),
  description: Validator.string({ optional: true }),
  day: Validator.array(
    {},
    Validator.object(
      {},
      {
        from: Validator.time({}),
        to: Validator.time({}),
        name: Validator.string({}),
      }
    )
  ),
};

const schemaDeleteTemplate = {
  _id: Validator.string({}),
};

const schemaGetDay = {
  date: Validator.date({}),
};

const schemaUpdateDay = {
  date: Validator.date({}),
  day: Validator.array(
    {},
    Validator.object(
      {},
      {
        from: Validator.time({}),
        to: Validator.time({}),
        name: Validator.string({}),
      }
    )
  ),
};

class DayABL {
  constructor() {
    const Database = require("./database.js");
    this.database = new Database();
    this.mongo = require("mongodb");
  }

  listTemplates(req, res) {
    this.database.list("defaultDayRegimes", (a) => res.send(a));
  }

  createTemplate(req, res) {
    let valRes = Validator.validate(req.body, schemaCreateTemplate);
    if (valRes.valid) {
      this.database.insert("defaultDayRegimes", req.body, () => {
        res.send("ok");
      });
    } else {
      res.status(400);
      res.send(valRes.msg);
    }
  }

  updateTemplate(req, res) {
    let valRes = Validator.validate(req.body, schemaUpdateTemplate);
    if (valRes.valid) {
      let querry = {
        _id: new this.mongo.ObjectId(req.body._id),
      };

      this.database.update("defaultDayRegimes", querry, req.body, (a) => {
        res.send(a);
      });
    } else {
      res.status(400);
      res.send(valRes.msg);
    }
  }

  deleteTemplate(req, res) {
    let valRes = Validator.validate(req.body, schemaDeleteTemplate);
    if (valRes.valid) {
      let querry = {
        _id: new this.mongo.ObjectId(req.body._id),
      };

      this.database.delete("defaultDayRegimes", querry, (a) => {
        if (a.deletedCount === 0) res.status(410);
        res.send(a);
      });
    } else {
      res.status(400);
      res.send(valRes.msg);
    }
  }

  getDay(req, res) {
    let valRes = Validator.validate(req.body, schemaGetDay);
    if (valRes.valid) {
      let querry = {
        date: new Date(req.body.date),
      };
      this.database.get("DayRegime", querry, (a) => {
        console.log("day:", a);
        if (!a) {
          this.createDay(new Date(req.body.date), (a) => {
            a.date = a.date.toISOString().split("T")[0];
            res.send({ ...a, createdNow: true });
          });
        } else {
          a.date = a.date.toISOString().split("T")[0];
          res.send(a);
        }
      });
    } else {
      res.status(400);
      res.send(valRes.msg);
    }
  }

  updateDay(req, res) {
    let valRes = Validator.validate(req.body, schemaUpdateDay);
    if (valRes.valid) {
      let querry = {
        date: new Date(req.body.date),
      };

      req.body.date = new Date(req.body.date);

      this.database.update("DayRegime", querry, req.body, (a) => {
        res.send(a);
      });
    } else {
      res.status(400);
      res.send(valRes.msg);
    }
  }

  //not for API call
  createDay(date, then) {
    let day = {
      date: date,
      day: [
        {
          from: "00:00",
          to: "06:00",
          name: "Noční klid",
        },
        {
          from: "06:00",
          to: "08:00",
          name: "Snídaně",
        },
        {
          from: "08:00",
          to: "22:00",
          name: "Volná zábava",
        },
        {
          from: "22:00",
          to: "23:59",
          name: "Noční klid",
        },
      ],
    };

    this.database.insert("DayRegime", day, () => {
      console.log("inserted", day);
      then(day);
    });
  }

  createRule(req, res) {
    let valRes = Validator.validate(req.body, schemaGetDay);
    if (valRes.valid) {
      if (this.validator.create(req)) {
        this.database.insert("tasks", req.body, () => {
          res.send("ok");
        });
      } else {
        res.send("invalid");
      }
    } else {
      res.status(400);
      res.send(valRes.msg);
    }
  }
}

module.exports = DayABL; // Export class
