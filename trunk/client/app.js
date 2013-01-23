var net = require('net');

var config = require('../config/config.js');

function connectDS() {
	var client = new net.Socket();
	client.connect(config.DS.port, config.DS.address, function() {
		console.log("connect DS");
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
		client.destroy();
	});
	// 为客户端添加“close”事件处理函数
	client.on('close', function() {
		console.log('Connection DS closed');
	});
}

function connectNS(data) {
	var client = new net.Socket();
	client.connect(data.port, data.address, function() {
		console.log("connect NS");
		var sendData = {
			token : data.token,
			data : {
				msg : 'hello NS'
			}
		};
		client.write(JSON.stringify(sendData));
	});
	client.on('data', function(data) {
		var object = JSON.parse(data);
		console.log(object.data.msg);
		console.log("connect NS closed");
	});
	
	setTimeout(function() {
		var data = {
			cmd : 2,
			data : {
				uid : 'huguobing1@gooloog.com/web'
			}
		};
		client.write(JSON.stringify(sendData));
	}, 5000);
}

connectDS();