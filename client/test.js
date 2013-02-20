/*process.on('message', function(m) {
	for (var i = 0; i < 100000000; i++);
	process.send('complete');
});

var readline = require("readline");
var rl = readline.createInterface({
	input : process.stdin,
	output : process.stdout
});

rl.question("gooloog:", function(answer) {
	
	console.log("Thank you for your valuable feedback:", answer);
	//rl.close();
});


*/

var io = require("socket.io-client");
var socketNS = io.connect("192.168.31.188", {port : 8002});
socketNS.on("connect", function() {
	socketNS.emit("chat_P2P", { FGID:"huguobing1@gooloog.com", TGID:"huguobing2@gooloog.com"});
	
	socketNS.on("chat_P2P_ok", function(chatP2POkData) {
		console.log(chatP2POkData);
		//connectSS(chatP2POkData);
	});
	
	socketNS.on("disconnect", function() {
		console.log("NS disconnect");
	});
});