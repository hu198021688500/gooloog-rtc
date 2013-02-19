/**
 * 分发服务器(Dispatch Server)
 */

var io = require('socket.io'),
    express = require('express'),
    app = express.createServer();
 
app.configure(function () {
    app.use(express.cookieParser());
    app.use(express.session({secret: 'secret', key: 'express.sid'}));
    app.use(function (req, res) {
        res.end('<h2>Hello, your session id is ' + req.sessionID + '</h2>');
    });
});
 
app.listen();
var sio = io.listen(app);
 


var net = require('net');
var analyze = require('./service/analyze.js');

var config = require('./config/config.js');
var listenAddress = config.DS.address;
var listenPort = config.DS.port;

net.createServer(function(socket) {
	var server = listenAddress + ':' + listenPort;
	var client = socket.remoteAddress + ':' + socket.remotePort;
	console.log('client[' + client + '] connect DS[' +  server + '] opened');
    socket.on('data', function(data) {
    	console.log('client[' + client + '] send DS[' +  server + '] data:' + data);
    	var object = JSON.parse(data);
    	analyze.process(socket, object, function(result) {
    		socket.write(result);
    	});
    });
    socket.on('close', function(data) {
        console.log('client[' + client + '] connect DS[' +  server + '] closed');
    });
}).listen(listenPort, listenAddress);
