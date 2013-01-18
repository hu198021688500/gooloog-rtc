/**
 * gooloog.
 * Copyright(c) 2013 hugb <hu198021688500@163.com>
 * MIT Licensed
 * Date: 2013-01-09 08:59:01
 */
 
 /*************** socket网关 ***************/
config = require("./config.js");

var net = require("net");
var route = require("./core/route.js");
var server = require("../module/server.js");

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