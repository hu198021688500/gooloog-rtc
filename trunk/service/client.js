/**
 * 
 */

var config = require("../config/config.js");

/**
 * 
 * @param {Function} callback
 */
exports.getNS = function(callback){
	callback(null, config.NS);
};

/**
 * 
 * @param {Function} callback
 */
exports.getSS = function(callback){
	callback(null, config.SS);
};

/*var net = require("net");
var config = require("../config/config.js");

exports.getNS1 = function(callback) {
	callback(null, config.NS);
	return ;
	var client = new net.Socket();
	var server = config.MS.host + ":" + config.MS.port;
	client.connect(config.MS.port, config.MS.host, function() {
		client.write(JSON.stringify(data));
	});
	client.on("data", function(data) {
		callback(null, JSON.parse(data));
		client.destroy();
	});
};

exports.getSS1 = function(callback) {
	var client = new net.Socket();
	var server = config.MS.host + ":" + config.MS.port;
	client.connect(config.MS.port, config.MS.host, function() {
		client.write("getSS");
	});
	client.on("data", function(data) {
		callback(null, JSON.parse(data));
		client.destroy();
	});
};*/