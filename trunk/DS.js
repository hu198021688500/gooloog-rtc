/**
 * 分发服务器
 */

var net = require('net');
var config = require('./config/config.js');
var analyze = require('./service/analyze.js');

net.createServer(function(socket) {
	var address = socket.remoteAddress;
	var port = socket.remotePort;
	
    console.log('CONNECTED: ' + address + ':' + port);

    socket.on('data', function(data) {
    	analyze.process(socket, data, function(result){
    		socket.write(result);
    	});
    });

    socket.on('close', function(data) {
        console.log('CLOSED: ' + address + ':' + port);
    });

}).listen(config.DS.port, config.DS.address);
