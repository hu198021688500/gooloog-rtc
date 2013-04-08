/**
 * 用户model
 */

var redisKey = {
	userIncr : "user:incr",
	userDetail : "user:uid:%s"
};

/**
 * 添加用户
 * @param {Object} data
 * @return {Number}	uid
 */
exports.addUser = function(data) {
	return 1;
};

/**
 * 
 * @param {Nuber} uid
 * @return {Object}
 */
exports.getUser = function(uid) {
	return {};
};

/**
 * 黑名单
 * @return {Object}
 */
exports.getBlackList = function() {
	return {};
};