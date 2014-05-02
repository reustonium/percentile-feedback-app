var request = require('request');
exports.validKey = function(key){
	var options = {
		url: 'https://www.rescuetime.com/anapi/data?key=' + key,
		json: true
	};

	var cb = function callback(error, response, body){	
		if(error || body.error){
			//Key is bad, flash message and don't allow save
		}
		//key is good, save profile
	};
	request(options, cb);
}
