/**
 * 管理服务器
 */

var net = require('net');

var config = require('./config/config.js');
var listenAddress = config.MS.address;
var listenPort = config.MS.port;

net.createServer(function(socket) {
	var server = listenAddress + ':' + listenPort;
	var client = socket.remoteAddress + ':' + socket.remotePort;
	console.log('client[' + client + '] connect MS[' +  server + '] opened');
	socket.on('data', function(data) {
		console.log('client[' + client + '] send MS[' +  server + '] data:' + data);
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
	socket.on('close', function(data) {
        console.log('client[' + client + '] connect MS[' +  server + '] closed');
    });
}).listen(listenPort, listenAddress);

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