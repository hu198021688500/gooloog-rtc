/**
 * 交换服务器(SwitchboardServer)
 * node SS.js 127.0.0.1 8000
 */

var logger = require('log4js').getLogger(__filename);
var systemUtil = require('../../../modules/util').System;

var argv = process.argv;
if (!systemUtil.checkIsLocalIp(argv[2])) {
	logger.error(opts.ip + 'is not local ip.');
	return false;
}
var sio = require('socket.io').listen(argv[3]);

require('./lib/chat.js').createChat(io.sockets);

io.configure(function() {
	io.set('authorization', function(handshakeData, callback) {
		var pass = true;
		handshake.nickname = 'Guest' + counter++;
		if (pass) {
			callback(null, true); // error first callback style
		} else {
			callback('authorization failed,need login.');
		}
	});
});
io.of('/chatSS').sockets.on('connection', function(socket) {
	console.log('>>>>>>>connected');
	var nickname = socket.handshake[chat.settings['handshake nickname property']];
	// 广播
    socket.broadcast.emit('hello', socket.id + '广播的信息');
    
	io.sockets.emit('this', {
		will : 'be received by everyone'
	});
	
	// 发送易变（volatile）的数据，用于客户端因为各种原因不能正常接收
	socket.volatile.emit('bieber tweet', tweet);
	
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
		io.sockets.emit('user disconnected');
	});
});

SwitchboardServer.stop = function(opts) {
	
};
var io = require('socket.io').listen(80);




