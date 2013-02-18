/**
 * New node file
 */

var socket = io.connect('http:// 10.64.48.5:3000/');// 可以使用跨站socket
socket.on('connect', function() {
	console.log('>>>>>>>>connect');
	socket.send('Hi!');
});
