var mongodb = require('./db');

function Comment(post_id, username, comment, time) {
    this.post_id = post_id;
    this.comment = comment;
    this.user = username;
    if (time) {
        this.time = time;
    } else {
        this.time = new Date();
    }
}

module.exports = Comment;

Comment.prototype.save = function save(callback) {
    var comment = {
        post_id: this.post_id,
        user: this.user,
        comment: this.comment,
        time: this.time,
    };

    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.authenticate('fuhao', 'nodejs', function(err){
            db.collection('comments', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }

                collection.ensureIndex('post_id');
                collection.insert(comment, {
                    safe: true
                }, function (err,comment) {
                    mongodb.close();
                    callback(err,comment);
                });
            });
        });
    });
};

Comment.get = function get(post_id, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.authenticate('fuhao', 'nodejs', function(err){
            db.collection('comments', function(err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }

                var query = {};
                if (post_id) {
                    query.post_id = post_id;
                    //console.log(query.user);
                }
                collection.find(query).sort({
                    time: -1
                }).toArray(function (err, docs) {
                    mongodb.close();
                    if (err) {
                        callback(err, null);
                    }

                    var comments = [];

                    docs.forEach(function (doc, index) {
                        var comment = new Comment(doc.post_id, doc.user, doc.comment, doc.time);
                        comments.push(comment);
                    });
                    callback(null, comments);
                });
            });
        });
    });
};

