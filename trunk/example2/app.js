module.exports.conf = require('./config/config');

var http = require('http');
var rrest = require('rrestjs');
var app = require('./controller/app.js');

var server = http.createServer(rrest(function(req, res) {
	app(req, res);
})).listen(rrest.config.listenPort);

_rrest = rrest;