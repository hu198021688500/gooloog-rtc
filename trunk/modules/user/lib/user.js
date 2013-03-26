/**
 * New node file
 */

require("../../../service/init.js");

var util = require("util");
var redisClient = global.funs().getRedisClient();

var User = function() {
	this.keys = {
		incr : "user:incr:uid",
		uid : "user:h:%s"
	};
};

var pro = User.prototype;

pro.getUID = function(callback) {
	var key = this.keys.incr;
	redisClient.get(key, function(err, result) {
		if (!err && !result) {
			result = 1;
			redisClient.set(key, 1);
		}
		callback(err, result);
	});
};

pro.add = function(data, callback) {
	var _this = this;
	var info = {
		email : null,
		password : null,
		nick : null,
		sex : null,
		birthday : null,
		avatar : null,
		signature : null
	};
	for (var key in info) {
		if (data[key]) {
			info[key] = data[key];
		}
	}
	this.getUID(function(err, uid){
		if (err) {
			return callback(err);
		}
		redisClient.hmset(util.format(_this.keys.uid, uid), info, callback);
	});
};

module.exports = User;