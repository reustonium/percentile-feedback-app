var environment = app.get('env');
/**
 * Module dependencies.
 */
var _ = require('underscore');
var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var csrf = require('lusca').csrf();
var methodOverride = require('method-override');
var MongoStore = require('connect-mongo')({ session: session });
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');

/**
 * Load controllers.
 */
var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var gettingStartedController = require('./controllers/gettingStarted');
var rescuetime = require('./controllers/rescue-time');

/**
 * API keys + Passport configuration.
 */
var passportConf = require('./config/passport');

// TODO: fix this shit, it's terrible.
var db;
var sessionSecret;
if(environment === 'development'){
  var secrets = require('./config/secrets');
  db = secrets.db;
  sessionSecret = secrets.sessionSecret;
} else {
  db = process.env.MONGODB;
  sessionSecret = process.env.SESSION_SECRET;
}

/**
 * Create Express server.
 */
var app = express();

/**
 * Mongoose configuration.
 */
mongoose.connect(db);
mongoose.connection.on('error', function() {
  console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
});

/**
 * Express configuration.
 */
var hour = 3600000;
var day = hour * 24;
var week = day * 7;

var csrfWhitelist = [
  '/this-url-will-bypass-csrf'
];
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(connectAssets({
  paths: ['public/css', 'public/js'],
  helperContext: app.locals
}));
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  secret: sessionSecret,
  store: new MongoStore({
    url: db,
    auto_reconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  // Conditional CSRF.
  if (_.contains(csrfWhitelist, req.path)) return next();
  csrf(req, res, next);
});
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(flash());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));
app.use(function(req, res, next) {
  // Keep track of previous URL to redirect back to
  // original destination after a successful login.
  if (req.method !== 'GET') return next();
  var path = req.path.split('/')[1];
  if (/(auth|login|logout|signup)$/i.test(path)) return next();
  req.session.returnTo = req.path;
  next();
});


/*
Routes for the API
*/
var routerAPI = express.Router();
routerAPI.use(function(req, res, next){
	console.log('api request made');
	next();
});

routerAPI.route('/fetchData/:user_key/:today')
	.get(function(req, res){
		request({
			url: 'https://www.rescuetime.com/anapi/data?key=' +
			req.params.user_key +
			'&format=json&by=interval&rk=productivity&rb=' +
			moment(req.params.today, "YYYY-MM-DD").subtract('d', 30).format('YYYY-MM-DD') +
			'&re=' +
			req.params.today,
			json: true},
			function(err, response, body){	
				if(body.error !== null){
					console.log("error: " + body);
					res.json(body);
				} else {
					res.json(pfa.parseData(body, moment().format('YYYY-MM-DD')));
				}
		});
	});


/**
 * Application routes.
 */
app.get('/', homeController.index);
app.get('/gettingStarted', gettingStartedController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);

/**
 * API routes.
 */
app.get('/api/getToday', rescuetime.getToday);

/**
 * OAuth routes for sign-in.
 */
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});


/**
 * 500 Error Handler.
 * As of Express 4.0 it must be placed at the end of all routes.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log("✔ Express server listening on port %d in %s mode", app.get('port'), environment);
});

module.exports = app;
