var Comment = require('../models/comment');
var Post = require('../models/post');

exports.postCom = function(req, res){
	var post_id = req.body.post_id;
		currentUser = req.session.user,
	    comment = new Comment(post_id, currentUser.name, req.body.comment);
	comment.save(function(err){
	    if(err){
	        req.flash('error', err); 
	        return res.redirect('/');
	    }
	    req.flash('success', '发布成功!');
	    res.redirect('/');
	});
};

exports.like = function(req, res){
	var post_id = req.body.post_id;
		num = req.body.num;

	Post.update(post_id, 'like', num, function(err){
	    if(err){
	        req.flash('error', err); 
	        return res.redirect('/');
	    }

	});
};

exports.get = function(req, res){
	var post_id = req.body.post_id;
	Comment.get(post_id, function(err, comments){
		console.log(comments);
		if(err==null){
			res.send(comments);
		}
		else
			res.send(null);
	});
};
