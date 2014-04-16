//user.js
var mongoose = require('mongoose');

modules.export = mongoose.model('user',{
	username: String
});