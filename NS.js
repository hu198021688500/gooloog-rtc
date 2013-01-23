/**
 * 通知服务器
 */

var net = require('net');
var config = require('./config/config.js');

net.createServer(function(socket) {
	socket.on('data', function(data) {
		var object = JSON.parse(data);
		console.log(data.msg);
		var result = {
			data : {
				msg : 'hello client'
			}
		};
		socket.write(JSON.stringify(result));
	});
}).listen(config.NS.port, config.NS.address);