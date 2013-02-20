var io = require("socket.io-client");

var socket = io.connect("192.168.31.188", {
    port: 8003
});


function sendMessage(from, to, msg) {
	setTimeout(function(){
		socket.emit("send_msg", { FGID:from, TGID:to, msg:msg, sn:msgSN++});
		console.log("send message to " + to);
	}, 2000);
}

var msgSN = 1;

socket.on("connect", function() {
	socket.on("send_msg_ok", function(sendMsgData) {
		console.log("send message to " + sendMsgData.TGID + " success");
	});
	
	socket.on("revice_msg", function(reviceMsgData) {
		console.log("recive message form " + reviceMsgData.FGID
			+ " " + reviceMsgData.sn + ":" + reviceMsgData.msg);
			
		socket.emit("revice_msg_ok", {FGID:reviceMsgData.FGID, TGID:reviceMsgData.TGID, sn:reviceMsgData.sn});
		
		var msg = parseInt(reviceMsgData.msg) + 1;
		sendMessage(reviceMsgData.TGID, reviceMsgData.FGID, msg);
	});
	
	socket.on("disconnect", function() {
		console.log("socket disconnect");
	});
});