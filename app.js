/**
 * Module dependencies.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

var mongoose = require('mongoose');
var User = require('./models/user');

// all environments
var port = process.env.PORT || 8080;
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/pfa';

mongoose.connect(mongoURI);

var request = require('request');
var moment = require('moment');

var pfa = require('./controllers/pfa');

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
	});

routerAPI.route('/fetchData/:user_key/:today')
	.get(function(req, res){
		request({
			url: 'https://www.rescuetime.com/anapi/data?key=' 
			+ req.params.user_key 
			+ '&format=json&by=interval&rk=productivity&rb=' 
			+ moment(req.params.today, "YYYY-MM-DD").subtract('d', 30).format('YYYY-MM-DD')
			+ '&re='
			+ req.params.today,
			json: true}
			, function(err, response, body){	
				res.json(pfa.parseData(body, moment().format('YYYY-MM-DD')));
		})
	});
app.use('/api', routerAPI);

var router = express.Router();
router.use(function(req, res, next){
	console.log('html request made');
	next();
});
router.route('/')
	.get(function(req, res){
		res.sendfile('./public/index.html')
});
app.use('/', router);

var server = app.listen(port, function(){
	console.log('Express server listening on port ' + server.address().port);
});
