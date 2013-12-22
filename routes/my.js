var Post = require('../models/post');
exports.posts = function(req, res) {
	username = req.params.username;
	if (!username) {
		req.flash('error', '用户不存在');
		return res.redirect('/');
	}
	Post.get(username, function(err, posts) {
		if (err) {
			req.flash('error', err+'');
			return res.redirect('/');
		}
		res.render('myposts', {
			title: username,
			posts: posts,
			user: req.session.user,
		});
	});
	
}