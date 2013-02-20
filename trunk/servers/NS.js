/**
 * 通知服务器(Notification Server)
 * node SS.js 127.0.0.1 8002
 * 1.添加、编辑和删除好友
 * 2.对话流程：客户端发送请求要求对话-NS收到请求分配SS-接收者收到NS的通知-接收者连接到同一SS
 * 3.群聊流程：同2，不同是多个客户端会收到NS的通知从而连接到同一SS
 * 3.用户登出之前一直保持着与该服务器的连接
 */

var client = require("../service/client.js");
var logger = require("log4js").getLogger(__filename);
var systemUtil = require("../modules/util/lib/system.js");

if (!systemUtil.checkIsLocalIp(process.argv[2])) {
	logger.error(process.argv[2] + " is not local ip.");
	return false;
}
/******  由于存在多台NS，因此需要使用共享存储，以下两行的实现是为方便测试而使用 ******/
var sidMap = {};
var gidMap = {};

var sio = require("socket.io").listen(parseInt(process.argv[3]), {"log level" : 0});
sio.sockets.on("connection", function (socket) {
	logger.info(">>>>>>connection to NS:" + socket.id);
	socket.on("init_NS", function(data) {
		sidMap[data.GID] = socket.id;
		gidMap[socket.id] = data.GID;
		socket.emit("init_NS_ok", 0);
	});
	socket.on("chat_P2P", function (data) {
		client.getSS(function(err, result) {
			result.FGID = data.FGID;
			result.TGID = data.TGID;
			socket.emit("chat_P2P_ok", result);
			var sid = sidMap[result.TGID];
			sio.sockets.socket(sid).emit("chat_P2P_req", {FGID:result.TGID, TGID:result.FGID, host:"192.168.31.188", port:8003});
		});
	});
	socket.on("disconnect", function() {
		var GID = gidMap[socket.id];
		delete gidMap[socket.id];
		delete sidMap[GID];
		logger.info("<<<<<<" + GID + " disconnected");
	});
});