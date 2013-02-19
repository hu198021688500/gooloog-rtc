/**
 * 分发服务器(Dispatch Server)
 * node SS.js 127.0.0.1 8001
 * 业务比较简单，因此负载不会很高
 * 1.登录首先连接该服务器
 * 2.返回一个NS的IP给客户端
 * 3.断开连接
 */

var util = require("util");
var protocol = require("../service/protocol.js");
var systemUtil = require("../modules/util/lib/system.js");

var logger = require("log4js").getLogger(__filename);

if (!systemUtil.checkIsLocalIp(process.argv[2])) {
	logger.error(process.argv[2] + " is not local ip.");
	return false;
}

var sio = require("socket.io").listen(parseInt(process.argv[3]), {"log level" : 0});
sio.sockets.on("connection", function (socket) {
	logger.info(">>>>>>connection to DS:" + socket.id);
	var events = protocol.DS;
	for (var key in events) {
		socket.on(key, function (data) {
			logger.info(key + " get:" + util.inspect(data));
			var serviceName = util.format("../service/%s.js",events[key]["service"]);
			var service = require(serviceName);
			service[events[key]["method"]](data, function(result) {
				logger.info(key + " return:" + util.inspect(result));
				sio.sockets.emit(key + "_ok", result);
				socket.disconnect();
			});
		});
	}
	socket.on("disconnect", function() {
		logger.info("<<<<<<disconnected");
	});
});