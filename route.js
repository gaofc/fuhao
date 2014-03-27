var routes = require('./routes'),
	user   = require('./routes/user'),
	post   = require('./routes/post'),
	my     = require('./routes/my'),
	comment = require('./routes/comment'),
	wiki = require('./routes/wiki');


module.exports = function(app) {
	app.get('/', routes.index);
	app.get('/reg', user.reg);
	app.post('/reg', user.register);

	app.get('/logout', user.logout);
	app.get('/login', user.login);
	app.post('/login', user.in);

	app.post('/post', post.postMsg);
	app.get('/u/:username', my.posts);

	app.post('/comment', comment.postCom);
	app.post('/comment/get', comment.get);
	app.post('/likeit', comment.like);


	app.get('/wiki', wiki.list);
	app.get('/wiki/create', wiki.create);
	app.post('/wiki/save', wiki.save);
	app.post('/wiki/del', wiki.del);
	app.get('/wiki/:id/edit', wiki.edit); 
	app.get('/wiki/:title', wiki.result);
}
