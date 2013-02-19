/**
 * 用户模块
 */

/**
 * 用户登录
 * @param {Object} data
 * @param {Function} callback
 */
exports.login = function(data, callback){
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