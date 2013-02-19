/**
 * 网关服务器(Gateway Server)
 */

var GatewayServer = module.exports = {};

GatewayServer.start = function(opts) {
	
};

GatewayServer.stop = function(opts) {
	
};

var io = require('socket.io').listen(80);

// 认证与握手
io.configure(function() {
	io.set('authorization', function(handshakeData, callback) {
		var pass = true;
		if (pass) {
			callback(null, true); // error first callback style
		} else {
			callback('authorization failed,need login.');
		}
	});
});

io.sockets.on('connection', function(socket) {
	console.log('>>>>>>>connected');
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

// socket.io路由或者命名空间
/*
 * var chat = io.connect('http://localhost/chat')
 * , news = io.connect('http://localhost/news');
 * 	chat.on('connect', function () {
 * 		chat.emit('hi!');
 * 	});
 * 	news.on('news', function () {
 * 		news.emit('woot');
 * 	});
 */
var chat = io.of('/chat').on('connection', function(socket) {
	socket.emit('a message', {
		that : 'only',
		'/chat' : 'will get'
	});
	chat.emit('a message', {
		everyone : 'in',
		'/chat' : 'will get'
	});
});

var news = io.of('/news').on('connection', function(socket) {
	socket.emit('item', {
		news : 'item'
	});
});
