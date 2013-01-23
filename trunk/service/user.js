exports.login = function(data, callback){
	var client = require('./client.js');
	var string = require('../module/util').String;
	var user = string.decodeUID(data.uid);
	var token = 'xxcvxcvxcvxcv';
	client.getNS(function(err, result) {
		result.token = token;
		callback(JSON.stringify(result));
	});
};