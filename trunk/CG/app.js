/**
 * gooloog.
 * Copyright(c) 2013 hugb <hu198021688500@163.com>
 * MIT Licensed
 * Date: 2013-01-09 08:59:01
 */
 
 /*************** socket网关 ***************/
config = require("./config.js");

var net = require("net");
var util = require("util");
var route = require("./core/route.js");
var server = require("../module/server.js");


var proxyPort = process.argv[2];
var serviceHost = process.argv[3];
var servicePort = process.argv[4];

net.createServer(function(proxySocket) {
	var connected = false;
	var buffers = new Array();
	var serviceSocket = new net.Socket();
	serviceSocket.connect(parseInt(servicePort), config, function() {
				connected = true;
				if (buffers.length > 0) {
					for (i = 0; i < buffers.length; i++) {
						console.log(buffers[i]);
						serviceSocket.write(buffers[i]);
					}
				}
			});
	proxySocket.on("error", function(e) {
				serviceSocket.end();
			});
	serviceSocket.on("error", function(e) {
				console.log("Could not connect to service at host "
						+ serviceHost + ", port " + servicePort);
				proxySocket.end();
			});
	proxySocket.on("data", function(data) {
				if (connected) {
					serviceSocket.write(data);
				} else {
					buffers[buffers.length] = data;
				}
			});
	serviceSocket.on("data", function(data) {
				proxySocket.write(data);
			});
	proxySocket.on("close", function(had_error) {
				serviceSocket.end();
			});
	serviceSocket.on("close", function(had_error) {
				proxySocket.end();
			});
}).listen(condif.listenPort);



net.createServer(function(socket) {
	socket.on("connect", function() {
		console.log("new connected");
		try {
			var db = net.createConnection(proxyport, proxyhost);

			db.on("connect", function() {

						console.log("server connected");

					});

			db.on("data", function(data) {

						console.log(data.toString("utf8", 0,
								data.legnth));

						// console.log(data);

						socket.write(data);

					});

			db.on("error", function(data) {

						console.log("error:\r\n" + data);

					});

			db.on("end", function() {

						console.log("server closed");

						socket.destroy();

					});

			socket.on("data", function(data) {

						db.write(data);

					});

			socket.on("close", function() {

						console.log("server closed");

						db.destroy();

					});

		} catch (err) {

			console.log(err);

		}

	});

}).listen(listenPort, "0.0.0.0");