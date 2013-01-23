var cmds = {
	1 : {
		module : 'user',
		method : 'login'
	}
};

var util = require("util");
var serviceStr = '../service/%s.js';

exports.process = function(socket, data, callback) {
	var object = JSON.parse(data);
	var serviceName = util.format(serviceStr, cmds[object.cmd]['module']);
	var service = require(serviceName);
	service[cmds[object.cmd]['method']](object.data, callback);
};