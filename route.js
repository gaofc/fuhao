var routes = require('./routes'),
	user   = require('./routes/user'),
	post   = require('./routes/post'),
	my     = require('./routes/my');


module.exports = function(app) {
	app.get('/', routes.index);
	app.get('/reg', user.reg);
	app.post('/reg', user.register);

	app.get('/logout', user.logout);
	app.get('/login', user.login);
	app.post('/login', user.in);

	app.post('/post', post.postMsg);
	app.get('/u/:username', my.posts);
}
