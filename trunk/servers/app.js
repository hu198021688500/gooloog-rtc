/**
 * 应用服务器
 */

var http = require('http');
var rrest = require('rrestjs');
var server = http.createServer(rrest(function(req, res) {
	try {// 实际测试证明，这里的try语句不会影响整体的性能，放心使用
		require('./controller/' + req.path[0])[req.path[1]](
				req, res);// 规则可以自定义，如果访问'/'则req.pah变为['index','index']
	} catch (err) {
		restlog.info('Not found module: ' + err);
		res.statusCode = 404;
		res.render('/e404.jade');
	}
})).listen(rrest.config.listenport);