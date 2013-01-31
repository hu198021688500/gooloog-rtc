/**
 * New node file
 */

var os=require('os');
var util = require('util');

exports.localIps = function() {
	var ifaces = os.networkInterfaces();
	var ips = [];
	for (var dev in ifaces) {
		ifaces[dev].forEach(function(details) {
			if (details.family === 'IPv4') {
				ips.push(details.address);
			}
		});
	}
	return ips;
};

exports.runServers = function(app) {
	var servers = app.getServers();
	for (var serverId in servers) {
		this.run(app, servers[serverId]);
	}
};

exports.run = function(app, server) {
	var cmd = util.format('cd %s && node ', app.getBase());
	var arg = server.args;
	if (arg !== undefined) {
		cmd += arg;
	}
	this.env = app.get('env');
	cmd += util.format(' %s env=%s serverType=%s serverId=%s', app.get('main'),
			this.env, server.serverType, server.id);
	if (isLocal(server.host)) {
		starter.localrun(cmd);
	} else {
		starter.sshrun(cmd, server.host);
	}
};