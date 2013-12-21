
/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {
		title: '首页',
		user: req.session.user,
        success:req.flash('success').toString()
	});
}

