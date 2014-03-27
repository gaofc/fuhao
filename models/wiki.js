var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

exports.getWikiContentByTitle = function(title, callback) {
  mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.authenticate('fuhao', 'nodejs', function(err){
          db.collection('wiki').findOne({title:title}, function(err, item) {
            db.close();
            callback(err, item);
          })
        });
  });
};

exports.getWikiContentById = function(id, callback) {
 mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
         db.authenticate('fuhao', 'nodejs', function(err){
    var obj_id = new ObjectID(id);
    db.collection('wiki').findOne({_id: obj_id}, function(err, item) {
      db.close();
      callback(err, item);
    })
     });
  });
};

exports.saveWiki = function(id, title, author, content, callback) {
  var obj_id = id === null || id === "" ? null : ObjectID(id);
  var update_at =  new Date();
  var document = {_id:obj_id, title:title, author:author, content:content, update_at:update_at};
  console.log("=======document=======");
  console.log(document);

   mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
         db.authenticate('fuhao', 'nodejs', function(err){
    db.collection('wiki').save(document, {safe: true}, function(err, item) {
      db.close();
      callback(err, update_at, item);
    })
    });
  });
};


exports.delWikiById = function(id, callback) {
	var obj_id = new ObjectID(id);
	mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
         db.authenticate('fuhao', 'nodejs', function(err){
		db.collection('wiki').remove({_id:obj_id}, {safe: true}, function(err, count) {
			db.close();
			callback(err, count);
		});
    });
	});
};


exports.getAllWikis = function(callback) {
	 mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
         db.authenticate('fuhao', 'nodejs', function(err){
		db.collection('wiki').find().sort({update_at: -1}).toArray(function(err, items) {
			db.close();
			callback(err, items);
		})
    });
	});
};
