/**
 * 交换服务器(Switchboard Server)
 * node SS.js 127.0.0.1 8003
 * 1.点对点
 * 2.群聊
 */

var logger = require("log4js").getLogger(__filename);
var systemUtil = require("../modules/util/lib/system.js");

var argv = process.argv;
if (!systemUtil.checkIsLocalIp(argv[2])) {
	logger.error(argv[2] + " is not local ip.");
	return false;
}

var sio = require("socket.io").listen(parseInt(argv[3]), {"log level" : 0});

var sidMap = {};
var gidMap = {};

// 点对点聊天
sio.on("connection", function(socket) {
	// 连接上服务器后，在服务器上注册用户信息
	socket.on("init_SS", function(data) {
		socket.set("GID", data.GID);
		sidMap[data.GID] = socket.id;
		gidMap[socket.id] = data.GID;
		socket.emit("init_SS_ok", 0);
	});
	// 接收客户端发来的消息
	socket.on("send_msg", function(data) {
		var sid = sidMap[data.TGID];
		logger.info(data.FGID + "==>" + data.TGID + ":" + data.msg);
		// 服务器发回确认
		socket.emit("send_msg_ok", {FGID:data.FGID, TGID:data.TGID, sn:data.sn});
		// 转发
		sio.sockets.socket(sid).emit("revice_msg", {FGID:data.FGID, TGID:data.TGID, msg:data.msg, sn:data.sn});
		// 接收者收到信息确认
		socket.emit("revice_msg_ok", {FGID:data.FGID, TGID:data.TGID, sn:data.sn});
	});
	// 断开连接
	socket.on("disconnect", function() {
		var GID = gidMap[socket.id];
		delete gidMap[socket.id];
		delete sidMap[GID];
		logger.info("<<<<<<" + GID + " disconnected");
	});
});

sio.of("/chat").on("connection", function(socket) {
	// join to room and save the room name
	socket.on('join_room', function(room) {
		socket.set('room', room, function() {
			console.log('room ' + room + ' saved');
		});
		socket.join(room);
	});
	socket.on('message', function(data) {
		console.log("Client data: " + data);
		// lookup room and broadcast to that room
		socket.get('room', function(err, room) {
			// neither method works for me
			socket.broadcast.to(room).emit('new fan');
			//io.sockets.in(room).emit('new non-fan');
		});
	});
});