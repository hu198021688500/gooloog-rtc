var app = require('http').createServer();
var io = require('socket.io').listen(app);

app.listen(8084);

io.sockets.on('connection', function(socket) {
	socket.emit('news', {
		hello : 'world'
	});
	socket.on('my other event', function(data) {
		console.log(data);
	});
});