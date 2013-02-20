/**
 * New node file
 */

var cp = require('child_process');
var nodePath = "/usr/local/application/node-v0.8.15/bin/node";
var scriptPath = "/home/mohadoop/myeclipse-main/gooloog-rtc/servers/";
var cmds = [
	"DS.js 192.168.31.188 8001",
	"NS.js 192.168.31.188 8002",
	"SS.js 192.168.31.188 8003",
];

for (var key in cmds) {
	var ls = cp.exec(nodePath + " " + scriptPath + cmds[key], {});
	ls.stdout.on('data', function(data) {
		console.log('stdout: ' + data);
	});

	ls.stderr.on('data', function(data) {
		console.log('stderr: ' + data);
	});

	ls.on('exit', function(code) {
		console.log('child process exited with code ' + code);
	});
}