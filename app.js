/**
 * Module dependencies.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());

var mongoose = require('mongoose');
var User = require('./models/user');

// all environments
var port = process.env.PORT || 8080;
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/pfa';

mongoose.connect(mongoURI);

var request = require('request');

/*
Routes for our API
*/
var routerAPI = express.Router();
routerAPI.use(function(req, res, next){
	console.log('api request made');
	next();
});
routerAPI.route('/users')
	.post(function(req, res){
		var user = new User();
		user.username = req.body.name;
		user.key = req.body.key;
		user.save(function(err){
			if(err)
				res.send(err);
			res.json({message: 'user created'});
		});
	})
	.get(function(req, res){
		User.find(function(err, users){
			if(err)
				res.send(err)
			res.json(users)
		})
	})
app.use('/api', routerAPI);

var router = express.Router();
router.use(function(req, res, next){
	console.log('html request made');
	next();
});
router.route('/user/:uid')
	.get(function(req, res){
		res.json({
			message: req.params.uid
		});
});
app.use('/', router);

var server = app.listen(port, function(){
	console.log('Express server listening on port ' + server.address().port);
});
