/**
 * 交换服务器(SwitchboardServer)
 * node SS.js 127.0.0.1 8000
 */

var logger = require('log4js').getLogger(__filename);
var systemUtil = require('../modules/util/lib/system.js');

var argv = process.argv;
if (!systemUtil.checkIsLocalIp(argv[2])) {
	logger.error(argv[2] + ' is not local ip.');
	return false;
}
var sio = require('socket.io').listen(parseInt(argv[3]));
//sio.set('log level', 1);
// 认证与握手
sio.configure(function() {
	sio.set('authorization', function(handshakeData, callback) {
		console.log(handshakeData);
		var pass = true;
		if (pass) {
			callback(null, true); // error first callback style
		} else {
			callback('authorization failed,need login.');
		}
	});
});

sio.sockets.on('connection', function(socket) {
	console.log('>>>>>>>connected');
	// 广播
    socket.broadcast.emit('hello', socket.id + '广播的信息');
    
	sio.sockets.emit('this', {
		will : 'be received by everyone'
	});
	
	// 发送易变（volatile）的数据，用于客户端因为各种原因不能正常接收
	//socket.volatile.emit('bieber tweet', tweet);
	
	// 发送以及接收自定义事件，发送、接收需要确认的数据
	socket.on('private message', function(from, msg) {
		console.log('I received a private message by ', from, ' saying ', msg);
	});
	
	// 基本的消息
	socket.on('message', function() {
		// 将数据关联并存储到当前连接的socket
		socket.set('nickname', name, function() {
			socket.emit('ready');
		});
	});
	
	// 断开连接
	socket.on('disconnect', function() {
		sio.sockets.emit('user disconnected');
	});
});

//require('../service/chat.js').createChat(sio.sockets);