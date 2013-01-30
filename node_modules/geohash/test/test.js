/**
 * New node file
 */

var geohash = require('../lib/geohash.js');

//var geohash = require('ngeohash');
var redis = require("redis"), client = redis.createClient(6379,
		"192.168.20.203");
exports.testEncode = function(test) {
	//var hashStr = geohash.encode(31.744359, 104.043469, 15);
	//console.log(hashStr);
	client.MGET('xxxx', 'xxxy', function(err, val) {
		console.log(err);
		console.log(val);
	});
	test.equal(1, 1);
	test.done();
};