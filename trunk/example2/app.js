module.exports.conf = require('./config/config');
var http = require('http'), rrest = require('rrestjs');
http.createServer(function(req, res) {
	res.send('hello world everyone!');
}).listen(rrest.config.listenPort);
