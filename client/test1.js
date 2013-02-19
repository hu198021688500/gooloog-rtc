/**
 * New node file
 */
/*
var fs = require("fs");
var url = require("url");
var http = require("http");
var path = require("path");

var server = http.createServer(function(req, res) {
	var pathname = url.parse(req.url).pathname;
	console.log(pathname);
	var filepath = path.join("./tmp", "wwwroot", pathname);
	console.log(filepath);
	var stream = fs.createReadStream(filepath, {
		flags : "r",
		encoding : null
	});
	stream.on("error", function() {
		res.writeHead(404);
		res.end();
	});
	stream.pipe(res);
});
server.on("error", function(error) {
	console.log(error);
});
server.listen(8088, function() {
	console.log("server listen on 8088");
});*/
//var request = require("request");
//var io = require("socket.io-client");
//var j = request.jar();
/*request.post({
	jar: j,
	url: "http://localhost:9000/login",
	form: {username: "jose", password: "Pa123"}
}, function (err, resp, body){*/
	/*var socket = io.connect("192.168.31.188", {
	    port: 8005
	});
	socket.on("connect", function() {
		console.log("socket connected");
		socket.emit("login", { GID:"sdfsf@163.com/mobile", password:"xxxx" });
		socket.on("login_ok", function(data) {
			console.log(data);
		});
		socket.on("disconnect", function() {
		
		});
	});*/
//});

//socket.emit("private message", { user: "me", msg: "whazzzup?" });

var io = require("socket.io-client");
var config = require('../config/config.js');

var socketDS = null;
var socketNS = null;
var socketSS = null;

function connectDS() {
	socketDS = io.connect(config.DS.address, {port : config.DS.port});
	socketDS.on("connect", function() {
		console.log("socket connected");
		socketDS.emit("login", { GID : "huguobing@gooloog.com/mobile", password : "xxxx" });
		socketDS.on("login_ok", function(loginData) {
			console.log(loginData);
			connectNS(loginData);
		});
		socketDS.on("disconnect", function() {
			console.log("disconnect");
		});
	});
}

function connectNS(nsData) {
	socketNS = io.connect(nsData.host, {port : nsData.port});
	socketNS.on("connect", function() {
		console.log("socket connected");
		socketNS.emit("add_friend", { GID : "huguobing1@gooloog.com"});
		socketNS.on("add_friend_ok", function(addFriendOkData) {
			console.log(addFriendOkData);
		});
		socketNS.emit("chat_P2P", { GID : "huguobing1@gooloog.com"});
		socketNS.on("chat_P2P_ok", function(chatP2POkData) {
			console.log(chatP2POkData);
			connectSS(chatP2POkData);
		});
		socketNS.on("disconnect", function() {
			console.log("disconnect");
		});
	});
}

function connectSS(ssData) {
	socketSS = io.connect(ssData.host, {port : ssData.port});
	socketSS.on("connect", function() {
		console.log("socket connected");
		socketSS.emit("send_msg", { GID:"huguobing1@gooloog.com", msg : "hello"});
		socketSS.on("send_msg_ok", function(sendMsgOkData) {
			console.log(sendMsgOkData);
		});
		
		socketSS.on("revice_msg", function(reviceMsgData) {
			console.log(reviceMsgData);
		});
		socketSS.emit("revice_msg_ok", { GID:"huguobing1@gooloog.com"});
		socketSS.on("disconnect", function() {
			console.log("disconnect");
		});
	});
}

connectDS();