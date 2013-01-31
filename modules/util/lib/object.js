/**
 * New node file
 */

/**
 * 
 * @param {} val
 */
exports.isArray = function(val) {
	var flag = false;
	/*if (Object.prototype.toString.call(val) === '[object Array]') {
		flag = true;
	}*/
	if (val instanceof Array) {
		flag = true;
	}
	/*if (Array.isArray(val)) {
		flag = true;
	}*/
	return flag;
};