/**
 * 用户模块
 */

var user = new (require("../modules/user/index.js").user)();

/**
 * 用户登录
 * @param {Object} data
 * @param {Function} callback
 */
exports.login1 = function(data, callback){
	var client = require("./client.js");
	var string = require("../modules/util").String;
	var user = string.decodeUID(data.GID);
	// get toekn
	var token = "x12vr557gfgh";
	// get NS
	client.getNS(function(err, result) {
		result.token = token;
		callback(JSON.stringify(result));
	});
};

/**
 * 注册
 * @param {Array} params
 * @param {Function} callback
 */
exports.register = function(params, callback) {
	if (!params.email || !params.password) {
		return callback(new Error("email or password is empty."));
	}
	var data = {
		email : params.email,
		password : params.password
	};
	user.add(data, callback);
};

/**
 * 登录
 * @param {Array} params
 * @param {Function} callback
 */
exports.login = function(params, callback) {
	if (!params.email || !params.password) {
		return callback(new Error("email or password is empty."));
	}
	user.login(params.email, params.password, callback);
};

/**
 * 获取详情
 * @param {Array} params
 * @param {Function} callback
 */
exports.getDetail = function(params, callback) {
	if (!params.uid) {
		return callback(new Error("uid is empty."));
	}
	user.getDetail(params.uid, callback);
};

/**
 * 更新信息
 * @param {Array} params
 * @param {Function} callback
 */
exports.update = function(params, callback) {
	user.update(params.uid, params, callback);
};