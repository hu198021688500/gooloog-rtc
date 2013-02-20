/**
 * New node file
 */

/**
 * 
 * @param {Object} data {GID:"xx@xx.xx"}
 * @param {Function} callback
 */
exports.P2P = function(data, callback) {
	callback({FGID:data.FGID, TGID:data.TGID, host:"192.168.31.188", port:8003});
	//socket.emit("chat_ok", result);
};