/**
 * New node file
 */
/*
var fs = require('fs');
var url = require('url');
var http = require('http');
var path = require('path');

var server = http.createServer(function(req, res) {
	var pathname = url.parse(req.url).pathname;
	console.log(pathname);
	var filepath = path.join('./tmp', 'wwwroot', pathname);
	console.log(filepath);
	var stream = fs.createReadStream(filepath, {
		flags : 'r',
		encoding : null
	});
	stream.on('error', function() {
		res.writeHead(404);
		res.end();
	});
	stream.pipe(res);
});
server.on('error', function(error) {
	console.log(error);
});
server.listen(8088, function() {
	console.log('server listen on 8088');
});*/
//var request = require('request');
var io = require('socket.io-client');
//var j = request.jar();
/*request.post({
	jar: j,
	url: 'http://localhost:9000/login',
	form: {username: 'jose', password: 'Pa123'}
}, function (err, resp, body){*/
	var socket = io.connect('192.168.31.188', {
	    port: 8005
	});
	socket.on('connect', function() {
		console.log("socket connected");
		socket.on('event', function(data) {
			
		});
		socket.on('disconnect', function() {
		
		});
	});
//});

//socket.emit('private message', { user: 'me', msg: 'whazzzup?' });