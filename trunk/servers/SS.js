/**
 * 交换服务器(Switchboard Server)
 * node SS.js 127.0.0.1 8000
 */

var auth = require('../service/auth.js');
var logger = require('log4js').getLogger(__filename);
var systemUtil = require('../modules/util/lib/system.js');

var argv = process.argv;
if (!systemUtil.checkIsLocalIp(argv[2])) {
	logger.error(argv[2] + ' is not local ip.');
	return false;
}

var sio = require('socket.io').listen(parseInt(argv[3]), {'log level' : 0});

sio.configure(function() {
	sio.set('authorization', function(handshakeData, callback) {
		callback(null, true);
		auth.getDataByIP(handshakeData.address.address, function(err, data) {
			if (err) {
				return callback('need login', false);
			}
			for (var key in data) {
				handshakeData[key] = data[key];
			}
			callback(null, true);
		});
	});
});

require('../service/chat.js').createChat(sio.sockets);