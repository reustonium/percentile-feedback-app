var request = require('request');

var options = {
	url: 'https://www.rescuetime.com/anapi/data?key=' + key,
	json: true
};

var cb = function callback(error, response, body){	
	if(error){
		console.log('err: ' + error);
	}
	if(body.error){
		console.log('bodyerror: ' + body);
	}
	console.log('body: ' + body.notes);
	return true;
};
request(options, cb);
exports.validKey = cb;