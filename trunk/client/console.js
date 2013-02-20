/**
 * 客户端控制台程序
 */

var io = require("socket.io-client");
var config = require("../config/config.js");

var socketDS = null;
var socketNS = null;
var sockets = {};

process.stdin.resume();
process.stdin.setEncoding("utf8");

if (!process.argv[3]) {
	return;
}

var myGID = process.argv[2];
var password = process.argv[3];
connectDS(myGID, password);

process.stdout.write("gooloog:");
process.stdin.on("data", function(cmd) {
	var input = cmd.replace(/[\r\n]/, "").split(" ");
	switch (input[0]) {
		case "chatp2p" :
			var toGID = input[1];
			socketNS.emit("chat_P2P", { FGID:myGID, TGID:toGID});
			break;
		case "send" :
			var toGID = input[1];
			var msg = input[2];
			sockets[toGID].emit("send_msg", { FGID:myGID, TGID:toGID, msg:msg});
			break;
	}
	process.stdout.write("gooloog:");
});

process.stdin.on("end", function() {
	process.stdout.write("end");
});

function connectDS(myGID, password) {
	socketDS = io.connect(config.DS.host, {port : config.DS.port});
	socketDS.on("connect", function() {
		socketDS.emit("login", { GID : myGID + "/mobile", password : password });
		socketDS.on("login_ok", function(loginData) {
			console.log("login_ok");
			connectNS(loginData);
		});
		socketDS.on("disconnect", function() {
			console.log("DS disconnect");
		});
	});
}

function connectNS(nsData) {
	nsData = JSON.parse(nsData);
	socketNS = io.connect("http://" + nsData.host + ":" + nsData.port);
	socketNS.on("connect", function() {
		socketNS.emit("init_NS", {GID : myGID});
		socketNS.on("init_NS_ok", function(code) {});
		socketNS.on("chat_P2P_ok", function(chatP2POkData) {
			connectSS(chatP2POkData);
		});
		socketNS.on("chat_P2P_req", function(chatP2PReqData) {
			connectSS(chatP2PReqData);
		});
		socketNS.on("disconnect", function() {
			console.log("NS disconnect");
		});
	});
}

function connectSS(ssData) {
	var toGID = ssData.TGID;
	if (sockets[toGID]) {
		return;
	}
	sockets[toGID] = io.connect("http://" + ssData.host + ":" + ssData.port);
	sockets[toGID].on("connect", function() {
		sockets[toGID].emit("init_SS", {GID : myGID});
		socketNS.on("init_SS_ok", function(code) {});
		
		sockets[toGID].on("send_msg_ok", function(sendMsgData) {
			console.log("send message to " + sendMsgData.TGID + " success");
		});
		sockets[toGID].on("revice_msg", function(reviceMsgData) {
			console.log("recive message form " + reviceMsgData.FGID + ":" + reviceMsgData.msg);
			sockets[toGID].emit("revice_msg_ok", {FGID:reviceMsgData.FGID, TGID:reviceMsgData.TGID, sn:reviceMsgData.sn});
		});
		sockets[toGID].on("disconnect", function() {
			console.log("SS disconnect");
		});
	});
}