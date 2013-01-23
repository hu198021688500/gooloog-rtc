var net = require('net');

function connectDS() {
	var client = new net.Socket();
	client.connect(8086, '192.168.31.188', function() {
		console.log('CONNECTED TO:192.168.31.188:8086');
		// 建立连接后立即向服务器发送数据，服务器将收到这些数据
		var data = {
			cmd : 1,
			data : {
				uid : 'huguobing@gooloog.com/web',
				pwd : 'xxxxxxx'
			}
		};
		client.write(JSON.stringify(data));
	});
	// 为客户端添加“data”事件处理函数
	// data是服务器发回的数据
	client.on('data', function(data) {
		var object = JSON.parse(data);
		connectNS(object);
		// 完全关闭连接
		client.destroy();
	});
	// 为客户端添加“close”事件处理函数
	client.on('close', function() {
		console.log('Connection closed');
	});
}

function connectNS(data) {
	var client = new net.Socket();
	client.connect(data.port, data.address, function() {
		var data = {
			token : data.token,
			data : {
				msg : 'hello NS'
			}
		};
		client.write(JSON.stringify(data));
	});
	client.on('data', function(data) {
		var object = JSON.parse(data);
		console.log(object.data.msg);
		client.destroy();
	});
}