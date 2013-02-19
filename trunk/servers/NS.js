/**
 * 通知服务器(Notification Server)
 * node SS.js 127.0.0.1 8002
 * 1.添加、编辑和删除好友
 * 2.对话流程：客户端发送请求要求对话-NS收到请求分配SS-接收者收到NS的通知-接收者连接到同一SS
 * 3.群聊流程：同2，不同是多个客户端会收到NS的通知从而连接到同一SS
 * 3.用户登出之前一直保持着与该服务器的连接
 */

var systemUtil = require("../modules/util/lib/system.js");

var logger = require("log4js").getLogger(__filename);

if (!systemUtil.checkIsLocalIp(process.argv[2])) {
	logger.error(process.argv[2] + " is not local ip.");
	return false;
}

var sio = require("socket.io").listen(parseInt(process.argv[3]), {"log level" : 0});
sio.sockets.on("connection", function (socket) {
	logger.info(">>>>>>connection to NS:" + socket.id);
	var events = protocol.NS;
	for (var key in events) {
		socket.on(key, function (data) {
			logger.info(key + " get:" + util.inspect(data));
			var serviceName = util.format("../service/%s.js",events[key]["service"]);
			var service = require(serviceName);
			service[events[key]["method"]](data, function(result) {
				logger.info(key + " return:" + util.inspect(result));
				sio.sockets.emit(key + "_ok", result);
			});
		});
	}
	socket.on("disconnect", function() {
		logger.info("<<<<<<disconnected");
	});
});