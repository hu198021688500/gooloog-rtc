/**
 * 初始化环境
 */

var commonFun = (function() {
	function Singleton(args) {
		var args = args || {};
		this.redisConf = args.redis || {host : "127.0.0.1", port : 6379};
		this.getRedisClient = function() {
			var redis = require("redis");
			var redisClient = redis.createClient(args.redis.port, args.redis.host);
			redisClient.on("error", function(err) {
				console.error("Redis Connect Error: " + err.stack);
			});
			return redisClient;
		};
	}
	var instance;
	var _static = {
		name : "init env",
		getInstance : function(args) {
			if (instance === undefined) {
				instance = new Singleton(args);
			}
			return instance;
		}
	};
	return _static;
})();

global.funs = exports.funs = function() {
	var conf = {
		redis : {
			host : "127.0.0.1",
			port : 6379
		}
	};
	return commonFun.getInstance(conf);
};