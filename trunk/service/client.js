var net = require('net');
var config = require('../config/config.js');

exports.getNS = function(callback) {
	var client = new net.Socket();
	client.connect(config.MS.port, config.MS.address, function() {
		var data = {cmd : 2};
		client.write(JSON.stringify(data));
	});

	client.on('data', function(data) {
		var object = JSON.parse(data);
		callback(null, object);
		client.destroy();
	});
};