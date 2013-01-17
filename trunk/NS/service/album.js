/**
 * 用户相册接口
 */
var util = require("util");

var redisKeysFormat = {
	userPhotos : "album:l:%s"
};

var redis = require("redis"), client = redis.createClient(6379,
		"192.168.20.203");

/**
 * 添加一张相片到相册
 * @param {Number} uid
 * @param {String} url
 * @param {Function} callback
 */
exports.addPhoto = function(uid, url, callback) {
	var time = (new Date()).valueOf();
	var data = {"url" : url, "time" : time};
	var listKey = util.format(redisKeysFormat.userPhotos, uid);
	client.lpush(listKey, JSON.stringify(data), callback);
};

/**
 * 获取相册图片列表
 * @param {Number} uid
 * @param {Function} callback
 * @param {Number} start
 * @param {Number} stop
 */
exports.getAllPhotos = function(uid, callback, start, stop) {
	start = start == null ? 0 : start;
	stop = stop == null ? -1 : stop;
	var listKey = util.format(redisKeysFormat.userPhotos, uid);
	client.lrange(listKey, start, stop, callback);
};

/**
 * 删除相册中的图片
 * @param {Number} uid
 * @param {Number} index
 * @param {Function} callback
 */
exports.deletePhoto = function(uid, index, callback) {
	var listKey = util.format(redisKeysFormat.userPhotos, uid);
	client.lindex(listKey, index, function(err, val) {
		if (err) {
			callback(err);
		} else {
			client.lrem(listKey, 0, val, callback);
		}
	});
};

/**
 * 将图片设为相册封面
 * @param {Number} uid
 * @param {Number} index
 * @param {Function} callback
 */
exports.setCover = function(uid, index, callback) {
	var listKey = util.format(redisKeysFormat.userPhotos, uid);
	client.lindex(listKey, index, function(err, val) {
		if (err) {
			callback(err);
		} else {
			var multi = client.multi();
			multi.lrem(listKey, 0, val);
			multi.lpush(listKey, val);
			multi.exec(callback);
		}
	});
};

/**
 * 排序
 * @param {Number} uid
 * @param {Number} index
 * @param {Number} toIndex
 * @param {Function} callback
 */
exports.movePhoto = function(uid, index, toIndex, callback) {
	var listKey = util.format(redisKeysFormat.userPhotos, uid);
	client.lindex(listKey, index, function(err, val) {
		if (err) {
			callback(err);
		} else {
			client.lindex(listKey, toIndex, function(err, toVal) {
				if (err) {
					callback(err);
				} else {
					var multi = client.multi();
					multi.lrem(listKey, 0, val);
					multi.linsert(listKey, "AFTER", toVal, val);
					multi.exec(callback);
				}
			});
		}
	});
};