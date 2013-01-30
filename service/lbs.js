/**
 * New node file
 */

var util = require('util');
var geohash = require('../node_modules/geohash');

var redisKeysFormat = {
	user : 'u:h:%s'
};

var redis = require("redis"), client = redis.createClient(6379,
		"192.168.20.203");

exports.client = client;

/**
 * 更新用户信息
 * 
 * @param {Object} params
 * @param {Function} callback
 */
exports.updatePos = function(uid, latitude, longitude, callback) {
	var userhashKey = util.format(redisKeysFormat.user, uid);
	client.hget(userhashKey, 'geohash', function(err, geohash) {
		if (null != geohash) {
			client.del(geohash);
		}
		var geohashStr = geohash.encode(latitude, longitude);
		client.append(geohashStr, ':' + uid);
		client.hset(userhashKey, 'geo', geohashStr);
	});
};
exports.uplbs = function(params, callback) {
	// 更新信息
	lbs.uplbs(params.uid, params.latitude, params.longitude, function(err) {
				var result_info = {
					'code' : 1
				};
				fn(err, result_info);
			});
};

// 查找附近的人
exports.user = function(params, fn) {
	var user_id = params.uid, latitude = params.latitude, longitude = params.longitude, type = params.type, offset = params.offset, limit = params.limit, time = params.time;

	// 更新信息
	lbs.uplbs(user_id, latitude, longitude, time, function() {
				// 获取附近
				lbs.findlbsuser(user_id, latitude, longitude, type, offset,
						limit, function(err, user_list) {
							var user_list_info = {
								'code' : 1,
								'data' : user_list
							};
							fn(err, user_list_info);
						});
			});
};

// 查找附近的心愿
exports.wish = function(params, fn) {
	var user_id = params.uid, latitude = params.latitude, longitude = params.longitude, time = params.time;

	// 更新信息
	lbs.uplbs(user_id, latitude, longitude, time, function() {
				// 获取附近
				lbs.findlbswish(latitude, longitude, function(err, wish_list) {
							var wish_list_info = {
								'code' : 1,
								'data' : wish_list
							};
							fn(err, wish_list_info);
						});
			});
};