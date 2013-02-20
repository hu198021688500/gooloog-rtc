var net = require('net');
var config = require('../config/config.js');

exports.getNS = function(callback) {
	var client = new net.Socket();
	var server = config.MS.host + ':' + config.MS.port;
	console.log('DS connect NS[' + server + '] opened');
	client.connect(config.MS.port, config.MS.host, function() {
		var data = {cmd : 2};
		console.log('DS send NS[' + server + '] data: ' + JSON.stringify(data));
		client.write(JSON.stringify(data));
	});

	client.on('data', function(data) {
		var object = JSON.parse(data);
		console.log('DS receive from NS[' + server + '] data: ' + JSON.stringify(object));
		callback(null, object);
		console.log('DS connect to NS[' + server + '] closed');
		client.destroy();
	});
};