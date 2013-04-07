/**
 * New node file
 */

var userUtil = function() {
	this.devices = {
		web : 1,
		client : 2,
		android : 3,
		ios : 4
	};
};

module.exports = userUtil;

var pro = userUtil.prototype;

/**
 * 解析GUID
 * @param {String} uid huguobing@gooloog.com/web
 * @return {Object}
 */
pro.decodeGUID = function(guid) {
	var guidObj = {
		username : null,
		domain : null,
		device : null
	};
	var patt = new RegExp(/^[\d\w]+@[\d\w\.]+\/\w+$/ig);
	if (patt.test(guid)) {
		var pos1 = guid.indexOf("@");
		var pos2 = guid.indexOf("/", pos1 + 1);
		guidObj.username = guid.substring(0, pos1);
		guidObj.domain = guid.substring(pos1 + 1, pos2);
		guidObj.device = guid.substring(pos2 + 1);
	}
	return guidObj;
};

/**
 * 获取客户端类型数字编号
 * @param {String} guid
 * @return {Number}
 */
pro.getDeviceByGUID = function(guid) {
	var deviceNumber = 0;
	var guidObj = this.decodeGUID(guid);
	for (var key in this.devices) {
		if (key == guidObj.device) {
			deviceNumber = this.devices[key];
			break;
		}
	}
	return deviceNumber;
};

/**
 * 获取客户端类型数字编号
 * @param {String} device
 * @return {Number}
 */
pro.getDeviceByStr = function(device) {
	var deviceNumber = 0;
	for (var key in this.devices) {
		if (key == device) {
			deviceNumber = this.devices[key];
			break;
		}
	}
	return deviceNumber;
};

try {
	var x = new userUtil();
	console.log(x.getDeviceByGUID("huguobing@gooloog.com/web"));
} catch (e) {
	console.log(e);
}