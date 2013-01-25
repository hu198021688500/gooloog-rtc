/**
 * 网络连接管理
 */
  
var crypto = require('crypto');

/**
 * Manager constructor
 */
var manager = function(){
	this.sequenceNumber = Date.now() | 0;
};

module.exports = manager;

var pro = manager.prototype;

pro.generateId = function() {
	var rand = new Buffer(15); // multiple of 3 for base64
	if (!rand.writeInt32BE) {
		return Math.abs(Math.random() * Math.random() * Date.now() | 0).toString()
				+ Math.abs(Math.random() * Math.random() * Date.now() | 0).toString();
	}
	this.sequenceNumber = (this.sequenceNumber + 1) | 0;
	rand.writeInt32BE(this.sequenceNumber, 11);
	if (crypto.randomBytes) {
		crypto.randomBytes(12).copy(rand);
	} else {
		// not secure for node 0.4
		[0, 4, 8].forEach(function(i) {
			rand.writeInt32BE(Math.random() * Math.pow(2, 32) | 0, i);
		});
	}
	return rand.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
};