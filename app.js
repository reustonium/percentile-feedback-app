/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var user = require('./models/user');

var app = express();

var mongoURI = process.env.MONGOLAB_URI) || 'mongodb://localhost/pfa';
mongoose.connect(mongoURI);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('*', function(req, res){
	res.sendfile('./public/index.html');
});

app.get('/api/users', function(req, res){
	user.find(function(err, users){
		if(err)
			res.send(err);
		res.json(users);
	});
});

app.post('/api/users', function(req, res){
	user.create({
		username: req.body.text
	}, function(err, user){
		if(err)
			res.send(err);
		res.send("way to go");
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log(process.env);
});
