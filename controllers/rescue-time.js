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

exports.getDay = function(req, res){
	if(!req.user){
		res.send(401, 'No user found, please log in.');
	}
	var key = req.user.profile.rescueTimeKey;
	var date = req.params.today;
	var options = {
		url: url + key + config +
		'&rb=' + date +
		'&re=' + date,
		json: true
	};

	request(options, function(error, response, body){
		//TODO: look for rescueTime error
		//TODO: look for timeout or other error
		var data = {};
		data[date] = parseDay(body);
		res.json(data);
	});
};

exports.getMonth = function(req, res){
	if(!req.user){
		res.send(401, 'No user found, please log in.');
	}
	var key = req.user.profile.rescueTimeKey;
	var dateEnd = req.params.today;
	var dateStart = moment(dateEnd, 'YYYY-MM-DD').subtract('d', 30).format('YYYY-MM-DD');

	var options = {
		url: url + key + config + 
		'&rb=' + dateStart +
		'&re=' + dateEnd,
		json: true
	};

	request(options, function(error, response, body){
		var rawData = [];
		var data = [];
		for(var i=1; i<body.rows.length; i++){
			if(body.rows[i][0].split('T')[0] === body.rows[i-1][0].split('T')[0]){
				rawData.push(body.rows[i]);
			} else {
				var tempData = parseDay({rows: rawData});
				tempData.forEach(addData);
				rawData= [];
			}
		}
		function addData(element, index, array){
			data.push(element);
		}
		console.log(data);
		res.json(data);
	});
};

var parseDay = function(rawData){
	//Trim the data keeping only "productive time"
	var prodData = [];
	var data = [];
	var prod = 0;

	for(var i=0; i < rawData.rows.length; i++){
		if (rawData.rows[i][3] > 0){
	        var time = parseInt(rawData.rows[i][0].split('T')[1].split(':')[0]);
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
	return data;
};
