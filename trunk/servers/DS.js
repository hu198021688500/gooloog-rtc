/**
 * 分发服务器(Dispatch Server)
 * node SS.js 127.0.0.1 8001
 * 业务比较简单，因此负载不会很高
 * 1.登录首先连接该服务器
 * 2.返回一个NS的IP给客户端
 * 3.断开连接
 */

var config = require("../conf/config.json");

var logger = require("tracer").dailyfile({
	root : config.logs,
	dateformat : "HH:MM:ss.L",
	format : "{{timestamp}} {{message}}"
});

var net = require("net");

net.createServer(function(sock) {
	console.log(sock);
    console.log("CONNECTED: " + sock.remoteAddress +":"+ sock.remotePort);
    sock.on("data", function(data) {
        console.log("DATA " + sock.remoteAddress + ": " + data);
        sock.write("You said " + data + "");
    });
    
    sock.on("close", function(data) {
        console.log("CLOSED: " + sock.remoteAddress +" "+ sock.remotePort);
    });
}).listen(config.DS.port, config.DS.host);