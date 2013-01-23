/**
 * 管理服务器
 */

var net = require('net');
var config = require('./config/config.js');

net.createServer(function(socket) {
	socket.on('data', function(data) {
		var result = null;
		var object = JSON.parse(data);
		switch (object.cmd) {
			case 1 :
				result = getDS();
				break;
			case 2 :
				result = getNS();
				break;
			case 3 :
				result = getSS();
				break;
			case 4 :
				result = getGW();
				break;
			default :
				result = {};
		}
		socket.write(JSON.stringify(result));
	});
}).listen(config.MS.port, config.MS.address);

function getDS() {
	return config.DS;
}

function getNS() {
	return config.NS;
}

function getSS() {
	return config.SS;
}

function getGW() {
	return config.GW;
}