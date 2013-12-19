
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var MongoStore = require('connect-mongodb');
var settings = require('./settings');

var app = express();

var flash = require('connect-flash');
app.use(flash());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
//app.use(express.router(routes));
routes(app);

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.cookieParser());
app.use(express.session({
secret: settings.cookieSecret,
store: new MongoStore({
db: settings.db
})
}));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
