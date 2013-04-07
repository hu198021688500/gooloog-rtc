/**
 * 
 */

var fs = require("fs");
var util = require("util");


var device = {
	web : 1,
	client : 2,
	android : 3,
	ios : 4
};

/**
 * 获取客户端类型
 * @param {String} guid
 * @return {Number}
 */
exports.getDeviceByGUID = function(guid) {
	return 1;
};

/**
 * 解析GUID
 * @param {String} uid huguobing@gooloog.com/web
 * @return {Bool}
 */
exports.decodeUID = function(guid) {
	var user = {
		username : null,
		domain : null,
		device : null
	};
	var guidArr = guid.split("/");
	var pos1 = uid.indexOf("@");
	if (pos1 < 1) {
		throw new Error("uid is not right");
	}
	user.username = uid.substring(0, pos1);
	var pos2 = uid.indexOf("/", pos1 + 1);
	if (pos2 > pos1 + 1) {
		user.domain = uid.substring(pos1 + 1, pos2);
		user.source = uid.substring(pos2 + 1);
	} else {
		user.domain = uid.substring(pos1 + 1);
	}
	return user;
};

/**
 * 
 * @param {String} file
 * @param {Object} json
 */
exports.writeJSON = function(file, json){
	var str = util.inspect(json);
	var buffer = new Buffer(str, "utf8");
	fs.writeFile(file, buffer, function(err) {
		if (err) {
			console.log(err);
		}
	});
};