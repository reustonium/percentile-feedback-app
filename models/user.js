//user.js
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var UserSchema = new schema({
	username: String,
	key: String
});

module.exports = mongoose.model('User', UserSchema);