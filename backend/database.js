var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

class Database {
  insert(collection, object, action) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("tasklist");
      dbo.collection(collection).insertOne(object, function (err, res) {
        if (err) throw err;
        db.close();
        action();
      });
    });
  }

  list(collection, action) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("tasklist");
      dbo
        .collection(collection)
        .find({})
        .toArray()
        .then((res) => {
          action(res);
          db.close();
        });
    });
  }

  get(collection, object, action) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("tasklist");
      dbo.collection(collection).findOne(object, function (err, res) {
        if (err) throw err;
        action(res);
        db.close();
      });
    });
  }

  update(collection, object, action) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("tasklist");
      dbo.collection(collection).updateOne(object, function (err, res) {
        if (err) throw err;
        action(res);
        db.close();
      });
    });
  }

  delete(collection, querry, action) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("tasklist");
      dbo.collection(collection).deleteOne(querry, function (err, res) {
        if (err) throw err;
        action(res);
        db.close();
      });
    });
  }
}

module.exports = Database;
