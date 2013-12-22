var mongodb = require('./db');

function Post(username, post, time) {
    this.user = username;
    this.post = post;
    if (time) {
        this.time = time;
    } else {
        this.time = new Date();
    }
}

module.exports = Post;

Post.prototype.save = function save(callback) {
    var post = {
        user: this.user,
        post: this.post,
        time: this.time,
    };

    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.authenticate('fuhao', 'nodejs', function(err){
            db.collection('posts', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }

                collection.ensureIndex('user');
                collection.insert(post, {
                    safe: true
                }, function (err,post) {
                    mongodb.close();
                    callback(err,post);
                });
            });
        });
    });
};

Post.get = function get(username, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.authenticate('fuhao', 'nodejs', function(err){
            db.collection('posts', function(err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }

                var query = {};
                if (username) {
                    query.user = username;
                    console.log(query.user);
                }
                collection.find(query).sort({
                    time: -1
                }).toArray(function (err, docs) {
                    mongodb.close();
                    if (err) {
                        callback(err, null);
                    }

                    var posts = [];

                    docs.forEach(function (doc, index) {
                        var post = new Post(doc.user, doc.post, doc.time);
                        var now = post.time;
                        post.time = now.getFullYear() + "-" + (now.getUTCMonth()+1) + "-" + now.getUTCDate()
                                    + ' ' +now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
                        posts.push(post);
                    });
                    callback(null, posts);
                });
            });
        });
    });
};