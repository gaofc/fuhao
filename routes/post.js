var Post = require('../models/post');

exports.postMsg = function(req, res){
	var currentUser = req.session.user,
	    post = new Post(currentUser.name, req.body.post);
	
	post.save(function(err){
	    if(err){
	        req.flash('error', err); 
	        return res.redirect('/');
	    }
	    req.flash('success', '发布成功!');
	    res.redirect('/');
	});
};