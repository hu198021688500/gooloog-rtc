/**
 * 分发服务器(Dispatch Server)
 * node SS.js 127.0.0.1 8001
 * 业务比较简单，因此负载不会很高
 * 1.登录首先连接该服务器
 * 2.返回一个NS的IP给客户端
 * 3.断开连接
 */

var net = require("net"),
	systemUtil = require("../modules/util/lib/system.js");

var logger = require("tracer").dailyfile({
	root : config.logs,
	dateformat : "HH:MM:ss.L",
	format : "{{timestamp}} {{message}}"
});

var host = null,
	port = null,
	defaultHost = "127.0.0.1",
	defaultPort = 8001;
	
if (process.argv[3]) {
	host = process.argv[2];
	port = process.argv[3];
} else {
	host = defaultHost;
	port = defaultPort;
}

if (!systemUtil.checkIsLocalIp(host)) {
	return logger.error(process.argv[2] + " is not local ip.");
}

var connNum = 0;
net.createServer(function(sock) {
	new Client(connNum, sock);
    sock.on("data", function(data) {
        console.log("DATA " + sock.remoteAddress + ": " + data);
        sock.write("You said " + data + "");
    });
    
    sock.on("close", function(data) {
        console.log("CLOSED: " + sock.remoteAddress +" "+ sock.remotePort);
    });
}).listen(port, host);