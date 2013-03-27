/**
 * New node file
 */

var net = require("net");

var host = "127.0.0.1";
var port = 8001;

var client = new net.Socket();
client.connect(port, host, function() {
	client.write("I am Chuck Norris!");
});

client.on("data", function(data) {
	console.log("DATA: " + data);
	client.destroy();
});

client.on("close", function() {
	console.log("Connection closed");
});