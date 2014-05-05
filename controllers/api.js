var User = require('../models/User');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var request = require('request');
var _ = require('underscore');
var graph = require('fbgraph');
var Twit = require('twit');

// TODO: fix this shit, it's terrible.
var twitterConsumerKey;
var twitterConsumerSecret;
if(environment === 'development'){
  var secrets = require('./config/secrets');
  var twitterConsumerKey = secrets.twitter.consumerKey;
  var twitterConsumerSecret = secrets.twitter.consumerSecret;
} else {
  var twitterConsumerKey = process.env.TWITTER_KEY;
  var twitterConsumerSecret = process.env.TWITTER_SECRET;
}

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = function(req, res) {
  res.render('api/index', {
    title: 'API Examples'
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = function(req, res, next) {
  var token = _.findWhere(req.user.tokens, { kind: 'facebook' });
  graph.setAccessToken(token.accessToken);
  async.parallel({
    getMe: function(done) {
      graph.get(req.user.facebook, function(err, me) {
        done(err, me);
      });
    },
    getMyFriends: function(done) {
      graph.get(req.user.facebook + '/friends', function(err, friends) {
        done(err, friends.data);
      });
    }
  },
  function(err, results) {
    if (err) return next(err);
    res.render('api/facebook', {
      title: 'Facebook API',
      me: results.getMe,
      friends: results.getMyFriends
    });
  });
};

/**
 * GET /api/twitter
 * Twiter API example.
 */
exports.getTwitter = function(req, res, next) {
  var token = _.findWhere(req.user.tokens, { kind: 'twitter' });
  var T = new Twit({
    consumer_key: twitterConsumerKey,
    consumer_secret: twitterConsumerSecret,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });
  T.get('search/tweets', { q: 'hackathon since:2013-01-01', geocode: '40.71448,-74.00598,5mi', count: 50 }, function(err, reply) {
    if (err) return next(err);
    res.render('api/twitter', {
      title: 'Twitter API',
      tweets: reply.statuses
    });
  });
};
