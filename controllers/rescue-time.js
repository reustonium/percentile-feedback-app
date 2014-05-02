var request = require('request');
var moment = require('moment');

var url = 'https://www.rescuetime.com/anapi/data?key=';
var config = '&format=json&by=interval&rk=productivity';

exports.validKey = function(key, cb){
	var options = {
		url: url + key,
		json: true
	};

	request(options, function(error, response, body){
		if(error || body.error){
			cb(false);
		} 
		else {
			cb(true);
		}
	});
};

exports.getToday = function(req, res){
	if(!req.user){
		res.send(401, 'No user found, please log in.');
	}
	var key = req.user.profile.rescueTimeKey;
	var options = {
		url: url + key + config,
		json: true
	};

	request(options, function(error, response, body){
		res.json(parseData(body));
	});
};

var parseData = function(rawData){
	var data = [];
	for(var i=0; i < rawData.rows.length; i++){
		if (rawData.rows[i][3] > 0){
	        var time = parseInt(rawData.rows[i][0].split("T")[1].split(":")[0]);
	        var date = rawData.rows[i][0].split("T")[0];
	        data.push([time, rawData.rows[i][1]]);
	    }
	}
	return {
		title: 'today',
		data: data};
};
