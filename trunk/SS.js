/**
 * 交换服务器
 */

var net = require('net');

var config = require('./config/config.js');
var listenAddress = config.SS.address;
var listenPort = config.SS.port;

net.createServer(function(socket) {
	var server = listenAddress + ':' + listenPort;;
	var client = socket.remoteAddress + ':' + socket.remotePort;
	console.log('client[' + client + '] connect SS[' +  server + '] opened');
	socket.on('data', function(data) {
		console.log('client[' + client + '] send SS[' +  server + '] data:' + data);
		var object = JSON.parse(data);
		console.log(data.msg);
		var result = {
			data : {
				msg : 'hello client'
			}
		};
		socket.write(JSON.stringify(result));
	});
	
	socket.on('close', function(data) {
        console.log('client[' + client + '] connect SS[' +  server + '] closed');
    });
    
}).listen(listenPort, listenAddress);