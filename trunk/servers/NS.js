/**
 * 通知服务器
 */

var net = require('net');

var config = require('./config/config.js');
var listenAddress = config.NS.address;
var listenPort = config.NS.port;

net.createServer(function(socket) {
	var server = listenAddress + ':' + listenPort;;
	var client = socket.remoteAddress + ':' + socket.remotePort;
	console.log('client[' + client + '] connect NS[' +  server + '] opened');
	socket.on('data', function(data) {
		console.log('client[' + client + '] send DS[' +  server + '] data:' + data);
		var object = JSON.parse(data);
		var result = {
			data : {
				msg : 'hello client'
			}
		};
		socket.write(JSON.stringify(result));
	});
	
	socket.on('close', function(data) {
        console.log('client[' + client + '] connect NS[' +  server + '] closed');
    });
    
}).listen(listenPort, listenAddress);