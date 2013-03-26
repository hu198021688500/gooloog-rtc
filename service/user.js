/**
 * 用户模块
 */

var userModel = require("../modules/user/index.js");
var user = new userModel();

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
	var fields = ["email", "password"];
};

/**
 * 登录
 * @param {Array} params
 * @param {Function} callback
 */
exports.login = function(params, callback) {

};

/**
 * 获取详情
 * @param {Array} params
 * @param {Function} callback
 */
exports.getDetail = function(params, callback) {

};