String.format = function(src){
    if (arguments.length == 0) return null;
    var args = Array.prototype.slice.call(arguments, 1);
    return src.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};
 /**
  * 
  * @param {Number} timestamp 秒
  * @return {String}
  */
exports.timeAgo = function(timestamp) {
	var str = "Unknown";
	if (!isNaN(timestamp) && timestamp >= 0) {
		var toNowSeconds = Math.floor(new Date().getTime() / 1000) - timestamp;
		if (toNowSeconds < 60) {
			str = toNowSeconds + "秒钟以前";
		} else if (toNowSeconds < 3600) {
			str = Math.floor(toNowSeconds / 60) + "分钟以前";
		} else if (toNowSeconds < 86400) {
			str = Math.floor(toNowSeconds / 3600) + "小时以前";
		} else if (toNowSeconds < 2592000) {
			str = Math.floor(toNowSeconds / 86400) + "天以前";
		} else if (toNowSeconds < 10368000) {
			str = Math.floor(toNowSeconds / 2592000) + "个月以前";
		} else {
			var toNowDate = new Date(timestamp * 1000);
			if (toNowSeconds < 31536000) {
				str = (toNowDate.getMonth() + 1) + "月" + toNowDate.getDate()
						+ "日 " + toNowDate.getHours() + "时"
						+ toNowDate.getMinutes() + "分" + toNowDate.getSeconds()
						+ "秒";
			} else {
				str = toNowDate.getFullYear() + "年"
						+ (toNowDate.getMonth() + 1) + "月" + toNowDate.getDay()
						+ "日 " + toNowDate.getHours() + "时"
						+ toNowDate.getMinutes() + "分" + toNowDate.getSeconds()
						+ "秒";
			}
		}
	}
	return str;
};