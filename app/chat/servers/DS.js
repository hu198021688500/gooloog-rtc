/**
 * 分发服务器
 */

var net = require('net');
var analyze = require('./service/analyze.js');

var config = require('./config/config.js');
var listenAddress = config.DS.address;
var listenPort = config.DS.port;

net.createServer(function(socket) {
	var server = listenAddress + ':' + listenPort;
	var client = socket.remoteAddress + ':' + socket.remotePort;
	console.log('client[' + client + '] connect DS[' +  server + '] opened');
    socket.on('data', function(data) {
    	console.log('client[' + client + '] send DS[' +  server + '] data:' + data);
    	var object = JSON.parse(data);
    	analyze.process(socket, object, function(result) {
    		socket.write(result);
    	});
    });
    socket.on('close', function(data) {
        console.log('client[' + client + '] connect DS[' +  server + '] closed');
    });
}).listen(listenPort, listenAddress);
