
/*
 * GET home page.
 */
var Post = require('../models/post');

exports.index = function(req, res) {

	Post.get(null, function(err, posts) {
	if (err) {
		posts = [];
	}
	res.render('index', {
		title: '首页',
		posts: posts,
		user: req.session.user,
        success:req.flash('success').toString(),
		});
	});
}

