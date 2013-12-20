var routes = require('./routes'),
	user   = require('./routes/user');


module.exports = function(app) {
	app.get('/', routes.index);
	app.get('/reg', user.reg);
	app.post('/reg', user.register);
}
