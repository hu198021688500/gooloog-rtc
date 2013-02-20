/**
 * 分发服务器(Dispatch Server)
 * node SS.js 127.0.0.1 8001
 * 业务比较简单，因此负载不会很高
 * 1.登录首先连接该服务器
 * 2.返回一个NS的IP给客户端
 * 3.断开连接
 */

var logger = require("log4js").getLogger(__filename);
var systemUtil = require("../modules/util/lib/system.js");

if (!systemUtil.checkIsLocalIp(process.argv[2])) {
	logger.error(process.argv[2] + " is not local ip.");
	return false;
}

var sio = require("socket.io").listen(parseInt(process.argv[3]), {"log level" : 0});
sio.sockets.on("connection", function (socket) {
	logger.info(">>>>>>connection to DS:" + socket.id);
	socket.on("login", function (data) {
		var user = require("../service/user.js");
		user.login(data, function(result) {
			sio.sockets.emit("login_ok", result);
			socket.disconnect();
		});
	});
	socket.on("disconnect", function() {
		logger.info("<<<<<<disconnected");
	});
});