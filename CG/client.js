var io = require("socket.io");
var socket = io.connect("192.168.31.188:8083");
socket.on("connect", function() {
	socket.send("hi");

	socket.on("message", function(msg) {
		// my msg
	});
});

socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });