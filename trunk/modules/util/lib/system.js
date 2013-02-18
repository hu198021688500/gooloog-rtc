/**
 * New node file
 */

var os = require('os');

/**
 * 返回进程的当前工作目录
 * @return {String}
 */
exports.getBase = function() {
	return process.cwd();
};

/**
 * 获取本机所有IP
 * @return {Array}
 */
exports.localIps = function() {
	var ips = [];
	var ifaces = os.networkInterfaces();
	for (var dev in ifaces) {
		ifaces[dev].forEach(function(details) {
			if (details.family === 'IPv4') {
				ips.push(details.address);
			}
		});
	}
	return ips;
};

/**
 * 检查IP是否是本机IP
 * @param {String} ip
 * @return {Bool}
 */
exports.checkIsLocalIp = function(ip) {
	var isLocalIp = false;
	var localIps = exports.localIps();
	for (var key in localIps) {
		if (localIps[key] == ip) {
			isLocalIp = true;
			break;
		}
	}
	return isLocalIp;
};
/*
var util = require('util');
var computecluster = require('compute-cluster');
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

exports.exeCompute = function(file) {
	var cc = new computecluster({
		module : './test.js',
		max_backlog : -1
	});
	var toRun = 10;
	for (var i = 0; i < toRun; i++) {
		cc.enqueue({}, function(err, r) {
			if (err)
				console.log("an error occured:", err);
			else
				console.log("it's nice:", r);
			if (--toRun === 0)
				cc.exit();
		});
	}
};*/
