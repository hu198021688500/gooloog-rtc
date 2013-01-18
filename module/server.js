/**
 * 与集群管理主机交互
 */

var net = require("net");
var client = new net.Socket();

exports.getDSHost = function(){
	client.connect(config.managerPort, config.managerAddress, function() {
    	console.log("CONNECTED TO: " + HOST + ":" + PORT);
    	client.write("getDSHost");
	});
	client.on("data", function(data) {
	    console.log("DATA: " + data);
	    client.destroy();
	});
	client.on("close", function() {
	    console.log("Connection closed");
	});
};

exports.getNSHost = function(){
	
};

exports.getSMHost = function(){
	
};

exports.getDSHost = function(){
	
};