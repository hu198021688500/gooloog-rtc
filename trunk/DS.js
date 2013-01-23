var net = require('net');
var config = require('./config.js');
var analyze = require('./service/analyze.js');


// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
net.createServer(function(socket) {
    // 我们获得一个连接 - 该连接自动关联一个socket对象
    console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);

    // 为这个socket实例添加一个"data"事件处理函数
    socket.on('data', function(data) {
    	analyze.process(socket, data, function(result){
    		socket.write(result);
    	});
    });

    // 为这个socket实例添加一个"close"事件处理函数
    socket.on('close', function(data) {
        console.log('CLOSED: ' + socket.remoteAddress + ' ' + socket.remotePort);
    });

}).listen(config.DS.port, config.DS.address);






/*var server = net.createServer();
server.listen(PORT, HOST);
console.log('Server listening on ' +
    server.address().address + ':' + server.address().port);

server.on('connection', function(sock) {

    console.log('CONNECTED: ' +
         sock.remoteAddress +':'+ sock.remotePort);
    // 其它内容与前例相同

});
	console.log("xxx" + cmds[object.cmd]);
	console.log('DATA ' + socket.remoteAddress + ': ' + data);
	// 回发该数据，客户端将收到来自服务端的数据
	socket.write('You said "' + data + '"');
*/