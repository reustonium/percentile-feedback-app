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
	//Trim the data keeping only "productive time"
	var prodData = [];
	var data = [];
	var prod = 0;

	for(var i=0; i < rawData.rows.length; i++){
		if (rawData.rows[i][3] > 0){
	        var time = parseInt(rawData.rows[i][0].split("T")[1].split(":")[0]);
	        prodData.push([time, rawData.rows[i][1]]);
	    }
	}


	for(var i=0; i< prodData.length; i++){
		prod += prodData[i][1];
        if(i===0){
        	data.push([prodData[i][0], prod]);
        	continue;
        }
        if(prodData[i][0] === prodData[i-1][0]){
        	data.pop();
        }
        data.push([prodData[i][0], prod]);
	}
	return {
		data: data
	};
};
