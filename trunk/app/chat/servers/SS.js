/**
 * 交换服务器
 */
/*
var net = require('net');

var config = require('./config/config.js');
var listenAddress = config.SS.address;
var listenPort = config.SS.port;

net.createServer(function(socket) {
	var server = listenAddress + ':' + listenPort;;
	var client = socket.remoteAddress + ':' + socket.remotePort;
	console.log('client[' + client + '] connect SS[' +  server + '] opened');
	socket.on('data', function(data) {
		console.log('client[' + client + '] send SS[' +  server + '] data:' + data);
		var object = JSON.parse(data);
		console.log(data.msg);
		var result = {
			data : {
				msg : 'hello client'
			}
		};
		socket.write(JSON.stringify(result));
	});
	
	socket.on('close', function(data) {
        console.log('client[' + client + '] connect SS[' +  server + '] closed');
    });
    
}).listen(listenPort, listenAddress);
*/
/*var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(80);

var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

*/

var io = require('socket.io').listen(80);