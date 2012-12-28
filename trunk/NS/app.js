var async = require('async');
async.waterfall([
	function(callback) {
		callback(null, 'Node.js', 'JavaScript');
	}, function(arg1, arg2, callback) {
		var caption = arg1 + ' and ' + arg2;
		callback("dd", caption);
	}, function(caption, callback) {
		caption += ' Rock!';
		callback("eee", caption);
	}], 
	function(err, caption) {
		console.log(err);
		console.log(caption);
	}
);