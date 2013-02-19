/**
 * 交换服务器(Switchboard Server)
 * node SS.js 127.0.0.1 8003
 */

var string = require("../modules/util").String;
var logger = require("log4js").getLogger(__filename);
var systemUtil = require("../modules/util/lib/system.js");

var argv = process.argv;
if (!systemUtil.checkIsLocalIp(argv[2])) {
	logger.error(argv[2] + " is not local ip.");
	return false;
}

var sio = require("socket.io").listen(parseInt(argv[3]), {"log level" : 0});

var sidMap = {};
var index = 1;

sio.of("/P2P").on("connection", function(socket) {
	sidMap["huguobing" + index + "@gooloog.com"] = socket.id;
	index++;
	console.log(sidMap);
	socket.on("send_msg", function(data) {
		var user = string.decodeUID(data.GID);
		var sid = sidMap[user.username + "@" + user.domain];
		console.log("server send from " + socket.id);
		console.log("server send to " + sid);
		//sio.sockets.sockets[sid].json.send({form:user.username,msg:data.msg});
		sio.sockets.socket(sid).emit("revice_msg", {form:user.username,msg:data.msg});
	});
	socket.on("disconnect", function() {
		for (var key in sidMap) {
			if (sidMap[key] = socket.id) {
				delete sidMap[key];
				break;
			}
		}
		logger.info("<<<<<<disconnected");
	});
});

sio.of("/chat").on("connection", function(socket) {
	socket.emit("a message", {that : "only", "/chat" : "will get"});
	//chat.emit("a message", {everyone : "in", "/chat" : "will get"});
});