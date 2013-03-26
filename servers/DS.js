/**
 * 分发服务器(Dispatch Server)
 * node SS.js 127.0.0.1 8001
 * 业务比较简单，因此负载不会很高
 * 1.登录首先连接该服务器
 * 2.返回一个NS的IP给客户端
 * 3.断开连接
 */

var config = require("../conf/config.json");

//日志
var logger = require("tracer").dailyfile({
	root : config.logs,
	dateformat : "HH:MM:ss.L",
	format : "{{timestamp}} {{message}}"
});

var sio = require("socket.io").listen(config.DS.port, {"log level" : 0});
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