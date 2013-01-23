var cmds = {
	1 : {
		module : 'user',
		method : 'login'
	},
	2 : {
		module : 'chat',
		method : 'P2P'
	}
};

var util = require("util");
var serviceStr = '../service/%s.js';

exports.process = function(socket, data, callback) {
	var serviceName = util.format(serviceStr, cmds[data.cmd]['module']);
	var service = require(serviceName);
	service[cmds[data.cmd]['method']](data.data, callback);
};