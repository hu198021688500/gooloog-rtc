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

// 点对点聊天
sio.on("connection", function(socket) {
	sidMap["huguobing" + index + "@gooloog.com"] = socket.id;
	index++;
	console.log(sidMap);
	
	socket.on("send_msg", function(data) {
		var sid = sidMap[data.TGID];
		
		console.log("server send from " + data.FGID + "[" + socket.id + "]");
		console.log("server send to " + data.TGID + "[" + sid + "]");
		console.log("server send msg:" + data.msg);
		
		socket.emit("send_msg_ok", {FGID:data.FGID, TGID:data.TGID, sn:data.sn});
		sio.sockets.socket(sid).emit("revice_msg", {FGID:data.FGID, TGID:data.TGID, msg:data.msg, sn:data.sn});
		socket.emit("revice_msg_ok", {FGID:data.FGID, TGID:data.TGID, sn:data.sn});
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
			io.sockets.in(room).emit('new non-fan');
		});
	});
});