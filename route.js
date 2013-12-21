var routes = require('./routes'),
	user   = require('./routes/user');


module.exports = function(app) {
	app.get('/', routes.index);
	app.get('/reg', user.reg);
	app.post('/reg', user.register);

	app.get('/logout', user.logout);
	app.get('/login', user.login);
	app.post('/login', user.in);
}
