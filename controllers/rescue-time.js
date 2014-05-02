var request = require('request');

exports.validKey = function(key, cb){
	var options = {
		url: 'https://www.rescuetime.com/anapi/data?key=' + key,
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
}
