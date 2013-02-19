/**
 * 协议解析
 */

var util = require("util");
var protocol = require("./protocol.js");

exports.process = function(socket, data, callback) {
	var serviceStr = "../service/%s.js";
	var serviceName = util.format(serviceStr, protocol.cmds[data.cmd]["module"]);
	var service = require(serviceName);
	service[protocol.cmds[data.cmd]["method"]](data.data, callback);
};